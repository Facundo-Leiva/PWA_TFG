import { formatRelative } from '../utils/date';

export interface Report {
    id: number;
    title: string;
    category: number;
    description: string;
    author: string;
    authorId: number,
    date: string;
    location: string;
    likes: number;
    comments: number;
    estado: string;
    image: string | null;
}

interface Props {
    report: Report;
    onClick: () => void;
}

// Componente Carta de Reporte (vista previa del reporte)
export default function ReportCard({ report, onClick }: Props) {

    // Retornar el componente de carta de reporte con la información del mismo
    return (
        <div
            className="report-card min-w-0 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
            onClick={onClick}
        >
            {report.image ? (
                <img
                    src={report.image}
                    alt={report.title}
                    className="h-52 sm:h-64 lg:h-72 w-full bg-gray-50 object-contain"
                />
            ) : (
                <div className="h-44 sm:h-48 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}

            <div className="p-4 sm:p-6">
                <div className="flex min-w-0 items-start justify-between gap-2 mb-3">
                    <span className={`max-w-full px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-normal break-words ${getCategoryStyle(report.category)}`}>
                        {getCategoryIcon(report.category)} {getCategoryName(report.category)}
                    </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 break-words">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 break-words">{report.description}</p>

                <div className="flex min-w-0 items-start justify-between text-sm text-gray-500 mb-3">
                    <span className="min-w-0 break-words">📍 {report.location}</span>
                </div>

                <div className="flex min-w-0 items-start justify-between text-sm text-gray-500 mb-3">
                    <span>Creado: {formatRelative(report.date)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estado: {report.estado}</span>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-600 break-words">Por: {report.author}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>👍 {report.likes}</span>
                        <span>💬 {report.comments}</span>
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
