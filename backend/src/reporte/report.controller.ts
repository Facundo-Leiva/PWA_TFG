import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { SoporteService } from 'src/soporte/soporte.service';
import { CreateReporteDto } from './dto/create.reporte.dto';

@Controller('reportes')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly soporteService: SoporteService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async crearReporte(
        @Body() data: CreateReporteDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any
    ) {
        const usuarioId = req.user?.id;
        if (!usuarioId) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        if (!data.location) {
            throw new Error("Ubicación no proporcionada");
        }

        let ubicacionData;
        try {
            ubicacionData = JSON.parse(data.location);
        } catch (err) {
            throw new Error("Ubicación inválida");
        }

        let ubicacion = await this.reportService.buscarUbicacionExistente(ubicacionData);

        if (!ubicacion) {
            ubicacion = await this.reportService.crearUbicacion(ubicacionData);
        }

        const soporteGrafico = await this.soporteService.guardar(file);

        const reporte = await this.reportService.crear(
            data,
            usuarioId,
            soporteGrafico.id,
            ubicacion.id
        );

        return {
            mensaje: 'Reporte creado exitosamente',
            reporte,
        };
    }
}
