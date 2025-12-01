
// DTO para el registro de usuario
export class RegisterDto {
    nombre: string;
    apellido: string;
    documento: number;
    email: string;
    password: string;
    direccion: string;
    ubicacion: {
        latitud: number;
        longitud: number;
        direccion: string;
        ciudad: string;
        barrio: string;
    };
}
