// src/tipo-de-incidencia/tipo-de-incidencia.module.ts
import { Module } from '@nestjs/common';
import { TipoDeIncidenciaController } from './incidencia.controller';
import { PrismaService } from 'src/prisma/prisma.service';

// Módulo de dominio para los tipos de incidencias
@Module({
    controllers: [TipoDeIncidenciaController],
    providers: [PrismaService],
})

export class TipoDeIncidenciaModule {}
