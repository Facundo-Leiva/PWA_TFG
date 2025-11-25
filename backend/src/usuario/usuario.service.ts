import { Injectable, NotFoundException } from '@nestjs/common';
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
        const reputacion = created * 10 + verified * 20;

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
            stats: { created, verified, reputacion },
            reports: recientes.map((r) => ({
                title: r.titulo,
                category: r.tipoDeIncidencia.id,
                status: this.mapEstadoLabel(r.estado),
                date: r.fechaCreacion.toISOString(),
            })),
        };
    }

    async obtenerPerfilUsuario(id: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                reportes: true,
            },
        });

        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        // Estadísticas
        const [created, verified] = await Promise.all([
            this.prisma.reporte.count({ where: { id_usuario: id } }),
            this.prisma.reporte.count({ where: { id_usuario: id, estado: 'verificado' } }),
        ]);

        // Reputación
        const reputacion = created * 10 + verified * 20;

        return {
            name: `${usuario.nombre} ${usuario.apellido}`,
            joined: usuario.fechaAlta,
            avatar: usuario?.nombre?.[0]?.toUpperCase() ?? 'U',
            stats: {
                created: usuario.reportes.length,
                verified: usuario.reportes.filter(r => r.estado === 'Verificado').length,
                reputation: reputacion ?? 0,
            },
            reports: usuario.reportes.map(r => ({
                title: r.titulo,
                category: r.id_tipoDeIncidencia,
                status: r.estado,
                date: r.fechaCreacion,
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
