// src/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Tipos centralizados
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
    ubicacion: UbicacionData; // 👈 ahora acepta objeto completo
}

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
