// src/usuario/usuario.module.ts
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}
