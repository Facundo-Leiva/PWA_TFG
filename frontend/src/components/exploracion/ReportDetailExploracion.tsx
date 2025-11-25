import type { Report } from "../ReportCard";
import { formatDateToLocal } from "../../utils/date";

interface Props {
    report: Report;
    onBack: () => void;
    onViewUser?: (userId: number) => void;
}

export default function ReportDetailExploracion({ report, onBack, onViewUser }: Props) {
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

                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {report.image ? (
                            <img
                                src={report.image}
                                alt={report.title}
                                className="h-48 w-full object-cover"
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
                                <p>
                                    👤 <strong>Reportado por:</strong>{" "}
                                    <button
                                        onClick={() => onViewUser?.(report.authorId)}
                                        className="font-semibold text-blue-600 hover:underline"
                                    >
                                        {report.author}
                                    </button>
                                </p>
                            </div>

                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                                <span>👍 {report.likes} Me gusta</span>
                                <span>💬 {report.comments} Comentarios</span>
                                <span>🛠️ Estado: {report.estado}</span>
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
