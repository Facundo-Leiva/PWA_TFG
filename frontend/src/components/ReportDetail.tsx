import { useEffect, useState } from "react";
import type { Report } from "./ReportCard";
import { formatDateToLocal } from '../utils/date';

interface Props {
    report: Report;
    onBack: () => void;
    currentUser?: string;
    onViewUser?: (userId: number) => void;
}

interface Comment {
    id: number;
    author: string;
    content: string;
    createdAt: string;
    soporteGrafico?: {
        id: number;
        tipo: string;
        archivo: string;
    } | null;
}

// Componente para Visualizar Detalles del Reporte
export default function ReportDetail({ report, onBack, currentUser, onViewUser }: Props) {
    const [likes, setLikes] = useState(report.likes);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [motivo, setMotivo] = useState("");
    const [detalle, setDetalle] = useState("");

    // Cargar comentarios al iniciar
    useEffect(() => {
        // Cargar vista desde el principio del componente
        window.scrollTo(0, 0);

        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/reportes/${report.id}/comentarios`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (err) {
                console.error("Error al cargar comentarios", err);
            }
        };
        fetchComments();
    }, [report.id]);

    // Llamar método para agregar comentarios
    const handleAddComment = async () => {
        if (!newComment.trim() && !selectedImage) {
            alert("El comentario no puede estar vacío. Escribi texto o adjunta una imagen.");
            return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();
        if (newComment.trim()) formData.append("contenido", newComment);
        if (selectedImage) formData.append("file", selectedImage);

        try {
            const res = await fetch(`http://localhost:3000/reportes/${report.id}/comentarios`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) {
                alert("Error al enviar comentario");
                return;
            }

            const data = await res.json();
            setComments([...comments, data]);
            setNewComment("");
            setSelectedImage(null);
            setPreviewUrl(null);
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
        }
    };

    // Llamar método para agregar un "like"
    const handleLike = async () => {
        if (report.author === currentUser) {
            alert("No puedes dar like a tu propio reporte.");
            return;
        }
        if (liked) {
            alert("Ya diste like a este reporte.");
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:3000/reportes/${report.id}/like`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (!res.ok) {
                const errText = await res.text();
                try {
                    const err = JSON.parse(errText);
                    alert(err.message || "Error al dar like");
                } catch {
                    alert(errText || "Error al dar like");
                }
                return;
            }
            const data = await res.json();
            setLikes(data.likes);
            setLiked(true);
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
        }
    };
    
    // Retornar el componente detalle del reporte
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-300 via-white to-green-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Detalle del Reporte</h1>
                        <div className="w-6" />
                    </div>
                </header>

                {/* Datos del reporte */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {report.image ? (
                            <img
                                src={report.image}
                                alt={report.title}
                                className="h-72 w-full object-contain"
                            />
                        ) : (
                            <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(report.category)}`}>
                                    {getCategoryIcon(report.category)} {getCategoryName(report.category)}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">{report.title}</h2>
                            <p className="text-gray-600">{report.description}</p>

                            <div className="text-sm text-gray-500 space-y-1">
                                <p>📍 <strong>Ubicación:</strong> {report.location}</p>
                                <p>🕒 <strong>Fecha:</strong> {formatDateToLocal(report.date)}</p>

                                {/* Botón para acceder al perfil del usuario */}
                                <p>
                                    👤 <strong>Reportado por:</strong>{" "}
                                    <button
                                        onClick={() => onViewUser?.(report.authorId)}
                                        className="font-semibold text-blue-700 hover:underline"
                                    >
                                        {report.author}
                                    </button>
                                </p>
                            </div>

                            {/* Botón para dar like */}
                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                                <button
                                    onClick={handleLike}
                                    disabled={liked || report.author === currentUser}
                                    className={`flex items-center space-x-2 px-3 py-1 rounded-full font-medium transition ${
                                        liked
                                            ? "bg-blue-100 text-blue-700 border border-blue-400"
                                            : "bg-emerald-100 text-emerald-700 border border-emerald-400 hover:bg-emerald-200"
                                    }`}
                                >
                                    <span>👍</span>
                                    <span>{likes} Me gusta</span>
                                </button>
                                <span>💬 {comments.length} Comentarios</span>
                                <span>🛠️ Estado: {report.estado}</span>
                            </div>

                            {/* Separador visual */}
                            <hr className="my-6 border-gray-300" />

                            {/* Sección de comentarios */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Comentarios</h3>

                                {/* Lista de comentarios */}
                                <div className="space-y-3">
                                    {comments.map((c) => (
                                        <div key={c.id} className="border-b pb-2">
                                            <p className="text-sm">
                                                <strong className="text-blue-600">{c.author}</strong>: {c.content}
                                            </p>
                                            <span className="text-xs text-gray-400">{formatDateToLocal(c.createdAt)}</span>

                                            {/* Imagen del comentario */}
                                            {c.soporteGrafico?.archivo && (
                                                <div className="mt-2">
                                                    <img
                                                        src={`http://localhost:3000${c.soporteGrafico.archivo}`}
                                                        alt="Soporte gráfico"
                                                        className="max-w-xs rounded border border-gray-300"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Formulario para nuevo comentario */}
                            <div className="mt-6 space-y-2">
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Escribi un comentario..."
                                        className="flex-1 border rounded px-3 py-2 text-sm"
                                    />
                                    <label className="bg-gray-100 border border-gray-300 px-3 py-2 rounded cursor-pointer hover:bg-gray-200 text-sm flex items-center">
                                        📂 Adjuntar
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        onClick={handleAddComment}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                        disabled={!newComment.trim() && !selectedImage}
                                    >
                                        Enviar
                                    </button>
                                </div>

                                {/* Información previa de la imagen del comentario */}
                                {selectedImage && (
                                    <div className="mt-2 text-sm text-gray-600 flex items-center space-x-2">
                                        <span>📷 {selectedImage.name}</span>
                                        <button
                                            onClick={() => setSelectedImage(null)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Separador visual */}
                            <hr className="my-10 border-t border-gray-300" />

                            {/* Denunciar reporte */}
                            <div className="mt-10 bg-red-50 border border-red-300 rounded-lg px-4 py-4 shadow-sm max-w-md mx-auto">
                                <h4 className="text-red-700 font-semibold mb-2">🚨 Denunciar este reporte</h4>
                                <select
                                    className="w-full mb-2 bg-white border border-red-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                >
                                    <option value="">Seleccionar motivo...</option>
                                    <option value="Contenido ofensivo">Contenido ofensivo</option>
                                    <option value="Falsedad o spam">Falsedad o spam</option>
                                    <option value="Información incorrecta">Información incorrecta</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <textarea
                                    className="w-full bg-white border border-red-300 rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    rows={3}
                                    placeholder="Detalles adicionales (obligatorio)"
                                    value={detalle}
                                    onChange={(e) => setDetalle(e.target.value)}
                                    required
                                />
                                <button
                                    className="mt-3 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
                                    onClick={async () => {
                                        if (!motivo || !detalle.trim()) {
                                            alert("Completa todos los campos para denunciar.");
                                            return;
                                        }

                                        try {
                                            const res = await fetch(`http://localhost:3000/reportes/${report.id}/denunciar`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                                                },
                                                body: JSON.stringify({ motivo, detalle }),
                                            });

                                            if (!res.ok) {
                                                const error = await res.json();
                                                alert(`❌ Error: ${error.message}`);
                                                return;
                                            }

                                            alert("✅ Denuncia enviada correctamente.");
                                            setMotivo("");
                                            setDetalle("");
                                        } catch (err) {
                                            alert("❌ Error inesperado al enviar denuncia.");
                                        }
                                    }}
                                >
                                    Enviar denuncia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helpers
function getCategoryIcon(id: number) {
    return {
        1: "🚗",
        2: "🗑️",
        3: "💡",
        4: "🏢",
        5: "📋",
    }[id] || "📌";
}

function getCategoryName(id: number) {
    return {
        1: "Tráfico y Vía Pública",
        2: "Residuos Viales",
        3: "Alumbrado Público y Sistema Eléctrico",
        4: "Robo y Vandalismo",
        5: "Varios",
    }[id] || "Varios";
}

function getCategoryStyle(id: number) {
    return {
        1: "bg-red-100 text-red-700",
        2: "bg-green-100 text-green-700",
        3: "bg-yellow-100 text-yellow-700",
        4: "bg-purple-100 text-purple-700",
        5: "bg-gray-100 text-gray-700",
    }[id] || "bg-gray-100 text-gray-700";
}
