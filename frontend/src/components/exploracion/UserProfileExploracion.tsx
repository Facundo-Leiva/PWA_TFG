import { useEffect, useState } from "react";
import { formatDateToLocal } from "../../utils/date";

interface Props { onBack: () => void; userId: number; }

interface Report {
    title: string;
    category: number;
    status: "pendiente" | "en revisión" | "resuelto";
    date: string;
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
}

// Componente Perfil de Usuarios (para usuarios que no están registrados)
export default function UserProfileExploracion({ onBack, userId }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Buscar perfil de usuario según ID
    useEffect(() => { fetchUserProfile(); }, [userId]);

    // Método buscar perfil de usuario
    async function fetchUserProfile() {
        try {
            const res = await fetch(`http://localhost:3000/usuarios/${userId}/perfilExp`, {
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
    }

    if (loading) return <p>Cargando perfil...</p>;
    if (!user) return <p>No se pudo cargar el perfil.</p>;

    const isAvatarUrl = user.avatar.startsWith("http");

    // Retornar el compontente HTML
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
                        <h1 className="text-xl font-semibold text-gray-800">Perfil de Usuario</h1>
                        <div className="w-6" />
                    </div>
                </header>

                {/* Datos asociados al usuario */}
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
                                <p className="text-gray-600">Miembro desde {formatDateToLocal(user.joined)}</p>
                                <div className="flex items-center mt-2">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        ⭐ Colaborador Activo
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Estadísticas del usuario */}
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

                        {/* Reportes recientes */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reportes Recientes</h3>
                            <div className="space-y-4">
                                {user.reports.map((report, index) => {
                                    const normalizedStatus = report.status?.trim().toLowerCase();

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg"
                                        >
                                            {/* Columna izquierda: título + fecha */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-800 truncate">{report.title}</h4>
                                                <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
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
