import React, { useState } from "react";

interface Props {
    onBack: () => void;
    onSubmit: (report: {
        title: string;
        category: string;
        description: string;
        location: string;
        file?: File;
    }) => void;
}

export default function CreateReport({ onBack, onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [file, setFile] = useState<File | undefined>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, category, description, location, file });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-300 via-white to-green-300 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Crear Reporte</h1>
                        <div className="w-6" />
                    </div>
                </header>

                <div className="max-w-2xl mx-auto px-4 py-6">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Título del Reporte</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: Bache en Av. Principal"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Categoría</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Selecciona una Categoría</option>
                                <option value="trafico">🚗 Tráfico</option>
                                <option value="residuos">🗑️ Residuos</option>
                                <option value="alumbrado">💡 Alumbrado</option>
                                <option value="vandalismo">🏢 Vandalismo</option>
                                <option value="otros">📋 Otros</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Descripción</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe el problema con detalle..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Ubicación</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <p className="text-gray-600 mb-2">Selecciona la ubicación del problema</p>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    📍 Usar mi ubicación
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">Foto o Video</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                >
                                    Seleccionar Archivo
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            📤 Publicar Reporte
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
