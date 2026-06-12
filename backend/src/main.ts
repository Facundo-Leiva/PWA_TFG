import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ensureUploadDirectory } from './config/upload.config';

// Punto de arranque de la aplicación NestJS
async function bootstrap() {
    // Crear la aplicación NestJS
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    // Crear y publicar la carpeta de archivos cargados.
    const uploadDirectory = ensureUploadDirectory();
    app.useStaticAssets(uploadDirectory, {
        prefix: '/uploads/',
    });

    // Permitir únicamente los orígenes configurados para el frontend.
    const corsOrigins = configService.get<string[]>('corsOrigins') ?? [];
    app.enableCors({
        origin: corsOrigins,
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Validar y transformar los datos de entrada antes de llegar a los servicios.
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: false,
            },
            validationError: {
                target: false,
                value: false,
            },
        }),
    );

    // Levantar el servidor
    await app.listen(configService.get<number>('port') ?? 3000, '0.0.0.0');
}

bootstrap();
