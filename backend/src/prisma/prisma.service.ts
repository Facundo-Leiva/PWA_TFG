import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Servicio de la API: relacionado con el acceso a la base de datos mediante Prisma
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Función: abrir conexión al iniciar el módulo
    async onModuleInit() {
        await this.$connect();
    }
}