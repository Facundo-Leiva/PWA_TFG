import React, { useState } from "react";
import ReportCard from "./ReportCard";
import ReportDetail from "./ReportDetail";
import CreateReport from "./CreateReport";

interface Props {
    onShowProfile: () => void;
    onShowDetail: (report: Report) => void;
}

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

export default function Dashboard({ onShowProfile, onShowDetail }: Props) {
    const [view, setView] = useState<"list" | "map" | "create">("list");
    const [filter, setFilter] = useState<string>("todos");
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const filteredReports =
        filter === "todos"
        ? sampleReports
        : sampleReports.filter((r) => r.category === filter);

    async function handleCreateReportSubmit(report: {
        title: string;
        category: string;
        description: string;
        location: string;
        file?: File;
    }) {
        const formData = new FormData();
        formData.append("title", report.title);
        formData.append("category", report.category);
        formData.append("description", report.description);
        formData.append("location", report.location);
        if (report.file) {
            formData.append("file", report.file);
        }

        try {
            const res = await fetch("http://localhost:3000/reportes", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("❌ Error al crear reporte:", error);
                alert("No se pudo crear el reporte: " + error.message);
                return;
            }

            const data = await res.json();
            console.log("✅ Reporte creado:", data);
            alert("Reporte creado exitosamente");
            setView("list");
        } catch (err) {
            console.error("❌ Error de red:", err);
            alert("Error de conexión con el servidor");
        }
    }

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
                        onClick={onShowProfile}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-semibold hover:bg-blue-50"
                    >
                        U
                    </button>
                </div>
            </header>

            {/* Navegación y filtros */}
            <div className="bg-linear-to-r from-blue-200 to-green-200 border-b border-gray-200">
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredReports.map((report) => (
                                <ReportCard
                                    key={report.id}
                                    report={report}
                                    onClick={() => onShowDetail(report)}
                                />
                            ))}
                        </div>

                        {selectedReport && (
                            <ReportDetail
                                report={selectedReport}
                                onBack={() => setSelectedReport(null)}
                            />
                        )}
                    </>
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
                    <CreateReport
                        onBack={() => setView("list")}
                        onSubmit={handleCreateReportSubmit}
                    />
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

    function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
