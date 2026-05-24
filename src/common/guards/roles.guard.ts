import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsuarioAutenticado } from '../interfaces/usuario-autenticado.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitidas = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesPermitidas || rolesPermitidas.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request.user as UsuarioAutenticado | undefined;

    if (!usuario) {
      throw new ForbiddenException('Usuário não autenticado.');
    }

    const possuiPermissao = rolesPermitidas.includes(usuario.role);

    if (!possuiPermissao) {
      throw new ForbiddenException('Usuário sem permissão para acessar este recurso.');
    }

    return true;
  }
}