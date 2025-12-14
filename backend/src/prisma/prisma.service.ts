import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Servicio de la API: relacionado con el acceso a la base de datos mediante Prisma
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Función: abrir conexión al iniciar el módulo
    async onModuleInit() {
        await this.$connect();
    }

    // Función: cerrar conexión al cerrar la App
    async enableShutdownHooks(app: INestApplication) {
        // @ts-expect-error — el tipo 'beforeExit' está permitido en tiempo de ejecución
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
