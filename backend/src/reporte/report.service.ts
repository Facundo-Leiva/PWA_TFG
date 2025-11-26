import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReporteDto } from "./dto/create.reporte.dto";

@Injectable()
export class ReportService {
    reportService: any;
    constructor(private readonly prisma: PrismaService) {}

    async crear (
        data: CreateReporteDto,
        usuarioId: number,
        soporteGraficoId: number,
        ubicacionId: number
    ) {
        const id_tipoDeIncidencia = parseInt(data.category);

        if (isNaN(id_tipoDeIncidencia)) {
            console.error("❌ Categoría inválida:", data.category);
            throw new BadRequestException("Categoría inválida.");
        }

        const reporte = await this.prisma.reporte.create({
            data: {
                titulo: data.title,
                descripcion: data.description,
                estado: "pendiente",
                fechaCreacion: new Date(),
                id_usuario: usuarioId,
                id_ubicacion: ubicacionId,
                id_tipoDeIncidencia: id_tipoDeIncidencia,
                id_soporteGrafico: soporteGraficoId,
            },
            include: {
                usuario: true,
                ubicacion: true,
                tipoDeIncidencia: true,
                soporteGrafico: true,
                comentarios: true,
            },
        });

        return reporte;
    }

    async getAllReports() {
        const reportes = await this.prisma.reporte.findMany({
            include: {
                usuario: true,
                comentarios: true,
                ubicacion: true,
                tipoDeIncidencia: true,
                soporteGrafico: true,
                likes: true
            },
            orderBy: { fechaCreacion: 'desc' },
        });

        return reportes.map((r) => ({
            id: r.id,
            title: r.titulo,
            category: r.tipoDeIncidencia.id, 
            description: r.descripcion,
            author: r.usuario.nombre + " " + r.usuario.apellido,
            authorId: r.usuario.id,
            date: r.fechaCreacion.toISOString(),
            location: r.ubicacion.direccion,
            likes: r.likes.length,
            comments: r.comentarios.length,
            estado: r.estado,
            image: r.soporteGrafico?.archivo
                ? `http://localhost:3000/uploads/${r.soporteGrafico.archivo.replace(/^\/?uploads\/?/, '')}`
                : null,
        }));
    }

    async buscarUbicacionExistente (data: { latitud: number; longitud: number }) {
        const TOLERANCIA = 0.00001;

        return this.prisma.ubicacion.findFirst({
            where: {
                latitud: {
                    gte: data.latitud - TOLERANCIA,
                    lte: data.latitud + TOLERANCIA,
                },
                longitud: {
                    gte: data.longitud - TOLERANCIA,
                    lte: data.longitud + TOLERANCIA,
                },
            },
        });
    }

    async darLike (reporteId: number, usuarioId: number) {
        const reporte = await this.prisma.reporte.findUnique({ where: { id: reporteId } });
        if (!reporte) throw new NotFoundException("Reporte no encontrado.");

        if (reporte.id_usuario === usuarioId) {
            throw new BadRequestException("No puedes dar like a tu propio reporte.");
        }

        const existente = await this.prisma.like.findUnique({
            where: { usuarioId_reporteId: { usuarioId, reporteId } },
        });
        if (existente) {
            throw new BadRequestException("Ya diste like a este reporte.");
        }

        await this.prisma.like.create({ data: { usuarioId, reporteId } });

        const totalLikes = await this.prisma.like.count({ where: { reporteId } });
        return { mensaje: "Like registrado", likes: totalLikes };
    }

    async crearComentario (
        id_reporte: number,
        id_usuario: number,
        contenido?: string,
        soporteGraficoUrl?: string,
        tipo?: string,
    ) {
        if (!contenido?.trim() && !soporteGraficoUrl) {
            throw new Error("El comentario debe tener texto o imagen.");
        }

        let soporteGrafico;
        if (soporteGraficoUrl) {
            soporteGrafico = await this.prisma.soporteGrafico.create({
                data: {
                    archivo: soporteGraficoUrl,
                    tipo: tipo || "image/png",
                },
            });
        }

        const data: any = {
            contenido: contenido ?? "",
            id_usuario,
            id_reporte,
        };

        if (soporteGrafico) {
            data.id_soporteGrafico = soporteGrafico.id;
        }

        const comentario = await this.prisma.comentario.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true } },
                soporteGrafico: true,
            },
        });

        return {
            id: comentario.id,
            author: `${comentario.usuario.nombre} ${comentario.usuario.apellido}`,
            content: comentario.contenido,
            createdAt: comentario.fechaEmision.toISOString(),
            soporteGrafico: comentario.soporteGrafico
            ? {
                id: comentario.soporteGrafico.id,
                tipo: comentario.soporteGrafico.tipo,
                archivo: comentario.soporteGrafico.archivo,
            }
            : null,
        };
    }

    async findByReporte (id_reporte: number) {
        const comentarios = await this.prisma.comentario.findMany({
            where: { id_reporte },
            orderBy: { fechaEmision: 'asc' },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true } },
                soporteGrafico: true,
            },
        });

        return comentarios.map((c) => ({
            id: c.id,
            author: `${c.usuario.nombre} ${c.usuario.apellido}`,
            content: c.contenido,
            createdAt: c.fechaEmision.toISOString(),
            soporteGrafico: c.soporteGrafico
            ? {
                id: c.soporteGrafico.id,
                tipo: c.soporteGrafico.tipo,
                archivo: c.soporteGrafico.archivo,
            }
            : null,
        }));
    }

    async crearUbicacion (data: {
        latitud: number;
        longitud: number;
        direccion: string;
        ciudad: string;
        barrio: string;
    }) {
        return this.prisma.ubicacion.create({
            data: {
                latitud: data.latitud,
                longitud: data.longitud,
                direccion: data.direccion,
                ciudad: data.ciudad,
                barrio: data.barrio,
            },
        });
    }
}
