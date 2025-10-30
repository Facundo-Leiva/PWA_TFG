import React, { useState } from "react";

type Report = {
    id: number;
    title: string;
    category: string;
    description: string;
    author: string;
    date: string;
    location: string;
    likes: number;
    comments: number;
    verified: boolean;
    image: boolean;
};

const sampleReports: Report[] = [
    {
        id: 1,
        title: "Bache profundo en Av. Principal",
        category: "trafico",
        description: "Hay un bache muy profundo que puede dañar los vehículos. Está justo frente al semáforo.",
        author: "María González",
        date: "Hace 2 horas",
        location: "Av. Principal 1234",
        likes: 15,
        comments: 3,
        verified: false,
        image: true,
    },
    {
        id: 2,
        title: "Luminaria fundida en parque",
        category: "alumbrado",
        description: "La luminaria del parque central no funciona desde hace una semana. El área queda muy oscura.",
        author: "Carlos Ruiz",
        date: "Hace 5 horas",
        location: "Parque Central",
        likes: 8,
        comments: 1,
        verified: false,
        image: true,
    },
    {
        id: 3,
        title: "Acumulación de basura",
        category: "residuos",
        description: "Se acumula basura en la esquina, necesita recolección urgente. Hay riesgo sanitario.",
        author: "Ana López",
        date: "Hace 1 día",
        location: "Calle 5 esquina 12",
        likes: 23,
        comments: 7,
        verified: false,
        image: true,
    },
    {
        id: 4,
        title: "Grafiti en edificio público",
        category: "vandalismo",
        description: "Aparecieron grafitis en la fachada del centro comunitario. Se requiere limpieza.",
        author: "Pedro Martín",
        date: "Hace 2 días",
        location: "Centro Comunitario Norte",
        likes: 12,
        comments: 4,
        verified: true,
        image: true,
    },
];

export default function Dashboard() {
    const [view, setView] = useState<"list" | "map" | "create">("list");
    const [filter, setFilter] = useState<string>("todos");

    const filteredReports =
        filter === "todos"
        ? sampleReports
        : sampleReports.filter((r) => r.category === filter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-linear-to-r from-blue-600 to-green-600 shadow-lg sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-white">Ciudad Colaborativa</h1>
                    </div>
                    <button
                        onClick={() => alert("Ir a perfil")}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-semibold hover:bg-blue-50"
                    >
                        U
                    </button>
                </div>
            </header>

            {/* Navegación y filtros */}
            <div className="bg-linear-to-r from-blue-50 to-green-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex flex-wrap gap-4 mb-6">
                        <button
                        onClick={() => setView("list")}
                        className={`category-filter px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                            view === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                        >
                            📰 Novedades
                        </button>
                        <button
                        onClick={() => setView("map")}
                        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                            view === "map" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                        >
                            🗺️ Ver Mapa
                        </button>
                        <button
                        onClick={() => setView("create")}
                        className="px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:from-orange-600 hover:to-red-600 transition-all"
                        >
                            ➕ Crear Reporte
                        </button>
                    </div>

                    {/* Filtros */}
                    {view === "list" && (
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Buscar reportes</h3>
                            <div className="flex flex-wrap gap-3">
                                {["todos", "trafico", "residuos", "alumbrado", "vandalismo"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`category-filter px-4 py-2 rounded-full font-medium transition-colors ${
                                    filter === cat
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {getCategoryIcon(cat)} {capitalize(cat)}
                                </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                {view === "list" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="report-card bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
                        >
                            {report.image && (
                                <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(report.category)}`}>
                                        {getCategoryIcon(report.category)} {getCategoryName(report.category)}
                                    </span>
                                    {report.verified && <span className="text-green-600 text-sm">✓ Verificado</span>}
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{report.title}</h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{report.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                    <span>📍 {report.location}</span>
                                    <span>{report.date}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Por {report.author}</span>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>👍 {report.likes}</span>
                                        <span>💬 {report.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                )}

                {view === "map" && (
                    <div className="map-container rounded-lg p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Mapa Interactivo</h3>
                        <p className="text-gray-600 mb-4">Aquí se mostraría un mapa con los reportes geolocalizados</p>
                        <button
                        onClick={() => setView("list")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Volver a Lista
                        </button>
                    </div>
                )}

                {view === "create" && (
                    <div className="text-center text-gray-600">
                        <p>Formulario de creación de reportes próximamente…</p>
                    </div>
                )}
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
        todos: "📋",
    }[cat] || "📌";
    }
    function getCategoryName(cat: string) {
    return {
        trafico: "Accidentes en la Via Pública",
        residuos: "Residuos en la Via Pública",
        alumbrado: "Desperfectos en el Alumbrado Público",
        vandalismo: "Delincuencia y Vandalismo",
        todos: "Incidentes Varios",
    }[cat] || "Incidente";
    }

    function getCategoryStyle(cat: string) {
    return {
        trafico: "bg-red-100 text-red-700",
        residuos: "bg-green-100 text-green-700",
        alumbrado: "bg-yellow-100 text-yellow-700",
        vandalismo: "bg-purple-100 text-purple-700",
        todos: "bg-gray-100 text-gray-700",
    }[cat] || "bg-gray-100 text-gray-700";
    }

    function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
