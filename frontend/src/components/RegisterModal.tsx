import React, { useState } from "react";
import { registrarUsuario } from "../api";
import LocationSearch from "./LocationSearch";

interface Props {
    onClose: () => void;
}

interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

function esContrasenaValida(password: string): boolean {
    const tieneLongitudMinima = password.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const noTieneEspacios = !/\s/.test(password);

    return (
        tieneLongitudMinima &&
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero &&
        noTieneEspacios
    );
}

export default function RegisterModal({ onClose }: Props) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [ubicacion, setUbicacion] = useState<UbicacionData | null>(null);
    const [passwordRules, setPasswordRules] = useState({
        longitud: false,
        mayuscula: false,
        minuscula: false,
        numero: false,
        sinEspacios: true,
    });

    const validarPassword = (value: string) => {
        setPassword(value);
        setPasswordRules({
            longitud: value.length >= 8,
            mayuscula: /[A-Z]/.test(value),
            minuscula: /[a-z]/.test(value),
            numero: /[0-9]/.test(value),
            sinEspacios: !/\s/.test(value),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!esContrasenaValida(password)) {
            alert("Contraseña no valida, verifique nuevamente.");
            return;
        }

        if (!ubicacion) {
            alert("Seleccioná una ubicación válida");
            return;
        }

        try {
            await registrarUsuario({
            nombre,
            apellido,
            documento: parseInt(documento),
            email,
            password,
            direccion,
            ubicacion,
            });

            alert("✅ Usuario creado exitosamente");

            // Limpiar campos
            setNombre("");
            setApellido("");
            setDocumento("");
            setDireccion("");
            setEmail("");
            setPassword("");
            setUbicacion(null);
            setError("");

            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al registrar usuario, verifique los datos.");
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4">        
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Número de Documento"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <div>
                        <LocationSearch
                            onSelect={(ubicacionSeleccionada) => {
                            setUbicacion(ubicacionSeleccionada);
                            setDireccion(ubicacionSeleccionada.direccion);
                            }}
                        />
                        {ubicacion && (
                            <p className="mt-2 text-sm text-gray-600">
                            📍 {ubicacion.direccion} ({ubicacion.barrio}, {ubicacion.ciudad})
                            </p>
                        )}
                    </div>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => validarPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <ul className="text-sm mt-2 space-y-1">
                        <li className={"font-semibold text-gray-800"}>
                            La Contraseña debe cumplir con:
                        </li>
                        <li className={passwordRules.longitud ? "text-green-600" : "text-red-600"}>
                            {passwordRules.longitud ? "✅" : "❌"} Mínimo 8 caracteres
                        </li>
                        <li className={passwordRules.mayuscula ? "text-green-600" : "text-red-600"}>
                            {passwordRules.mayuscula ? "✅" : "❌"} Al menos una letra mayúscula
                        </li>
                        <li className={passwordRules.minuscula ? "text-green-600" : "text-red-600"}>
                            {passwordRules.minuscula ? "✅" : "❌"} Al menos una letra minúscula
                        </li>
                        <li className={passwordRules.numero ? "text-green-600" : "text-red-600"}>
                            {passwordRules.numero ? "✅" : "❌"} Al menos un número
                        </li>
                        <li className={passwordRules.sinEspacios ? "text-green-600" : "text-red-600"}>
                            {passwordRules.sinEspacios ? "✅" : "❌"} Sin espacios
                        </li>
                    </ul>
                    {error && <p className="font-semibold text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Registrarse
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-blue-500 hover:underline block mx-auto"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
