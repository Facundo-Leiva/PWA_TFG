import axios from 'axios';

// URL base de la API
const BASE_URL = 'http://localhost:3000';

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
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
}

// Iniciar sesión
export async function iniciarSesion(email: string, password: string) {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    const { token, usuario } = res.data;
    return { token, usuario };
}
