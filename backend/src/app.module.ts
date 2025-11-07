import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ReportesModule } from './reporte/report.module';
import { TipoDeIncidenciaModule } from './reporte/incidencia.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema: envValidationSchema,
        }),
        PrismaModule,
        AuthModule,
        ReportesModule,
        TipoDeIncidenciaModule,
    ],
})
export class AppModule {}
