import { IsInt, Max, Min } from 'class-validator';

// DTO para calificar a otro usuario.
export class CalificarUsuarioDto {
  @IsInt({ message: 'La nota debe ser un número entero.' })
  @Min(1, { message: 'La nota debe estar entre 1 y 10.' })
  @Max(10, { message: 'La nota debe estar entre 1 y 10.' })
  nota: number;
}
