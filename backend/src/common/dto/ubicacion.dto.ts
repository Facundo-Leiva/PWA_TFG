import {
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

// DTO compartido para validar datos de ubicación geográfica.
export class UbicacionDto {
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'La latitud debe ser un número válido.' },
  )
  @Min(-90, { message: 'La latitud no puede ser menor que -90.' })
  @Max(90, { message: 'La latitud no puede ser mayor que 90.' })
  latitud: number;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'La longitud debe ser un número válido.' },
  )
  @Min(-180, { message: 'La longitud no puede ser menor que -180.' })
  @Max(180, { message: 'La longitud no puede ser mayor que 180.' })
  longitud: number;

  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'La dirección no puede estar vacía.' })
  @MaxLength(500, {
    message: 'La dirección no puede superar los 500 caracteres.',
  })
  direccion: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @MaxLength(120, { message: 'La ciudad no puede superar los 120 caracteres.' })
  ciudad: string;

  @IsString({ message: 'El barrio debe ser una cadena de texto.' })
  @MaxLength(120, { message: 'El barrio no puede superar los 120 caracteres.' })
  barrio: string;
}
