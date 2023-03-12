/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @IsNotEmpty({ message: 'El usuario o correo electronico es obligatorio' })
  username: string;

  @IsString({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password: string;
}
