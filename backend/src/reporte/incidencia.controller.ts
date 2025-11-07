import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('tipos-incidencia')
export class TipoDeIncidenciaController {
    constructor(private readonly prisma: PrismaService) {}

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
