import { useEffect, useState } from "react";

interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

export default function LocationSearch({ onSelect }: { onSelect: (data: UbicacionData) => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.length >= 3) {
            fetchResults(query);
            }
        }, 1000); // Espera 1000ms antes de buscar

        return () => clearTimeout(timeout);
    }, [query]);

    const fetchResults = async (query: string) => {
        try {
            const res = await fetch(
                // Token de LocationIQ: pk.eb11f28a0d6cd46db4e167baf57974ae
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


    const handleSelect = (place: any) => {
        const ubicacion = {
            latitud: parseFloat(place.lat),
            longitud: parseFloat(place.lon),
            direccion: place.display_name,
            ciudad: place.address?.city || place.address?.town || "",
            barrio: place.address?.suburb || place.address?.neighbourhood || "",
        };
        onSelect(ubicacion);
        setQuery(place.display_name);
        setResults([]);
    };

    return (
        <div className="relative">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
