import React from "react";

interface Props {
  onClose: () => void;
  onSubmit: (credentials: { email: string; password: string }) => void;
}

export default function LoginModal({ onClose, onSubmit }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

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
