import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req, UnauthorizedException, Get, InternalServerErrorException, BadRequestException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { SoporteService } from 'src/soporte/soporte.service';
import { CreateReporteDto } from './dto/create.reporte.dto';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('reportes')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly soporteService: SoporteService
    ) {}

    @Get()
    async getReports() {
        return this.reportService.getAllReports();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = path.extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    }))

    async crearReporte(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateReporteDto,
        @Req() req: any
    ) {
        const usuarioId = req.user?.id;
        if (!usuarioId) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        if (!data.location) {
            throw new BadRequestException('Ubicación no proporcionada');
        }

        let ubicacionData;
        try {
            ubicacionData = JSON.parse(data.location);
        } catch (err) {
            throw new BadRequestException('Ubicación inválida');
        }

        try {
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
                mensaje: '✅ Reporte creado exitosamente.',
                reporte,
            };
        } catch (err) {
            console.error('❌ Error al crear el reporte:', err);
            throw new InternalServerErrorException('❌ Error al crear el reporte.');
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post(':id/like')
    async likeReporte(@Param('id') id: number, @Req() req: any) {
        return this.reportService.darLike(Number(id), req.user.id);
    }
}
