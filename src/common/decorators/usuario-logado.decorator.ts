import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioAutenticado } from '../interfaces/usuario-autenticado.interface';

export const UsuarioLogado = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UsuarioAutenticado => {
    const request = context.switchToHttp().getRequest();

    return request.user as UsuarioAutenticado;
  },
);