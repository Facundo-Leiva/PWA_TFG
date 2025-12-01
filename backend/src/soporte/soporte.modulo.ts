import { Module } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { PrismaModule } from '../prisma/prisma.module';

// Módulo de dominio para el guardado de archivos
@Module({
    imports: [PrismaModule],
    providers: [SoporteService],
    exports: [SoporteService],
})

export class SoporteModule {}
