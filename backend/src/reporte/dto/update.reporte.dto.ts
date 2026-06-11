import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// DTO para la actualización de un reporte.
export class UpdateReporteDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'El título no puede estar vacío.' })
  @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
  titulo?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'La descripción no puede estar vacía.' })
  @MinLength(50, {
    message: 'El campo "Descripción" debe tener al menos 50 caracteres.',
  })
  @MaxLength(2000, {
    message: 'La descripción no puede superar los 2000 caracteres.',
  })
  descripcion?: string;

  @IsOptional()
  @IsIn(['pendiente', 'en revisión', 'resuelto'], {
    message: 'El estado debe ser pendiente, en revisión o resuelto.',
  })
  estado?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    return Number(value);
  })
  @IsInt({
    message: 'El identificador del soporte gráfico debe ser un entero.',
  })
  @Min(1, {
    message: 'El identificador del soporte gráfico debe ser mayor que cero.',
  })
  soporteGraficoId?: number;
}
