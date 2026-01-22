import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

export default function MapaReportes() {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const position: LatLngExpression = [-31.42, -64.19]; // Córdoba como centro inicial
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error("Error al obtener tu ubicación:", err);
            }
        );

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

    return (
        <div className="w-full min-h-0 bg-linear-to-br from-blue-300 via-white to-green-300 px-4 py-8">
            <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-md p-3 mb-4">
                <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Mapa Geográfico Interactivo
                </h1>
            </div>
            <div className="w-full h-[600px] rounded-lg shadow-md overflow-hidden">

                {/* Contenedor con el mapa */}
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
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
        </div>
    );
}
