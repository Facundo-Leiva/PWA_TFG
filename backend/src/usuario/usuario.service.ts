import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
    constructor(private readonly prisma: PrismaService) {}

    async getPerfil(userId: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                email: true,
                fechaAlta: true,
                calificaciones: { select: { nota: true } },
            },
        });

        const denunciasRealizadas = await this.prisma.denunciaReporte.findMany({
            where: { id_autor: userId },
            orderBy: { fecha: "desc" },
            select: {
                motivo: true,
                detalle: true,
                fecha: true,
                reporte: {
                    select: { titulo: true },
                },
            },
        });

        const denunciasRecibidas = await this.prisma.denunciaReporte.findMany({
            where: {
                reporte: {
                    id_usuario: userId,
                },
            },
            orderBy: { fecha: "desc" },
            select: {
                motivo: true,
                detalle: true,
                fecha: true,
                autor: {
                    select: { nombre: true, apellido: true },
                },
                reporte: {
                    select: { titulo: true },
                },
            },
        });

        if (!usuario) throw new NotFoundException("Usuario no encontrado");

        const [created, resolved] = await Promise.all([
            this.prisma.reporte.count({ where: { id_usuario: userId } }),
            this.prisma.reporte.count({ where: { id_usuario: userId, estado: "resuelto" } }),
        ]);

        // Puntos por tipo de actividad
        const PUNTOS_CREATED = 7;
        const PUNTOS_RESOLVED = 9;

        // Reputación base total por actividad
        const reputacionBase = created * PUNTOS_CREATED + resolved * PUNTOS_RESOLVED;

        // Promedio de actividad por reporte (ponderado)
        // Si no hay actividad, queda 0
        const totalEventos = created + resolved;
        const actividadPromedio = totalEventos > 0
            ? reputacionBase / totalEventos
            : 0;

        // Calificación promedio de usuarios (1–10)
        const promedioCalificaciones =
        usuario.calificaciones.length > 0
            ? usuario.calificaciones.reduce((acc, c) => acc + c.nota, 0) / usuario.calificaciones.length
            : 0;

        const actividadEscalada = Math.min(10, Math.max(1, actividadPromedio || 1));

        const tieneCalificaciones = usuario.calificaciones.length > 0;

        let reputacionFinal: number;

        if (tieneCalificaciones) {
            const calificacionEscalada = Math.min(10, Math.max(1, promedioCalificaciones));
            reputacionFinal = Number(((actividadEscalada + calificacionEscalada) / 2).toFixed(1));
        } else {
            reputacionFinal = Number(actividadEscalada.toFixed(1));
        }

        const recientes = await this.prisma.reporte.findMany({
            where: { id_usuario: userId },
            orderBy: { fechaCreacion: "desc" },
            take: 5,
            select: {
                id: true,
                titulo: true,
                descripcion: true,
                estado: true,
                fechaCreacion: true,
                tipoDeIncidencia: { select: { id: true, categoria: true } },
                soporteGrafico: { select: { archivo: true } },
                id_soporteGrafico: true,
            },
        });

        return {
            id: usuario.id,
            name: `${usuario.nombre} ${usuario.apellido}`,
            joined: usuario.fechaAlta.toISOString(),
            avatar: usuario.nombre[0]?.toUpperCase() ?? "U",
            stats: { created, resolved, reputation: reputacionFinal },
            reports: recientes.map((r) => ({
                id: r.id,
                title: r.titulo,
                description: r.descripcion,
                category: r.tipoDeIncidencia.id,
                status: this.mapEstadoLabel(r.estado),
                date: r.fechaCreacion.toISOString(),
                soporteGrafico: r.soporteGrafico?.archivo
                    ? `http://localhost:3000/uploads/${r.soporteGrafico.archivo.replace(/^\/?uploads\/?/, '')}`
                    : null,
                soporteGraficoId: r.id_soporteGrafico,
            })),
            denunciasRealizadas: denunciasRealizadas.map(d => ({
                motivo: d.motivo,
                detalle: d.detalle,
                fecha: d.fecha.toISOString(),
                reporte: d.reporte.titulo,
            })),
            denunciasRecibidas: denunciasRecibidas.map(d => ({
                motivo: d.motivo,
                detalle: d.detalle,
                fecha: d.fecha.toISOString(),
                autor: `${d.autor.nombre} ${d.autor.apellido}`,
                reporte: d.reporte.titulo,
            }))
        };
    }

    async obtenerPerfilUsuario(id: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                fechaAlta: true,
                reportes: true,
                calificaciones: { select: { nota: true } },
            },
        });

        if (!usuario) throw new NotFoundException("Usuario no encontrado.");

        const [created, resolved] = await Promise.all([
            this.prisma.reporte.count({ where: { id_usuario: id } }),
            this.prisma.reporte.count({ where: { id_usuario: id, estado: "resuelto" } }),
        ]);

        // Puntos por tipo de actividad
        const PUNTOS_CREATED = 7;
        const PUNTOS_RESOLVED= 9;

        // Reputación base total por actividad
        const reputacionBase = created * PUNTOS_CREATED + resolved * PUNTOS_RESOLVED;

        // Promedio de actividad por reporte (ponderado)
        // Si no hay actividad, queda 0
        const totalEventos = created + resolved;
        const actividadPromedio = totalEventos > 0
            ? reputacionBase / totalEventos
            : 0;

        // Calificación promedio de usuarios (1–10)
        const promedioCalificaciones =
        usuario.calificaciones.length > 0
            ? usuario.calificaciones.reduce((acc, c) => acc + c.nota, 0) / usuario.calificaciones.length
            : 0;

        const actividadEscalada = Math.min(10, Math.max(1, actividadPromedio || 1));

        const tieneCalificaciones = usuario.calificaciones.length > 0;

        let reputacionFinal: number;

        if (tieneCalificaciones) {
            const calificacionEscalada = Math.min(10, Math.max(1, promedioCalificaciones));
            reputacionFinal = Number(((actividadEscalada + calificacionEscalada) / 2).toFixed(1));
        } else {
            reputacionFinal = Number(actividadEscalada.toFixed(1));
        }

        return {
            id: usuario.id,
            name: `${usuario.nombre} ${usuario.apellido}`,
            joined: usuario.fechaAlta.toISOString(),
            avatar: usuario.nombre[0]?.toUpperCase() ?? "U",
            stats: {
                created,
                resolved,
                reputation: reputacionFinal,
            },
            reports: usuario.reportes.map((r) => ({
                title: r.titulo,
                category: r.id_tipoDeIncidencia,
                status: this.mapEstadoLabel(r.estado),
                date: r.fechaCreacion.toISOString(),
            })),
        };
    }

    async calificarUsuario(usuarioId: number, nota: number, autorId: number) {
        if (nota < 1 || nota > 10) {
            throw new BadRequestException("La nota debe estar entre 1 y 10.");
        }

        if (usuarioId === autorId) {
            throw new ForbiddenException("No puedes calificarte a ti mismo.");
        }

        const usuario = await this.prisma.usuario.findUnique({ where: { id: usuarioId } });
        if (!usuario) throw new NotFoundException("Usuario no encontrado");

        return this.prisma.calificacion.upsert({
            where: {
                usuarioId_autorId: { usuarioId, autorId },
            },
            update: { nota },
            create: { nota, usuarioId, autorId },
        });
    }

    private mapEstadoLabel(estado: string) {
        const normalized = estado.trim().toLowerCase();
        switch (normalized) {
            case 'pendiente':
                return 'pendiente';
            case 'en revisión':
                return 'en revisión';
            case 'resuelto':
                return 'resuelto';
            default:
                return 'pendiente';
        }   
    }
}
