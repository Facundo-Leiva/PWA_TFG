import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReporteDto } from "./dto/create.reporte.dto";

// Servicio de la API: relacionado con los reportes
@Injectable()
export class ReportService {
    reportService: any;
    constructor(private readonly prisma: PrismaService) {}

    // Función: crear un reporte
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

        // Crear el reporte con los datos que vienen del frontend mediante el data transfer objet
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

        // retornar el reporte
        return reporte;
    }

    // Función: actualizar un reporte
    async update (id: number, data: any) {
        // Actualizar el reporte con los datos que vienen desde el frontend mediante el data tranfer objet
        return this.prisma.reporte.update({
            where: { id },
            data: {
                titulo: data.titulo,
                descripcion: data.descripcion,
                estado: data.estado,
                ...(data.file?.filename && {
                    soporteGrafico: {
                        update: {
                            archivo: `/uploads/${data.file.filename}`,
                            tipo: "imagen",
                        },
                    },
                }),
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

    // Función: obtener todos los reportes existentes en base de datos
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

        // Retornar mediante un tipo reporte con datos mapeados
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

    // Función: buscar ubicación guardada en base de datos
    async buscarUbicacionExistente (data: { latitud: number; longitud: number }) {
        // Número de tolerancia para las diferencias en las latitudes y longitudes
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

    // Función: dar me gusta a un reporte
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

    // Función: seguir un reporte
    async seguirReporte(reporteId: number, usuarioId: number) { 
        const reporte = await this.prisma.reporte.findUnique({ where: { id: reporteId } }); 
        if (!reporte) throw new NotFoundException("Reporte no encontrado."); 

        if (reporte.id_usuario === usuarioId) { 
            throw new BadRequestException("No puedes seguir tu propio reporte."); 
        } 

        const existente = await this.prisma.seguimiento.findUnique({ 
            where: { usuarioId_reporteId: { usuarioId, reporteId } }, 
        }); 
        if (existente) { 
            throw new BadRequestException("Ya sigues este reporte."); 
        } 

        await this.prisma.seguimiento.create({ data: { usuarioId, reporteId } }); 

        const totalSeguidores = await this.prisma.seguimiento.count({ where: { reporteId } }); 
        return { mensaje: "Reporte seguido con éxito ✅", seguidores: totalSeguidores }; 
    } 

    // Función: obtener lista de reportes seguidos
    async obtenerSeguidos(usuarioId: number) { 
        const seguidos = await this.prisma.seguimiento.findMany({
            where: { usuarioId }, 
            include: {
                reporte: {
                    select: {
                        id: true, 
                        titulo: true,
                        descripcion: true,
                        estado: true, 
                        tipoDeIncidencia: { select: { id: true, categoria: true } },
                        fechaCreacion: true,
                    }
                }
            }
        }); 

        return seguidos.map(s => ({
            id: s.reporte.id, 
            title: s.reporte.titulo, 
            description: s.reporte.descripcion,
            status: s.reporte.estado, 
            createdAt: s.reporte.fechaCreacion.toISOString(),
            category: s.reporte.tipoDeIncidencia?.id ?? "",
        }));
    }

    // Función: agregar un comentario en un reporte
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

        // Agregar soporte gráfico al comentario
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

        // Crear comentario incluyendo datos del usuario que lo generó
        const comentario = await this.prisma.comentario.create({
            data,
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true } },
                soporteGrafico: true,
            },
        });

        // Retornar el comentario creado con los datos obtenidos
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

    // Función: buscar comentarios asociados a un reporte
    async findByReporte (id_reporte: number) {
        const comentarios = await this.prisma.comentario.findMany({
            where: { id_reporte },
            orderBy: { fechaEmision: 'asc' },
            include: {
                usuario: { select: { id: true, nombre: true, apellido: true } },
                soporteGrafico: true,
            },
        });

        // Retornar comentario con la información mapeada
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

    // Función: denunciar el reporte de un usuario
    async denunciarReporte(id_reporte: number, motivo: string, detalle: string, id_autor: number) {
        if (!motivo || motivo.trim().length === 0) {
            throw new BadRequestException("El motivo es obligatorio.");
        }

        if (!detalle || detalle.trim().length === 0) {
            throw new BadRequestException("El detalle es obligatorio.");
        }

        const reporte = await this.prisma.reporte.findUnique({
            where: { id: id_reporte },
            select: { id_usuario: true },
        });

        if (!reporte) throw new NotFoundException("Reporte no encontrado.");
        if (reporte.id_usuario === id_autor) {
            throw new ForbiddenException("No puedes denunciar tu propio reporte.");
        }

        // Retornar una denuncia con los datos de la misma y del usuario denunciante
        return this.prisma.denunciaReporte.upsert({
            where: {
                id_autor_id_reporte: { id_autor, id_reporte },
            },
            update: {
                motivo,
                detalle,
                fecha: new Date(),
            },
            create: {
                motivo,
                detalle,
                id_autor,
                id_reporte,
            },
        });
    }

    // Función: crear y guardar una ubicación geográfica en base de datos
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
