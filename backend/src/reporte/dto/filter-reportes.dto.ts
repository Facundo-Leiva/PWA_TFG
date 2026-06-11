import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// DTO para los filtros opcionales del mapa geográfico.
export class FilterReportesDto {
  @IsOptional()
  @IsString({ message: 'El tipo de incidencia debe ser una cadena de texto.' })
  @MaxLength(120, { message: 'El tipo de incidencia es demasiado largo.' })
  tipo?: string;

  @IsOptional()
  @IsIn(['pendiente', 'en revisión', 'resuelto'], {
    message: 'El estado debe ser pendiente, en revisión o resuelto.',
  })
  estado?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha inicial no tiene un formato válido.' })
  fechaInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha final no tiene un formato válido.' })
  fechaFin?: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser una cadena de texto.' })
  @MaxLength(500, { message: 'La ubicación es demasiado larga.' })
  ubicacion?: string;
}
