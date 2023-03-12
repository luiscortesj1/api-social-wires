/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    
    
    if (err != null)
      throw new UnauthorizedException({
        exito: false,
        mensaje: err.response.error,
      });

    if (err || !user)
      throw new UnauthorizedException({
        exito: false,
        mensaje: 'No autorizado',
      });
    return user;
  }
}
