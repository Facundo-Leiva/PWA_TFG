import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

// Controlador de peticiones HTTP para obtener los tipos de incidencias
@Controller('tipos-incidencia')
export class TipoDeIncidenciaController {
    constructor(private readonly prisma: PrismaService) {}

    // Función: obtener tipos de incidencias desde base de datos
    @Get()
    async obtenerTodos() {
        return this.prisma.tipoDeIncidencia.findMany({
            select: {
                id: true,
                categoria: true,
                descripcion: true,
            },
        });
    }
}
