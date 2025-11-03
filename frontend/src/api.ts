// src/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function registrarUsuario(data: {
    nombre: string;
    apellido: string;
    documento: number;
    email: string;
    password: string;
    direccion: string;
    id_ubicacion: number;
}) {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
}

export async function iniciarSesion(email: string, password: string) {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    const { token, usuario } = res.data;
    localStorage.setItem('token', token);
    return usuario;
}
