import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { envValidationSchema } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
        validationSchema: envValidationSchema,
        }),
        PrismaModule,
        AuthModule,
    ],
})
export class AppModule {}
