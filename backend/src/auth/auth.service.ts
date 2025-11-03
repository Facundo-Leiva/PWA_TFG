import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor (
        private prisma: PrismaService,
        private config: ConfigService
    ) {}

    async register(data: RegisterDto) {
        const existing = await this.prisma.usuario.findUnique({ where: { email: data.email } });
        if (existing) throw new Error('Email ya registrado');

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
        if (!usuario) throw new Error('Usuario no encontrado');

        const isValid = await argon2.verify(usuario.password, data.password);
        if (!isValid) throw new Error('Contraseña incorrecta');

        const secret = this.config.get<string>('jwtSecret');
        if (!secret) throw new Error("JWT_SECRET no está definida");

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, {
            expiresIn: '1d',
        });

        return { token, usuario };
    }
}
