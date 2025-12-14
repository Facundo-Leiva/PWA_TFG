import { IsOptional, IsString, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

// DTO para la actualización de un reporte
export class UpdateReporteDto {
    @IsOptional()
    @IsString()
    titulo?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsIn(['pendiente', 'en revisión', 'resuelto'])
    estado?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    soporteGraficoId?: number;
}
