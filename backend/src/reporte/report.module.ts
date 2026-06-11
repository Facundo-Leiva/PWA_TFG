import { Module } from '@nestjs/common';
import { ReportController } from './report.controller'; 
import { ReportService } from './report.service'; 
import { PrismaModule } from '../prisma/prisma.module';
import { SoporteModule } from 'src/soporte/soporte.modulo';
import { ReportOwnerGuard } from './report-owner.guard';

// Módulo de dominio para reportes
@Module({
    imports: [PrismaModule, SoporteModule],
    controllers: [ReportController],
    providers: [ReportService, ReportOwnerGuard],
})

export class ReportesModule {}
