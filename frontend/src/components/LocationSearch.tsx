import { useEffect, useState } from "react";

interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

/*
Componente para devolver ubicaciones geográficas de Argentina.
Incluye autocompletado y conexión a la API de LocationIQ. 
*/
export default function LocationSearch({
    value,
    onChange,
    onSelect,
}: {
    value: string;
    onChange: (val: string) => void;
    onSelect: (data: UbicacionData) => void;
}) {
    const [results, setResults] = useState<any[]>([]);

    // Busqueda con debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value.length >= 3) {
                fetchResults(value);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [value]);

    // Buscar direcciones geográficas utilizando la API de LocationIQ.
    const fetchResults = async (query: string) => {
        try {
            const res = await fetch(
                `https://api.locationiq.com/v1/autocomplete?key=pk.eb11f28a0d6cd46db4e167baf57974ae&q=${query}&limit=5&format=json&countrycodes=ar`
            );
            if (res.status === 429) {
                console.warn("Demasiadas solicitudes a LocationIQ");
                setResults([]);
                return;
            }
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error("Error al buscar dirección:", err);
            setResults([]);
        }
    };

    // Transformar el objeto LocationIQ en el tipo UbicacionData
    const handleSelect = (place: any) => {
        const ubicacion = {
            latitud: parseFloat(place.lat),
            longitud: parseFloat(place.lon),
            direccion: place.display_name,
            ciudad: place.address?.city || place.address?.town || "",
            barrio: place.address?.suburb || place.address?.neighbourhood || "",
        };
        onSelect(ubicacion);
        onChange(""); // Limpiar el Input
        setResults([]); // Ocultar sugerencias
    };

    // Retornar el componente con la lista de sugerencias
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Dirección"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {results.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto">
                    {results.map((place) => (
                        <li
                            key={`${place.place_id}-${place.lat}-${place.lon}`}
                            onClick={() => handleSelect(place)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
