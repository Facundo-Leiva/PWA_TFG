import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  dotenv.config(); // Cargar variables de entorno desde .env

  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors(); // Habilitar CORS para el frontend

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);

}
bootstrap();
