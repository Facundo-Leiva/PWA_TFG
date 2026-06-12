import { useCallback, useEffect, useState } from "react";
import { formatDateToLocal } from "../utils/date";
import { API_URL } from "../api";

interface Props {
    onBack: () => void; userId: number;
}

interface Report {
    title: string;
    category: number;
    status: string;
    date: string;
}

interface User {
    id: number,
    name: string;
    joined: string;
    avatar: string;
    stats: {
        created: number;
        resolved: number;
        reputation: number;
    };
    reports: Report[];
}

// Componente para Visualizar la Información del Perfil de Otro Usuario
export default function OtherUserProfile({ onBack, userId }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Llamar la función para obtener los datos del perfil del usuario
    const fetchUserProfile = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/usuarios/${userId}/perfil`, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                },
            });
            if (!res.ok) throw new Error("Error al obtener perfil.");
            const data: User = await res.json();
            setUser(data);
        } catch (err) {
            console.error("❌ Error cargando perfil:", err);
            alert("No se pudo cargar el perfil del usuario.");
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Obtener datos del usuario al cargar
    useEffect(() => { fetchUserProfile(); }, [fetchUserProfile]);

    if (loading) return <p>Cargando perfil...</p>;
    if (!user) return <p>No se pudo cargar el perfil.</p>;

    const isAvatarUrl = user.avatar.startsWith("http");

    // Retornar el componente del perfil del usuario
    return (
        <div className="min-h-[100dvh] bg-linear-to-br from-blue-300 via-white to-green-300 flex items-start sm:items-center justify-center px-3 py-4 sm:px-4 sm:py-8">
            <div className="w-full max-w-2xl overflow-hidden bg-white rounded-xl shadow-xl p-0 sm:p-6 md:p-8">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 flex items-center justify-between gap-3">
                        <button onClick={onBack} className="-m-2 min-h-11 min-w-11 p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">Perfil de Usuario</h1>
                        <div className="w-6" />
                    </div>
                </header>

                {/* Datos del usuario */}
                <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left mb-6">
                            {isAvatarUrl ? (
                                <img src={user.avatar} alt="Avatar" className="w-20 h-20 shrink-0 rounded-full object-cover" />
                            ) : (
                                <div className="w-20 h-20 shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {user.avatar}
                                </div>
                            )}
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{user.name}</h2>
                                <p className="text-gray-600">Miembro desde {formatDateToLocal(user.joined)}</p>
                                <div className="flex items-center justify-center sm:justify-start mt-2">
                                    <span className="inline-flex max-w-full bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium text-center">
                                        ⭐ Colaborador Activo
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Estadísticas */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6">
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

                        <hr className="my-8 border-t border-gray-300" />

                        {/* Calificación del usuario */}
                        <div className="mt-6 flex items-center justify-center">
                            <div className="w-full sm:w-auto bg-purple-50 border border-purple-300 rounded-lg px-4 py-3 shadow-sm flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                                <span className="font-semibold text-purple-700 text-base sm:text-lg text-center sm:text-left">Calificar usuario:</span>
                                <select
                                    className="w-full sm:w-auto min-h-11 bg-white border border-purple-400 rounded-md px-3 py-2 text-base sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    onChange={async (e) => {
                                        const nota = parseInt(e.target.value);
                                        if (!nota) return;

                                        try {
                                            const res = await fetch(`${API_URL}/usuarios/${user.id}/calificar`, {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                                                },
                                                body: JSON.stringify({ nota }),
                                            });

                                            if (!res.ok) {
                                                const error = await res.json();
                                                alert(`❌ Error: ${error.message || "No se pudo calificar al usuario."}`);
                                                return;
                                            }

                                            alert("✅ Usuario calificado correctamente.");
                                            fetchUserProfile();
                                        } catch {
                                            alert("❌ Error inesperado al calificar usuario.");
                                        }
                                    }}
                                >
                                    <option className="text-gray-800 font-medium" value="">Seleccionar nota...</option>
                                        {[...Array(10)].map((_, i) => (
                                            <option
                                                key={i + 1}
                                                value={i + 1}
                                                className="text-purple-700 font-semibold"
                                            >
                                                {i + 1}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <hr className="my-8 border-t border-gray-300" />

                        {/* Reportes recientes */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reportes Recientes</h3>
                            <div className="space-y-4">
                                {user.reports.map((report, index) => {
                                    const normalizedStatus = report.status?.trim().toLowerCase();

                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-stretch gap-3 p-4 border border-gray-200 rounded-lg sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            {/* Columna izquierda: título + fecha */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-800 truncate">{report.title}</h4>
                                                <p className="text-sm text-gray-600 break-words">
                                                    {getCategoryIcon(report.category)} • {formatDateToLocal(report.date)}
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
