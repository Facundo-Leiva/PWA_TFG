import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

// DTO para el inicio de sesión.
export class LoginDto {
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @MaxLength(254, { message: 'El correo electrónico es demasiado largo.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @Matches(/\S/, { message: 'La contraseña no puede estar vacía.' })
  password: string;
}
