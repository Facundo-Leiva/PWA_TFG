import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReporteDto } from "./dto/create.reporte.dto";

@Injectable()
export class ReportService {
    constructor(private readonly prisma: PrismaService) {}

    async crear(data: CreateReporteDto, usuarioId: number, soporteGraficoId: number) {
        const id_ubicacion = parseInt(data.location);
        const id_tipoDeIncidencia = parseInt(data.category);

        if (isNaN(id_ubicacion) || isNaN(id_tipoDeIncidencia)) {
            throw new Error("Ubicación o categoría inválida");
        }   

        return this.prisma.reporte.create({
        data: {
            titulo: data.title,
            descripcion: data.description,
            estado: 'pendiente',
            fechaCreacion: new Date(),
            id_usuario: usuarioId,
            id_ubicacion: parseInt(data.location),
            id_tipoDeIncidencia: parseInt(data.category),
            id_soporteGrafico: soporteGraficoId,
        },
        });
    }
}
