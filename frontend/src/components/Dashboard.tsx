import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import ReportDetail from "./ReportDetail";
import CreateReport from "./CreateReport";
import type { Report } from "./ReportCard";
import type { UbicacionData } from "../api";
import GeographicMap from "./GeographicMap";
import { API_URL } from "../api";

interface Props {
    onShowProfile: () => void;
    onShowDetail: (report: Report) => void;
    onLogout: () => void;
}

// Componente Dashboard Principal
type DashboardView = "list" | "map" | "create";

const DASHBOARD_VIEW_STORAGE_KEY = "dashboardView";

function getInitialDashboardView(): DashboardView {
    const storedView = sessionStorage.getItem(DASHBOARD_VIEW_STORAGE_KEY);
    return storedView === "map" || storedView === "create" ? storedView : "list";
}

export default function Dashboard({ onShowProfile, onShowDetail, onLogout }: Props) {
    const [view, setView] = useState<DashboardView>(getInitialDashboardView);
    const [filter, setFilter] = useState<string | number>("todos");
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [categories, setCategories] = useState<{ id: number; categoria: string }[]>([]);

    // Cargar reportes y categorías desde base de datos
    useEffect(() => {
        fetchReports();
        fetchCategories();
    }, []);

    useEffect(() => {
        sessionStorage.setItem(DASHBOARD_VIEW_STORAGE_KEY, view);
    }, [view]);

    // Cargar categorías
    async function fetchCategories() {
        try {
            const res = await fetch(`${API_URL}/tipos-incidencia`, {
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

    // Cargar reportes
    async function fetchReports() {
        try {
            const res = await fetch(`${API_URL}/reportes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
            });
            if (!res.ok) throw new Error("❌ Error al obtener reportes.");
            const data = await res.json();
            setReports(data);
        } catch (err) {
            console.error("❌ Error cargando reportes:", err);
            alert("❌ No se pudieron cargar los reportes.");
        }
    }

    // Filtrar reportes según categoría
    const filteredReports =
        filter === "todos"
            ? reports
            : reports.filter((r) => r.category === filter);

    // Llamar función para manejar la creación de reportes
    async function handleCreateReportSubmit(report: {
        title: string;
        category: string;
        description: string;
        location: UbicacionData;
        file?: File;
    }) {
        try {
            const formData = new FormData();
            formData.append("title", report.title);
            formData.append("category", report.category);
            formData.append("description", report.description);
            formData.append("location", JSON.stringify(report.location));

            if (report.file) {
                formData.append("file", report.file);
            }

            const res = await fetch(`${API_URL}/reportes`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                console.error("❌ Error al crear reporte:", error);
                alert("❌ No se pudo crear el reporte: " + error.message);
                return;
            }

            alert("✅ Reporte creado exitosamente.");
            setView("list");
            fetchReports();
        } catch (err) {
            console.error("❌ Error de red:", err);
            alert("❌ Error de conexión con el servidor.");
        }
    }

    // Retornar el componente HTML
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-linear-to-r from-blue-600 to-green-600 shadow-lg sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-3">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-white rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <h1 className="truncate text-base sm:text-xl font-bold text-white">Ciudad Colaborativa</h1>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            onClick={onLogout}
                            className="min-h-10 rounded-lg border border-white/70 px-2.5 sm:px-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Cerrar sesión"
                            title="Cerrar sesión"
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                </svg>
                                <span className="hidden sm:inline">Cerrar sesión</span>
                            </span>
                        </button>

                        {/* Botón del perfil del usuario */}
                        <button
                            type="button"
                            onClick={onShowProfile}
                            className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-blue-600 font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Abrir perfil"
                            title="Abrir perfil"
                        >
                            P
                        </button>
                    </div>
                </div>
            </header>

            {/* Navegación de funciones del componente */}
            <div className="bg-linear-to-r from-blue-200 to-green-200 border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <button
                            onClick={() => setView("list")}
                            className={`category-filter w-full px-4 sm:px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                                view === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            📰 Novedades
                        </button>
                        <button
                            onClick={() => setView("map")}
                            className={`w-full px-4 sm:px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                                view === "map" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            🗺️ Ver Mapa
                        </button>
                        <button
                            onClick={() => setView("create")}
                            className={`w-full px-4 sm:px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                                view === "create"
                                ? "bg-linear-to-r from-orange-500 to-red-500 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            📢 Crear Reporte
                        </button>
                    </div>

                    {/* Filtros */}
                    {view === "list" && (
                        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 Buscar reportes</h3>
                            <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide px-1 pb-2 overscroll-x-contain">
                                <button
                                    onClick={() => setFilter("todos")}
                                    className={`shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
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
                                        className={`shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
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
            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

                {/* Tarjetas de reportes */}
                {view === "list" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

                {/* Instanciar el componente de creación de reporte */}
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
function getCategoryIcon(id: number) {
    return {
        1: "🚗",
        2: "🗑️",
        3: "💡",
        4: "🏢",
        5: "📋",
    }[id] || "📌";
}
