import { Module } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [SoporteService],
    exports: [SoporteService],
})

export class SoporteModule {}
