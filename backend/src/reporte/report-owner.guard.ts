import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

type AuthenticatedRequest = Request & {
    user?: {
        id: number;
        email: string;
    };
};

// Verifica que el reporte pertenezca al usuario autenticado antes de procesar
// los interceptores de carga de archivos y ejecutar el controlador.
@Injectable()
export class ReportOwnerGuard implements CanActivate {
    constructor(private readonly prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const reporteId = Number(request.params.id);
        const usuarioId = request.user?.id;

        if (!Number.isInteger(reporteId) || reporteId <= 0) {
            throw new BadRequestException('Identificador de reporte inválido.');
        }

        if (!usuarioId) {
            throw new UnauthorizedException('Usuario no autenticado.');
        }

        const reporte = await this.prisma.reporte.findUnique({
            where: { id: reporteId },
            select: { id_usuario: true },
        });

        if (!reporte) {
            throw new NotFoundException('Reporte no encontrado.');
        }

        if (reporte.id_usuario !== usuarioId) {
            throw new ForbiddenException(
                'No tienes permiso para modificar este reporte.',
            );
        }

        return true;
    }
}
