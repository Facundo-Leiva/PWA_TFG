import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SoporteService {
    constructor(private readonly prisma: PrismaService) {}

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
