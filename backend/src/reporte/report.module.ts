import { Module } from '@nestjs/common';
import { ReportController } from './report.controller'; 
import { ReportService } from './report.service'; 
import { PrismaModule } from '../prisma/prisma.module';
import { SoporteModule } from 'src/soporte/soporte.modulo'; 

@Module({
    imports: [PrismaModule, SoporteModule],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportesModule {}
