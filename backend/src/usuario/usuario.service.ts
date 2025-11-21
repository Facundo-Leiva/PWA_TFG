// src/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) {}

    async getPerfil(userId: number) {
        // Buscar datos básicos del usuario
        const usuario = await this.prisma.usuario.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                email: true,
                fechaAlta: true,
            },
        });

        // Estadísticas
        const [created, verified] = await Promise.all([
            this.prisma.reporte.count({ where: { id_usuario: userId } }),
            this.prisma.reporte.count({ where: { id_usuario: userId, estado: 'verificado' } }),
        ]);

        // Reputación
        const reputation = created * 10 + verified * 20;

        // Reportes recientes
        const recientes = await this.prisma.reporte.findMany({
            where: { id_usuario: userId },
            orderBy: { fechaCreacion: 'desc' },
            take: 5,
            select: {
                titulo: true,
                estado: true,
                fechaCreacion: true,
                tipoDeIncidencia: { select: { id: true, categoria: true } },
            },
        });

        // DTO para el frontend
        return {
            name: `${usuario?.nombre} ${usuario?.apellido}`,
            joined: usuario?.fechaAlta?.toISOString() ?? new Date().toISOString(),
            avatar: usuario?.nombre?.[0]?.toUpperCase() ?? 'U',
            stats: { created, verified, reputation },
            reports: recientes.map((r) => ({
                title: r.titulo,
                category: r.tipoDeIncidencia.id,
                status: this.mapEstadoLabel(r.estado),
                date: r.fechaCreacion.toISOString(),
            })),
        };
    }

    private mapEstadoLabel(estado: string) {
        switch (estado) {
        case 'pendiente':
            return 'En revisión';
        case 'verificado':
            return 'Verificado';
        case 'resuelto':
            return 'Resuelto';
        default:
            return 'En revisión';
        }
    }
}
