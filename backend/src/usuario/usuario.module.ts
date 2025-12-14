import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../prisma/prisma.service';

// Módulo de dominio para usuarios
@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, PrismaService],
})

export class UsuarioModule {}
