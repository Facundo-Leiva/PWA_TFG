import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsInt,
  IsObject,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UbicacionDto } from '../../common/dto/ubicacion.dto';

// DTO para el registro de usuario.
export class RegisterDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'El nombre no puede estar vacío.' })
  @MaxLength(80, { message: 'El nombre no puede superar los 80 caracteres.' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'El apellido no puede estar vacío.' })
  @MaxLength(80, { message: 'El apellido no puede superar los 80 caracteres.' })
  apellido: string;

  @IsInt({ message: 'El documento debe ser un número entero.' })
  @Min(1, { message: 'El documento debe ser mayor que cero.' })
  documento: number;

  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @MaxLength(254, { message: 'El correo electrónico es demasiado largo.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(128, {
    message: 'La contraseña no puede superar los 128 caracteres.',
  })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una letra mayúscula.',
  })
  @Matches(/[a-z]/, {
    message: 'La contraseña debe contener al menos una letra minúscula.',
  })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe contener al menos un número.',
  })
  @Matches(/^\S+$/, { message: 'La contraseña no puede contener espacios.' })
  password: string;

  // El formulario actual conserva este campo por compatibilidad y puede enviarlo vacío.
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(500, {
    message: 'La dirección no puede superar los 500 caracteres.',
  })
  direccion: string;

  @IsDefined({ message: 'La ubicación es obligatoria.' })
  @IsObject({ message: 'La ubicación debe ser un objeto válido.' })
  @ValidateNested()
  @Type(() => UbicacionDto)
  ubicacion: UbicacionDto;
}
