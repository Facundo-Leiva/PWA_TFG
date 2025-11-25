import React, { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";

interface Props {
    onBack: () => void;
    onSubmit: (report: {
        title: string;
        category: string;
        description: string;
        location: UbicacionData;
        file?: File;
    }) => void;
}

interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

export default function CreateReport({ onBack, onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | undefined>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<{ id: number; categoria: string }[]>([]);
    const [ubicacion, setUbicacion] = useState<UbicacionData | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const res = await fetch("http://localhost:3000/tipos-incidencia");
                const data = await res.json();
                setCategorias(data);
            } catch (err) {
                console.error("Error al cargar categorías:", err);
            }
        }

        fetchCategorias();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!ubicacion) {
            alert("Seleccioná una ubicación válida.");
            return;
        }

        const reportData = {
            title,
            category,
            description,
            location: ubicacion,
            file,
        };

        onSubmit(reportData);
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
                                    {categorias.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {getCategoryIcon(cat.id)} {capitalize(cat.categoria)}
                                        </option>
                                    ))}
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
                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                Ubicación
                            </label>
                            <LocationSearch
                                value={query}
                                onChange={setQuery}
                                onSelect={setUbicacion}
                            />
                            {ubicacion && (
                                <p className="mt-2 text-sm font-semibold text-blue-800">
                                    Dirección seleccionada: {ubicacion.direccion} ({ubicacion.barrio}, {ubicacion.ciudad})
                                </p>
                            )}
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
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        setFile(selectedFile);
                                        if (selectedFile) {
                                            const url = URL.createObjectURL(selectedFile);
                                            setPreviewUrl(url);
                                        } else {
                                            setPreviewUrl(null);
                                        }
                                    }}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                                >
                                    Seleccionar Archivo
                                </label>
                                {previewUrl && (
                                    <div className="mt-4">
                                        <img
                                            src={previewUrl}
                                            alt="Vista previa"
                                            className="max-w-full h-auto rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
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

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
