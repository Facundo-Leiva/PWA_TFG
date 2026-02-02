import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationSearch from "./LocationSearch";

// Interfaces del componente

interface Usuario { 
    nombre: string; 
    apellido: string; 
}

interface Ubicacion {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

interface Reporte {
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    ubicacion: Ubicacion;
    usuario: Usuario;
}

interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

// Marcador de la ubicación del usuario
const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],      
    iconAnchor: [12, 41],    
    popupAnchor: [1, -34],   
    shadowSize: [41, 41],   
});

// Colores de los estados del reporte
const estadoColors: Record<string, string> = {
    pendiente: "bg-yellow-200 text-yellow-900",
    resuelto: "bg-green-200 text-green-900",
};

// Componente Mapa Geográfico 
export default function GeographicMap() {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const position: LatLngExpression = [-31.42, -64.19]; // Córdoba como centro inicial
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [ubicacion, setUbicacion] = useState<UbicacionData | null>(null);
    const [query, setQuery] = useState("");
    const [filtros, setFiltros] = useState({
        tipo: "", 
        estado: "", 
        fechaInicio: "", 
        fechaFin: "", 
        ciudad: "", 
        barrio: "", 
    });

    // Cargar la posición geográfica del usuario y los datos de reportes 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error("Error al obtener tu ubicación:", err);
            }
        );

        // Carga de datos de reportes
        async function fetchReportes() {
            try {
                const res = await fetch("http://localhost:3000/reportes/reportesMapa", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
                });
                if (!res.ok) throw new Error("Error al obtener reportes del mapa");

                const data = await res.json();
                setReportes(data);
            } catch (err) {
                console.error("Error al cargar reportes:", err);
            }
        }
            fetchReportes();
    }, []);
    
    // Función: guardar cambios en los filtros
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) { 
        setFiltros({ 
            ...filtros, 
            [e.target.name]: e.target.value 
        }); 
    }

    // Función: buscar reportes filtrados
    async function fetchReportesFiltrados() {
        try {
            const queryParams = new URLSearchParams(
                Object.entries({
                    tipo: filtros.tipo,
                    estado: filtros.estado,
                    fechaInicio: filtros.fechaInicio,
                    fechaFin: filtros.fechaFin,
                    ubicacion: ubicacion ? ubicacion.direccion : ""
                }).filter(([_, v]) => v !== "")
            ).toString();

            const res = await fetch(`http://localhost:3000/reportes/reportesFiltradosMapa?${queryParams}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
            });

            if (!res.ok) throw new Error("Error al obtener reportes filtrados");

            const data = await res.json();
            setReportes(data);
        } catch (err) {
            console.error("Error al cargar reportes filtrados:", err);
        }
    }

    // Retornar el componente HTML
    return (
        <div className="w-full max-w-7xl mx-auto bg-linear-to-br from-blue-300 via-white to-green-300 px-4 py-8">

            {/* Título */}
            <div className="bg-white border border-gray-300 rounded-lg shadow p-4 mb-8 text-center">
                <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                    Mapa Geográfico Interactivo
                </h1>
            </div>

            {/* Contenedor con el mapa */}
            <div className="h-[600px] rounded-lg shadow-md overflow-hidden mb-6">
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full"
                    style={{ position: "relative", zIndex: 0 }}
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Carga de los reportes en el mapa */}
                    {reportes.map((reporte) =>
                        reporte.ubicacion ? (
                            <Marker
                                key={reporte.id}
                                position={[reporte.ubicacion.latitud, reporte.ubicacion.longitud] as LatLngExpression}
                            >
                                <Popup>
                                    <h2 className="text-base font-bold">{reporte.titulo}</h2>
                                    <p className="text-sm">{reporte.descripcion}</p>
                                    <p className="text-sm text-gray-500">
                                        {reporte.ubicacion.direccion}, {reporte.ubicacion.barrio}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-sm text-gray-700">
                                            <span className="text-sm font-semibold">Autor:</span> {reporte.usuario.nombre} {reporte.usuario.apellido}
                                        </p>
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${
                                                estadoColors[reporte.estado.toLowerCase()] || "bg-cyan-200 text-cyan-900"
                                            }`}
                                        >
                                            {reporte.estado}
                                        </span>
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null
                    )}

                    {/* Marcador con la ubicación del usuario */}
                    {userLocation && (
                        <Marker position={userLocation} icon={redIcon}>
                            <Popup>
                                <strong className="text-base">Tu ubicación actual</strong>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* Contenedor con los filtros */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl text-center font-semibold text-gray-800 mb-6 border-b pb-2">
                    Filtros de búsqueda
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Tipo de incidencia */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Tipo de incidencia
                        </label>
                        <select
                            name="tipo"
                            value={filtros.tipo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        >
                            <option value="">Todos los tipos</option>
                            <option value="Tráfico y Vía Pública">Tráfico y Vía Pública</option>
                            <option value="Residuos Viales">Residuos Viales</option>
                            <option value="Alumbrado Público y Sistema Eléctrico">Alumbrado Público y Sistema Eléctrico</option>
                            <option value="Robo y Vandalismo">Robo y Vandalismo</option>
                            <option value="Varios">Varios</option>
                        </select>
                    </div>

                    {/* Estado del reporte */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Estado del reporte
                        </label>
                        <select
                            name="estado"
                            value={filtros.estado}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        >
                            <option value="">Todos los estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="resuelto">Resuelto</option>
                            <option value="en revisión">En Revisión</option>
                        </select>
                    </div>

                    {/* Fecha inicio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Fecha inicio
                        </label>
                        <input
                            type="date"
                            name="fechaInicio"
                            value={filtros.fechaInicio}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        />
                    </div>

                    {/* Fecha fin + botón para limpiar filtros */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha fin
                        </label>
                        <div className="flex items-center gap-2">
                            <input type="date" name="fechaFin" value={filtros.fechaFin} onChange={handleChange} className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
                            <button onClick={() => {
                                    setFiltros({
                                        tipo: "",
                                        estado: "",
                                        fechaInicio: "",
                                        fechaFin: "",
                                        ciudad: "",
                                        barrio: "",
                                    });
                                    setUbicacion(null);
                                    setQuery("");
                                }}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Ubicación del reporte */}
                    <div className="col-span-2 lg:col-span-3">
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                            Ubicación
                        </label>
                        <LocationSearch
                            value={query}
                            onChange={setQuery}
                            onSelect={setUbicacion}
                        />

                        {ubicacion && (
                            <div className="mt-3 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm font-semibold text-blue-800">
                                    Dirección seleccionada: {ubicacion.direccion} ({ubicacion.barrio}, {ubicacion.ciudad})
                                </p>
                                <button
                                    onClick={() => {
                                        setUbicacion(null);
                                        setQuery("");
                                    }}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                    ✕ Quitar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón para aplicar filtros */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={fetchReportesFiltrados}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                    >
                        Aplicar filtros
                    </button>
                </div>
            </div>
        </div>
    );
}
