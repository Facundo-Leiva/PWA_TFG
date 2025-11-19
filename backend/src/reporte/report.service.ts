import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReporteDto } from "./dto/create.reporte.dto";

@Injectable()
export class ReportService {
    constructor(private readonly prisma: PrismaService) {}

    async crear(
        data: CreateReporteDto,
        usuarioId: number,
        soporteGraficoId: number,
        ubicacionId: number
    ) {
        const id_tipoDeIncidencia = parseInt(data.category);

        if (isNaN(id_tipoDeIncidencia)) {
            throw new BadRequestException("Categoría inválida");
        }

        return this.prisma.reporte.create({
            data: {
                titulo: data.title,
                descripcion: data.description,
                estado: 'pendiente',
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
    }

    async getAllReports() {
        const reportes = await this.prisma.reporte.findMany({
        include: {
            usuario: true,
            comentarios: true,
            ubicacion: true,
            tipoDeIncidencia: true,
            soporteGrafico: true,
        },
        orderBy: { fechaCreacion: 'desc' },
        });

        return reportes.map((r) => ({
            id: r.id,
            title: r.titulo,
            category: r.tipoDeIncidencia.id, 
            description: r.descripcion,
            author: r.usuario.nombre + " " + r.usuario.apellido,
            date: r.fechaCreacion.toISOString(),
            location: r.ubicacion.direccion,
            likes: r.likes,
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
