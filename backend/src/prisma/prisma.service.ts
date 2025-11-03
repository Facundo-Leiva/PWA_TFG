import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        // @ts-expect-error — el tipo 'beforeExit' está permitido en tiempo de ejecución
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
