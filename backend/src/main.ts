import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Cargar variables de entorno desde .env

  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Habilitar CORS para el frontend

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
