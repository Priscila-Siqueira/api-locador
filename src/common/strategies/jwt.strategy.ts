import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioAutenticado } from '../interfaces/usuario-autenticado.interface';

interface JwtPayload {
  sub?: number | string;
  id?: number | string;
  usuarioId?: number | string;
  email?: string;
  role?: string;
  perfil?: string;
  roles?: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET não configurada no arquivo .env.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload): UsuarioAutenticado {
    const idUsuario = payload.sub ?? payload.id ?? payload.usuarioId;
    const id = Number(idUsuario);

    if (!idUsuario || Number.isNaN(id) || id <= 0) {
      throw new UnauthorizedException(
        'Token JWT sem ID de usuário válido.',
      );
    }

    const role = payload.role ?? payload.perfil ?? payload.roles?.[0];

    if (!role) {
      throw new UnauthorizedException('Token JWT sem role válida.');
    }

    return {
      id,
      email: payload.email,
      role,
    };
  }
}