import { plainToInstance, Transform } from 'class-transformer';
import {
  IsObject,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UbicacionDto } from '../../common/dto/ubicacion.dto';

function parseLocation(value: unknown): unknown {
  let parsedValue = value;

  if (typeof value === 'string') {
    try {
      parsedValue = JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (typeof parsedValue === 'object' && parsedValue !== null) {
    return plainToInstance(UbicacionDto, parsedValue);
  }

  return parsedValue;
}

// DTO para la creación de un reporte.
export class CreateReporteDto {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'El título no puede estar vacío.' })
  @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
  title: string;

  // Se recibe como texto porque la creación utiliza multipart/form-data.
  @IsString({ message: 'La categoría debe enviarse como texto.' })
  @Matches(/^[1-9]\d*$/, {
    message: 'La categoría debe ser un identificador válido.',
  })
  category: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'La descripción no puede estar vacía.' })
  @MinLength(50, {
    message: 'El campo "Descripción" debe tener al menos 50 caracteres.',
  })
  @MaxLength(2000, {
    message: 'La descripción no puede superar los 2000 caracteres.',
  })
  description: string;

  // El frontend envía la ubicación serializada dentro de FormData.
  @Transform(({ value }) => parseLocation(value))
  @IsObject({ message: 'La ubicación debe ser un objeto válido.' })
  @ValidateNested()
  location: UbicacionDto;
}
