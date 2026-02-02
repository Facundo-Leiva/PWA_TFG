import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req, UnauthorizedException, Get, InternalServerErrorException, BadRequestException, Param, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { SoporteService } from 'src/soporte/soporte.service';
import { CreateReporteDto } from './dto/create.reporte.dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UpdateReporteDto } from './dto/update.reporte.dto';

// Controlador de peticiones HTTP para reportes
@Controller('reportes')
export class ReportController {
    constructor(
        private readonly reportService: ReportService,
        private readonly soporteService: SoporteService
    ) { }

    // Controlador: obtener reportes desde base de datos
    @Get()
    async getReports() {
        return this.reportService.getAllReports();
    }

    // Controlador: crear un reporte nuevo
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

        // Si la ubicación no existe en base de datos, se crea, si es prácticamente la misma, se referencia a esta
        try {
            let ubicacion = await this.reportService.buscarUbicacionExistente(ubicacionData);

            if (!ubicacion) {
                ubicacion = await this.reportService.crearUbicacion(ubicacionData);
            }

            const soporteGrafico = await this.soporteService.guardar(file);

            // Crear el reporte con los datos obtenidos desde el frontend, datos del usuario, soporte gráfico y ubicación
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

    // Controlador: buscar reportes mapa geográfico
    @UseGuards(AuthGuard('jwt'))
    @Get('reportesMapa') 
    async reportesMapa() { 
        return this.reportService.buscarReportesMapa(); 
    }

    // Controlador: obtener filtros para el mapa geográfico
    @Get("reportesFiltradosMapa")
    async getReportesMapa(
        @Query("tipo") tipo?: string,
        @Query("estado") estado?: string,
        @Query("fechaInicio") fechaInicio?: string,
        @Query("fechaFin") fechaFin?: string,
        @Query("ubicacion") ubicacion?: string,
    ) {
        return this.reportService.bucarReportesFiltrados({ tipo, estado, fechaInicio, fechaFin, ubicacion });
    }

    // Controlador: actualizar un reporte
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    @UseInterceptors(FileInterceptor('soporteGrafico', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + '-' + file.originalname;
                cb(null, uniqueName);
            },
        }),
    }))
    async updateReporte(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateReporteDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        // Acualizar un reporte con datos obtenidos desde el frontend
        return this.reportService.update(id, { ...dto, file });
    }

    // Controlador: seguir un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/seguir')
    async seguir(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.id;
        return this.reportService.seguirReporte(Number(id), usuarioId);
    }

    // Controlador: obtener reportes seguidos
    @UseGuards(AuthGuard('jwt'))
    @Get('seguidos') async seguidos(@Req() req) {
        const usuarioId = req.user.id;
        return this.reportService.obtenerSeguidos(usuarioId);
    }

    // Controlador: dar me gusta a un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/like')
    async likeReporte(@Param('id') id: number, @Req() req: any) {
        return this.reportService.darLike(Number(id), req.user.id);
    }

    // Controlador: agregar un comentario a un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/comentarios')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = `file-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
                cb(null, uniqueName);
            },
        }),
    }))
    async addComentario(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { contenido?: string; tipo?: string },
        @Req() req,
    ) {
        const id_usuario = Number(req.user.id);

        let soporteGraficoUrl: string | undefined;
        if (file) {
            soporteGraficoUrl = `/uploads/${file.filename}`;
        }

        // Retornar un comentario con su contenido y referencia al emisor
        return this.reportService.crearComentario(
            Number(id),
            Number(id_usuario),
            body.contenido,
            soporteGraficoUrl,
            body.tipo,
        );
    }

    // Controlador: obtener comentarios asociados a un reporte
    @Get(':id/comentarios')
    async getComentarios(@Param('id') id: string) {
        return this.reportService.findByReporte(Number(id));
    }

    // Controlador: denunciar un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/denunciar')
    async denunciarReporte(
        @Param('id') id: string,
        @Body() body: { motivo: string; detalle: string },
        @Req() req: any
    ) {
        const reporteId = parseInt(id, 10);
        const autorId = req.user?.id;
        return this.reportService.denunciarReporte(reporteId, body.motivo, body.detalle, autorId);
    }
}
