import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

// Servicio de la API: relacionado con el guardado de archivos
@Injectable()
export class SoporteService {
    constructor(private readonly prisma: PrismaService) {}

    // Función: guardar archivo (imagen o video)
    async guardar(file: Express.Multer.File) {
        const soporte = await this.prisma.soporteGrafico.create({
            data: {
                archivo: `/uploads/${file.filename}`,
                tipo: file.mimetype,
            },
        });

        return soporte;
    }
}
