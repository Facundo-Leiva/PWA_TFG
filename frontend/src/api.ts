import axios from "axios";

// URL base de la API. En producción se configura con VITE_API_URL.
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL = (configuredApiUrl || "http://localhost:3000").replace(/\/+$/, "");

// Construye una URL válida tanto para endpoints como para archivos estáticos.
export function buildApiUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_URL}/${path.replace(/^\/+/, "")}`;
}

// Cliente Axios compartido para las solicitudes de autenticación.
const api = axios.create({
    baseURL: API_URL,
});

// Tipos centralizados (UbicacionData - RegisterPayload)

export interface UbicacionData {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
    barrio: string;
}

export interface RegisterPayload {
    nombre: string;
    apellido: string;
    documento: number;
    email: string;
    password: string;
    direccion: string;
    ubicacion: UbicacionData;
}

// Funciones (Registro e Inicio de Sesión)

// Registrar usuario
export async function registrarUsuario(data: RegisterPayload) {
    const res = await api.post("/auth/register", data);
    return res.data;
}

// Iniciar sesión
export async function iniciarSesion(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    const { token, usuario } = res.data;
    return { token, usuario };
}
