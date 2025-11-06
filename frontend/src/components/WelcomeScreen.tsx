import React from "react";

interface Props {
    onLogin: () => void;
    onRegister: () => void;
    onExplore: () => void;
}

export default function WelcomeScreen({ onLogin, onRegister, onExplore }: Props) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4">        
            <div className="text-center text-white max-w-md mx-auto animate-fade-in">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Ciudad Colaborativa</h1>
                    <p className="text-blue-50 text-lg font-bold">Juntos Construimos Una Ciudad Mejor</p>
                </div>
                
                <p className="text-blue-50 mb-8 leading-relaxed font-bold">
                    Reporta incidencias urbanas, colabora con tu comunidad y ayuda a mejorar tu ciudad.
                    Cada reporte cuenta para crear espacios más seguros y funcionales.
                </p>
                
                <div className="space-y-4">
                    <button
                        onClick={onLogin}
                        className="w-full border-3 border-white text-white py-3 px-6 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={onRegister}
                        className="w-full border-3 border-white text-white py-3 px-6 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                        Registrarse
                    </button>
                    <button
                        onClick={onExplore}
                        className="w-full font-semibold text-blue-50 py-2 underline hover:text-white transition-colors"
                    >
                        Solo Quiero Explorar Reportes
                    </button>
                </div>
            </div>
        </div>
    );
}
