import React, { useState } from "react";
import { iniciarSesion } from "../api";

interface Props {
  onClose: () => void;
  onSubmit: (usuario: any) => void;
}

// Componente para el Inicio de Sesión del Usuario
export default function LoginModal({ onClose, onSubmit }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState("");

  // Llamadar método para el inicio de sesión
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const respuesta = await iniciarSesion(email, password);
      localStorage.setItem("token", respuesta.token);       
      alert("✅ Sesión iniciada correctamente.");
      onClose();
      onSubmit(respuesta.usuario);                           
    } catch (err: any) {
      setError(err.response?.data?.message || "❌ Error al iniciar sesión.");
    }
  };

  // Retornar el componente de inicio de sesión
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4">        
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
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
          {error && <p className="font-semibold text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Iniciar sesión
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
