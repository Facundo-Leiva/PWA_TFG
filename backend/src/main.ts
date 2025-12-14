import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

// Punto de arranque de la aplicación NestJS
async function bootstrap() {

  // Cargar variables de entorno desde .env
  dotenv.config(); 

  // Crear la aplicación NestJS
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Suministrar archivos estáticos
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Habilitar CORS para el frontend
  app.enableCors(); 

  // Validar datos globalmente
  app.useGlobalPipes(new ValidationPipe());

  // Levantar el servidor
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
