import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export const MOTIVOS_DENUNCIA = [
  'Contenido ofensivo',
  'Falsedad o spam',
  'Información incorrecta',
  'Otro',
] as const;

// DTO para denunciar un reporte.
export class DenunciarReporteDto {
  @IsString({ message: 'El motivo debe ser una cadena de texto.' })
  @IsIn(MOTIVOS_DENUNCIA, { message: 'El motivo de la denuncia no es válido.' })
  motivo: string;

  @IsString({ message: 'El detalle debe ser una cadena de texto.' })
  @MinLength(20, {
    message: 'El detalle de la denuncia debe tener al menos 20 caracteres.',
  })
  @MaxLength(500, {
    message: 'El detalle de la denuncia no debe tener más de 500 caracteres.',
  })
  detalle: string;
}
