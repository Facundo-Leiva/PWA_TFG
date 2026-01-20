import { useEffect, useState } from "react";
import { formatDateToLocal } from "../utils/date";

interface Props { 
    onBack: () => void; 
}

export interface Report {
    id: number;                 
    title: string;              
    description: string;       
    category: number;           
    createdAt: string;
    status: "pendiente" | "en revisión" | "resuelto";
    date: string;               
    soporteGraficoId: number;
    soporteGrafico?: string;   
}

export interface FollowedReport { 
    id: number; 
    title: string; 
    description: string; 
    status: string; 
    createdAt: string; 
    category: string | number; 
}

interface Denuncia {
    motivo: string;
    detalle: string;
    fecha: string;
    reporte?: string;
    autor?: string;   
}

interface User {
    name: string;
    joined: string;
    avatar: string;
    stats: {
        created: number;
        resolved: number;
        reputation: number;
    };
    reports: Report[];
    denunciasRealizadas: Denuncia[];
    denunciasRecibidas: Denuncia[];
    seguidos?: Report[];
}

// Componente del Perfil Propio de Usuario 
export default function UserProfile({ onBack }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingReport, setEditingReport] = useState<Report | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Buscar datos del usuario al cargar
    useEffect(() => { fetchUserProfile(); }, []);

    // Llamar la función para obtener los datos del usuario
    async function fetchUserProfile() {
        try {
            // Perfil del usuario
            const res = await fetch("http://localhost:3000/usuarios/perfil", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
            });
            if (!res.ok) throw new Error("Error al obtener perfil");
            const data: User = await res.json();

            // Reportes seguidos
            const resSeguidos = await fetch("http://localhost:3000/reportes/seguidos", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
            });
            if (!resSeguidos.ok) throw new Error("Error al obtener reportes seguidos");
            const seguidosData = await resSeguidos.json();

            setUser({
                ...data,
                seguidos: seguidosData,
            });
        } catch (err) {
            console.error("❌ Error cargando perfil:", err);
            alert("No se pudo cargar el perfil del usuario");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-300 via-white to-green-300 flex items-center justify-center">
                <p className="text-gray-700">Cargando perfil...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-300 via-white to-green-300 flex items-center justify-center">
                <p className="text-red-600">No se pudo cargar el perfil</p>
            </div>
        );
    }

    const isAvatarUrl = user.avatar.startsWith("http");

    // Llamar la función para actualizar los datos de un reporte
    async function handleUpdateReport(id: number, data: any) {

        if (!data.titulo?.trim() || !data.descripcion?.trim()) {
            alert("Título y Descripción son obligatorios.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("titulo", data.titulo);
        formDataToSend.append("descripcion", data.descripcion);
        formDataToSend.append("estado", data.estado);
        formDataToSend.append("soporteGraficoId", String(data.soporteGraficoId ?? ""));

        if (data.soporteGrafico instanceof File) {
            formDataToSend.append("soporteGrafico", data.soporteGrafico, data.soporteGrafico.name);
        }

        try {
            const res = await fetch(`http://localhost:3000/reportes/${id}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
                body: formDataToSend,
            });

            if (!res.ok) throw new Error("❌ Error al actualizar reporte.");

            // refrescar perfil
            await fetchUserProfile();
            setEditingReport(null);
            alert("✅ El reporte se actualizó correctamente.");
        } catch (err) {
            console.error("❌ Error actualizando reporte:", err);
            alert("No se pudo actualizar el reporte.");
        }
    }

    // Retornar el componente de perfil del usuario
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-300 via-white to-green-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div onClick={onBack} className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                        <button className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Mi Perfil</h1>
                        <div className="w-6" />
                    </div>
                </header>

                {/* Datos del usuario */}
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center space-x-6 mb-6">
                            {isAvatarUrl ? (
                                <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {user.avatar}
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600">
                                    Miembro desde {formatDateToLocal(user.joined)}
                                </p>
                                <div className="flex items-center mt-2">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        ⭐ Colaborador Activo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{user.stats.created}</div>
                                <div className="text-gray-700">Reportes Creados</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{user.stats.resolved}</div>
                                <div className="text-gray-700">Reportes Resueltos</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">{user.stats.reputation}</div>
                                <div className="text-gray-700">Puntos de Reputación</div>
                            </div>
                        </div>
                    </div>

                    {/* Reportes recientes */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Reportes Recientes</h3>
                        <div className="space-y-4">
                            {user.reports.map((report, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
                                >
                                    {/* Columna izquierda: título + fecha */}
                                    <div>
                                        <h4 className="font-medium text-gray-800">{report.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            {getCategoryIcon(report.category)} • {formatDateToLocal(report.date)}
                                        </p>
                                    </div>

                                    {/* Columna derecha: estado + botón para actualizar */}
                                    <div className="flex flex-col items-center gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                report.status === "resuelto"
                                                    ? "bg-green-100 text-green-800"
                                                : report.status === "en revisión"
                                                    ? "bg-blue-100 text-blue-800"
                                                : report.status === "pendiente"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                : ""
                                            }`}
                                        >
                                            {report.status === "pendiente"
                                                    ? "Pendiente"
                                                : report.status === "en revisión"
                                                    ? "En revisión"
                                                : report.status === "resuelto"
                                                    ? "Resuelto"
                                                : report.status}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setEditingReport(report);
                                                setFormData({
                                                    titulo: report.title,
                                                    descripcion: report.description,
                                                    estado: report.status.toLowerCase(),
                                                    soporteGraficoId: report.soporteGraficoId,
                                                    soporteGrafico: null,
                                                });
                                                setPreviewUrl(report.soporteGrafico || null);
                                            }}
                                            className="px-2 py-1 font-semibold bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
                                        >
                                            Editar Reporte
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reportes seguidos */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reportes Seguidos</h3>
                        <div className="space-y-4">
                            {user?.seguidos?.length === 0 && (
                                <p className="text-gray-500">Todavía no sigues ningún reporte.</p>
                            )}

                            {user?.seguidos?.map((report, index) => {
                                const normalizedStatus = report.status?.trim().toLowerCase();

                                return (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between gap-4 p-4 border border-gray-200 rounded-lg"
                                    >
                                        {/* Columna izquierda: título + descripción + categoría + fecha */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-800 truncate">{report.title}</h4>
                                            <p className="text-sm text-gray-700 mt-1">{report.description}</p>
                                            <br />
                                            <p className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(report.category)}`}>
                                                {getCategoryName(report.category)} • {formatDateToLocal(report.createdAt)}
                                            </p>
                                        </div>

                                        {/* Columna derecha: estado */}
                                        <div className="shrink-0">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center justify-center ${
                                                    normalizedStatus === "resuelto"
                                                    ? "bg-green-100 text-green-800"
                                                    : normalizedStatus === "en revisión"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : normalizedStatus === "pendiente"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {normalizedStatus === "pendiente"
                                                    ? "Pendiente"
                                                    : normalizedStatus === "en revisión"
                                                    ? "En revisión"
                                                    : normalizedStatus === "resuelto"
                                                    ? "Resuelto"
                                                    : report.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Denuncias realizadas */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Denuncias Realizadas</h3>
                        {Array.isArray(user.denunciasRealizadas) && user.denunciasRealizadas.length === 0 ? (
                            <p className="text-gray-600">No has realizado ninguna denuncia.</p>
                        ) : (
                            <div className="space-y-4">
                                {user.denunciasRealizadas?.map((denuncia, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-red-50">
                                        <h4 className="font-medium text-red-700">{denuncia.motivo}</h4>
                                        <p className="text-sm text-gray-700">
                                            Reporte: {denuncia.reporte} | Fecha: {formatDateToLocal(denuncia.fecha)} |
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">Comentario: {denuncia.detalle}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Denuncias recibidas */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Denuncias Contra Mí</h3>
                        {Array.isArray(user.denunciasRecibidas) && user.denunciasRecibidas.length === 0 ? (
                            <p className="text-gray-600">No tienes denuncias en tu contra.</p>
                        ) : (
                            <div className="space-y-4">
                                {user.denunciasRecibidas?.map((denuncia, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-yellow-50">
                                        <h4 className="font-medium text-yellow-700">{denuncia.motivo}</h4>
                                        <p className="text-sm text-gray-700">
                                            Realizada por: {denuncia.autor} | Fecha: {formatDateToLocal(denuncia.fecha)} |
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1">Comentario: {denuncia.detalle}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Formulario para editar reporte */}
            {editingReport && (
                <div className="fixed inset-0 z-50 overflow-auto bg-linear-to-br from-blue-300 via-white to-green-300 px-4 py-8">
                    <div className="mx-auto w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Editar Reporte</h3>

                    <hr className="my-6 border-t border-gray-300" />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateReport(editingReport.id, formData);
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Columna izquierda */}
                        <div className="space-y-4">
                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1">Descripción</label>
                                <textarea
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-6 py-6 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* Estado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-1">Estado</label>
                                <select
                                    value={formData.estado}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="en revisión">En revisión</option>
                                    <option value="resuelto">Resuelto</option>
                                </select>
                            </div>
                        </div>

                        {/* Columna derecha: imagen */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-900 mb-2">Foto o Video</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white shadow-sm">
                                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>

                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) {
                                            setFormData({ ...formData, soporteGrafico: selectedFile });
                                            setPreviewUrl(URL.createObjectURL(selectedFile));
                                        }
                                    }}
                                    className="hidden"
                                    id="file-upload"
                                />

                                <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                                    Seleccionar Archivo
                                </label>

                                {previewUrl && (
                                    <div className="mt-4">
                                        <img src={previewUrl} alt="Vista previa" className="w-48 h-auto mx-auto rounded-lg shadow-md" />
                                        <p className="text-sm text-gray-600 mt-1 text-center">Imagen actual del reporte</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setEditingReport(null)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}
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
