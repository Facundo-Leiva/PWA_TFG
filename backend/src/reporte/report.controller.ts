import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Req, UnauthorizedException, Get, InternalServerErrorException, BadRequestException, Param, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { SoporteService } from 'src/soporte/soporte.service';
import { CreateReporteDto } from './dto/create.reporte.dto';
import { UpdateReporteDto } from './dto/update.reporte.dto';
import { ReportOwnerGuard } from './report-owner.guard';
import { createImageUploadOptions } from '../config/upload.config';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { DenunciarReporteDto } from './dto/denunciar-reporte.dto';
import { FilterReportesDto } from './dto/filter-reportes.dto';

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
    @UseInterceptors(FileInterceptor('file', createImageUploadOptions()))
    async crearReporte(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateReporteDto,
        @Req() req: any
    ) {
        const usuarioId = req.user?.id;
        if (!usuarioId) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        if (!file) {
            throw new BadRequestException('Debe adjuntar una imagen al reporte.');
        }

        // Si la ubicación no existe en base de datos, se crea, si es prácticamente la misma, se referencia a esta
        try {
            let ubicacion = await this.reportService.buscarUbicacionExistente(data.location);

            if (!ubicacion) {
                ubicacion = await this.reportService.crearUbicacion(data.location);
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
    @Get('reportesMapa') 
    async reportesMapa() { 
        return this.reportService.buscarReportesMapa(); 
    }

    // Controlador: obtener filtros para el mapa geográfico
    @Get("reportesFiltradosMapa")
    async getReportesMapa(@Query() filtros: FilterReportesDto) {
        return this.reportService.bucarReportesFiltrados(filtros);
    }

    // Controlador: actualizar un reporte
    @UseGuards(AuthGuard('jwt'), ReportOwnerGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('soporteGrafico', createImageUploadOptions()))
    async updateReporte(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateReporteDto,
        @UploadedFile() file: Express.Multer.File | undefined,
        @Req() req: any,
    ) {
        const usuarioId = Number(req.user?.id);

        if (!Number.isInteger(usuarioId)) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        // Actualizar un reporte únicamente si pertenece al usuario autenticado.
        return this.reportService.update(id, usuarioId, { ...dto, file });
    }

    // Controlador: seguir un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/seguir')
    async seguir(@Param('id', ParseIntPipe) id: number, @Req() req) {
        const usuarioId = req.user.id;
        return this.reportService.seguirReporte(id, usuarioId);
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
    async likeReporte(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.reportService.darLike(id, req.user.id);
    }

    // Controlador: agregar un comentario a un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/comentarios')
    @UseInterceptors(FileInterceptor('file', createImageUploadOptions()))
    async addComentario(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateComentarioDto,
        @Req() req,
    ) {
        const id_usuario = Number(req.user.id);

        let soporteGraficoUrl: string | undefined;
        if (file) {
            soporteGraficoUrl = `/uploads/${file.filename}`;
        }

        if (!body.contenido?.trim() && !file) {
            throw new BadRequestException('El comentario debe tener texto o imagen.');
        }

        // Retornar un comentario con su contenido y referencia al emisor
        return this.reportService.crearComentario(
            id,
            Number(id_usuario),
            body.contenido,
            soporteGraficoUrl,
            body.tipo,
        );
    }

    // Controlador: obtener comentarios asociados a un reporte
    @Get(':id/comentarios')
    async getComentarios(@Param('id', ParseIntPipe) id: number) {
        return this.reportService.findByReporte(id);
    }

    // Controlador: denunciar un reporte
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/denunciar')
    async denunciarReporte(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: DenunciarReporteDto,
        @Req() req: any
    ) {
        const autorId = req.user?.id;
        return this.reportService.denunciarReporte(id, body.motivo, body.detalle, autorId);
    }
}
