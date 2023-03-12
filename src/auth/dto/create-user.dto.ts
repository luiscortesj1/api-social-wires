/* eslint-disable prettier/prettier */

import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsString()
  email: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener al menos una letra mayuscula,minuscula y un número.',
  })
  password: string;
  @IsString()
  @MinLength(1)
  fullname: string;
}
