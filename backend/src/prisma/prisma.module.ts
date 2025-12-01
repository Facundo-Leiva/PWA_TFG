import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Módulo de dominio para Prisma y el acceso a base de datos
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaModule {}
