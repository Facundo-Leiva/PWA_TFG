import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private config: ConfigService,
        private jwtService: JwtService,
    ) {}

    async register(data: RegisterDto) {
        const existingEmail = await this.prisma.usuario.findUnique({ where: { email: data.email } });
        if (existingEmail) throw new ForbiddenException('El correo electrónico ya se encuentra registrado.');
        const existingDoc = await this.prisma.usuario.findUnique({ where: { documento: data.documento } });
        if (existingDoc) throw new ForbiddenException('El documento ya se encuentra registrado.');

        const hashedPassword = await argon2.hash(data.password, {
            type: argon2.argon2id,
        });
        const usuario = await this.prisma.usuario.create({
        data: { ...data, password: hashedPassword },
        });

        return usuario;
    }

    async login(data: LoginDto) {
        const usuario = await this.prisma.usuario.findUnique({ where: { email: data.email } });
        if (!usuario) throw new ForbiddenException('Usuario no encontrado, verifique los datos.');

        if (usuario.bloqueadoHasta && usuario.bloqueadoHasta > new Date()) {
            throw new ForbiddenException("Acceso bloqueado. Intente más tarde.");
        }

        const isValid = await argon2.verify(usuario.password, data.password);
        if (!isValid) {
            const nuevosIntentos = usuario.intentosFallidos + 1;

            await this.prisma.usuario.update({
                where: { id: usuario.id },
                data: {
                    intentosFallidos: nuevosIntentos,
                    bloqueadoHasta: nuevosIntentos >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null,
                },
            });

            throw new ForbiddenException('Contraseña incorrecta, vuelva a intentar.');
        }

        await this.prisma.usuario.update({
            where: { id: usuario.id },
            data: {
            intentosFallidos: 0,
            bloqueadoHasta: null,
            },
        });

        const payload = { sub: usuario.id, email: usuario.email };
        const token = this.jwtService.sign(payload);

        return { token, usuario };
    }
}
