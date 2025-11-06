import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req } from '@nestjs/common';
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
            throw new Error('Usuario no autenticado');
        }

        // Guardar el archivo multimedia
        const soporteGrafico = await this.soporteService.guardar(file);
        console.log('Archivo recibido:', file);

        // Crear el reporte con relaciones
        const reporte = await this.reportService.crear(
            data,
            usuarioId,
            soporteGrafico.id
        );

        return {
            mensaje: 'Reporte creado exitosamente',
            reporte,
        };
    }
}
