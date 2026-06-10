import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

// Servicio de la API: relacionado con la autenticación del usuario
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    // Función: registrar un usuario nuevo
    async register(data: RegisterDto) {
        const existingEmail = await this.prisma.usuario.findUnique({
            where: { email: data.email },
        });
        if (existingEmail) {
            throw new ForbiddenException(
                'El correo electrónico ya se encuentra registrado.',
            );
        }

        const existingDoc = await this.prisma.usuario.findUnique({
            where: { documento: data.documento },
        });
        if (existingDoc) {
            throw new ForbiddenException('El documento ya se encuentra registrado.');
        }

        // Hashear contraseña
        const hashedPassword = await argon2.hash(data.password, {
            type: argon2.argon2id,
        });

        // Buscar ubicación existente con tolerancia
        const TOLERANCIA = 0.00001;
        let ubicacion = await this.prisma.ubicacion.findFirst({
            where: {
                latitud: {
                    gte: data.ubicacion.latitud - TOLERANCIA,
                    lte: data.ubicacion.latitud + TOLERANCIA,
                },
                longitud: {
                    gte: data.ubicacion.longitud - TOLERANCIA,
                    lte: data.ubicacion.longitud + TOLERANCIA,
                },
            },
        });

        // Crear ubicación si no existe
        if (!ubicacion) {
            ubicacion = await this.prisma.ubicacion.create({
                data: {
                    latitud: data.ubicacion.latitud,
                    longitud: data.ubicacion.longitud,
                    direccion: data.ubicacion.direccion,
                    ciudad: data.ubicacion.ciudad,
                    barrio: data.ubicacion.barrio,
                },
            });
        }

        // Crear el usuario y devolver solamente los campos necesarios para el cliente.
        return this.prisma.usuario.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                documento: data.documento,
                email: data.email,
                password: hashedPassword,
                direccion: data.direccion,
                id_ubicacion: ubicacion.id,
            },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                email: true,
                fechaAlta: true,
            },
        });
    }

    // Función: inicio de sesión del usuario
    async login(data: LoginDto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: data.email },
        });
        if (!usuario) {
            throw new ForbiddenException(
                'Usuario no encontrado, verifique los datos.',
            );
        }

        // Verificar si el usuario está bloqueado
        if (usuario.bloqueadoHasta && usuario.bloqueadoHasta > new Date()) {
            throw new ForbiddenException('Acceso bloqueado. Intente más tarde.');
        }

        // Validar contraseña
        const isValid = await argon2.verify(usuario.password, data.password);

        // Si es incorrecta, agregar un intento fallido
        if (!isValid) {
            const nuevosIntentos = usuario.intentosFallidos + 1;

            // Al quinto intento se bloquea el acceso al usuario
            await this.prisma.usuario.update({
                where: { id: usuario.id },
                data: {
                    intentosFallidos: nuevosIntentos,
                    bloqueadoHasta:
                        nuevosIntentos >= 5
                            ? new Date(Date.now() + 30 * 60 * 1000)
                            : null,
                },
            });

            throw new ForbiddenException(
                'Contraseña incorrecta, vuelva a intentar.',
            );
        }

        // Si es correcta, se resetean los intentos
        await this.prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                intentosFallidos: 0,
                bloqueadoHasta: null,
            },
        });

        // Generar token de validación
        const payload = { sub: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);

        // Construir una respuesta segura. No se devuelve el hash ni datos internos
        // relacionados con los intentos de acceso y el bloqueo de la cuenta.
        const usuarioSeguro = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            fechaAlta: usuario.fechaAlta,
        };

        return { token, usuario: usuarioSeguro };
    }
}
