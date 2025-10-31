import React from "react";

interface Props {
    onBack: () => void;
}

export default function UserProfile({ onBack }: Props) {
    const user = {
        name: "Usuario Demo",
        joined: "Enero 2024",
        avatar: "U",
        stats: {
            created: 12,
            verified: 8,
            reputation: 156,
        },
        reports: [
            {
                title: "Bache en Av. Principal",
                category: "trafico",
                status: "En revisión",
                date: "Hace 2 días",
            },
            {
                title: "Luminaria fundida",
                category: "alumbrado",
                status: "Resuelto",
                date: "Hace 5 días",
            },
        ],
    };

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

                <div className="max-w-4xl mx-auto px-4 py-6">
                    {/* Perfil básico */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center space-x-6 mb-6">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {user.avatar}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600">Miembro desde {user.joined}</p>
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
                                <div className="text-gray-600">Reportes Creados</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{user.stats.verified}</div>
                                <div className="text-gray-600">Reportes Verificados</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">{user.stats.reputation}</div>
                                <div className="text-gray-600">Puntos de Reputación</div>
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
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                                >
                                    <div>
                                        <h4 className="font-medium text-gray-800">{report.title}</h4>
                                        <p className="text-sm text-gray-600">
                                            {getCategoryIcon(report.category)} {capitalize(report.category)} • {report.date}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            report.status === "Resuelto"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {report.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helpers
function getCategoryIcon(cat: string) {
    return {
        trafico: "🚗",
        residuos: "🗑️",
        alumbrado: "💡",
        vandalismo: "🏢",
        otros: "📋",
    }[cat] || "📌";
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
