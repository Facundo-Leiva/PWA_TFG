import React, { useState } from "react";
import { registrarUsuario } from "../api";

interface Props {
    onClose: () => void;
}

export default function RegisterModal({ onClose }: Props) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registrarUsuario({
            nombre,
            apellido,
            documento: parseInt(documento),
            email,
            password,
            direccion,
            id_ubicacion: 1,
            });

            alert("✅ Usuario creado exitosamente");

            // Limpiar Campos
            setNombre("");
            setApellido("");
            setDocumento("");
            setDireccion("");
            setEmail("");
            setPassword("");
            setError("");

            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al registrar");
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
                    <input
                        type="text"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
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
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
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
