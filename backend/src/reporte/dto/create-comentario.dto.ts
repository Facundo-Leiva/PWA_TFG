import { IsOptional, IsString, MaxLength } from 'class-validator';

// DTO para agregar un comentario a un reporte.
export class CreateComentarioDto {
  @IsOptional()
  @IsString({ message: 'El comentario debe ser una cadena de texto.' })
  @MaxLength(500, {
    message: 'El comentario no puede tener más de 500 caracteres.',
  })
  contenido?: string;

  @IsOptional()
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'El tipo de archivo es demasiado largo.' })
  tipo?: string;
}
