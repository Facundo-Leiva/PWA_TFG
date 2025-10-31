import React from "react";

export interface Report {
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
}

interface Props {
    report: Report;
    onClick: () => void;
}

export default function ReportCard({ report, onClick }: Props) {
    return (
        <div
            className="report-card bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
            onClick={onClick}
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

function getCategoryName(cat: string) {
    return {
        trafico: "Tráfico",
        residuos: "Residuos",
        alumbrado: "Alumbrado",
        vandalismo: "Vandalismo",
        otros: "Otros",
    }[cat] || "Otros";
}

function getCategoryStyle(cat: string) {
    return {
        trafico: "bg-red-100 text-red-700",
        residuos: "bg-green-100 text-green-700",
        alumbrado: "bg-yellow-100 text-yellow-700",
        vandalismo: "bg-purple-100 text-purple-700",
        otros: "bg-gray-100 text-gray-700",
    }[cat] || "bg-gray-100 text-gray-700";
}
