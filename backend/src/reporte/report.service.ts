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

    async buscarUbicacionExistente(data: { latitud: number; longitud: number }) {
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

    async darLike(reporteId: number, usuarioId: number) {
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

    async crearUbicacion(data: {
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
