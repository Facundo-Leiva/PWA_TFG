import React from "react";

interface Props {
    onClose: () => void;
    onSubmit: (formData: { name: string; document: string; adress: string; email: string; password: string }) => void;
}

export default function RegisterModal({ onClose, onSubmit }: Props) {
    const [name, setName] = React.useState("");
    const [document, setDocument] = React.useState("");
    const [adress, setAdress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, document, adress, email, password });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4">        
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Número de Documento"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Dirección"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)}
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
