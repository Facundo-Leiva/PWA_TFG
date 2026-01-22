import { useEffect, useState } from "react";
import ReportCard from "../ReportCard";
import ReportDetail from "../ReportDetail";
import type { Report } from "../ReportCard";
import GeographicMap from "../GeographicMap";

interface Props {
    onShowDetail: (report: Report) => void;
}

// Componente Dashboard de Exploración (para usuarios que no están registrados)
export default function DashboardExploracion({ onShowDetail }: Props) {
    const [view, setView] = useState<"list" | "map" | "create">("list");
    const [filter, setFilter] = useState<string | number>("todos");
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [categories, setCategories] = useState<{ id: number; categoria: string }[]>([]);

    // Cargar reportes y categorías desde base de datos
    useEffect(() => {
        fetchReports();
        fetchCategories();
    }, []);

    // Llamar la función de carga de categorías
    async function fetchCategories() {
        try {
            const res = await fetch("http://localhost:3000/tipos-incidencia", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                },
            });
            if (!res.ok) throw new Error("❌ Error al obtener categorías.");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("❌ Error cargando categorías:", err);
            alert("❌ No se pudieron cargar las categorías.");
        }
    }

    // Llamar la función de carga de reportes
    async function fetchReports() {
        try {
            const res = await fetch("http://localhost:3000/reportes", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                },
            });
            if (!res.ok) throw new Error("Error al obtener reportes.");
            const data = await res.json();
            setReports(data);
        } catch (err) {
            console.error("❌ Error cargando reportes:", err);
            alert("No se pudieron cargar los reportes.");
        }
    }

    // Filtrar reportes según categoría
    const filteredReports =
        filter === "todos"
            ? reports
            : reports.filter((r) => r.category === filter);

    // Retorna el componente HTML
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
                    </div>

                    {/* Filtros */}
                    {view === "list" && (
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Buscar reportes</h3>

                            <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide px-1 pb-2">
                                <button
                                    onClick={() => setFilter("todos")}
                                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                                        filter === "todos"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    📋 Todos
                                </button>

                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setFilter(cat.id)}
                                        className={`px-4 py-2 rounded-full font-medium transition-colors ${
                                            filter === cat.id
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    >
                                        {getCategoryIcon(cat.id)} {cat.categoria}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto px-4 py-6">

                {/* Tarjetas de reportes */}
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

                {/* Mapa geográfico */}
                {view === "map" && <GeographicMap />}
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
