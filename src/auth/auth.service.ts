import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto, CreateUserDto } from './dto/index';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from './helpers/sendEmails';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userDate } = createUserDto;
      const user = this.userRepository.create({
        ...userDate,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      await sendEmail({ email: user.email, nombres: user.fullname });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { password, username } = loginUsuarioDto;
    let usuario: User;
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    // TODO: Login con email o username
    if (emailRegex.test(username.trim())) {
      usuario = await this.userRepository.findOne({
        where: { email: username.trim() },
      });
    } else {
      usuario = await this.userRepository.findOne({
        where: { username },
      });
    }

    if (!usuario || !bcrypt.compareSync(password.trim(), usuario.password))
      throw new UnauthorizedException({
        error: 'Credenciales no validas',
      });

    return {
      acces_token: this.getJwtToken({
        id: usuario.id,
        username: usuario.username,
        fullname: usuario.fullname,
      }),
      expires_in: process.env.JWT_EXP,
      message: 'Successfully logged in',
      status: true,
    };
  }

  /**
   *
   * @param getJwtToken : Genera el jwt token
   */
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  /**
   *
   * @param error : error de key duplicated
   */
}
