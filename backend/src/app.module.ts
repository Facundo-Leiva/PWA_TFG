import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ReportesModule } from './reporte/report.module';
import { TipoDeIncidenciaModule } from './reporte/incidencia.module';
import { UsuarioModule } from './usuario/usuario.module';

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
        UsuarioModule
    ],
})
export class AppModule {}
