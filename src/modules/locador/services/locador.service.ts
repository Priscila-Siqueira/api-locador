import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { locador_status, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { CriarLocadorDto } from '../dto/create-locador.dto';
import { AtualizarLocadorDto } from '../dto/update-locador.dto';
import { StatusLocador } from '../enums/status-locador.enum';
import { LocadorMapper } from '../mappers/locador.mapper';

@Injectable()
export class LocadorService {
  constructor(private readonly prisma: PrismaService) {}

  async criarLocador(
    criarLocadorDto: CriarLocadorDto,
    usuarioIdCorretorLogado: number,
  ) {
    try {
      const locadorCriado = await this.prisma.locador.create({
        data: {
          usuario_id: BigInt(usuarioIdCorretorLogado),
          nome: criarLocadorDto.nome,
          cpf: criarLocadorDto.cpf,
          email: criarLocadorDto.email,
          endereco_locador: {
            create: {
              logradouro: criarLocadorDto.endereco.logradouro,
              numero: criarLocadorDto.endereco.numero,
              complemento: criarLocadorDto.endereco.complemento,
              bairro: criarLocadorDto.endereco.bairro,
              cidade: criarLocadorDto.endereco.cidade,
              estado: criarLocadorDto.endereco.estado,
              cep: criarLocadorDto.endereco.cep,
            },
          },
        },
        include: {
          endereco_locador: true,
        },
      });

      return LocadorMapper.paraResposta(locadorCriado);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('CPF ou e-mail já cadastrado.');
      }

      throw error;
    }
  }

  async listarLocadores(
  usuarioIdCorretorLogado: number,
  status?: StatusLocador,
  ) {
    if (!usuarioIdCorretorLogado || usuarioIdCorretorLogado <= 0) {
      throw new BadRequestException('ID do corretor logado inválido.');
    }
  
    const statusFiltro = status ?? StatusLocador.ATIVO;
  
    const locadores = await this.prisma.locador.findMany({
      where: {
        usuario_id: BigInt(usuarioIdCorretorLogado),
        status: statusFiltro as locador_status,
      },
      include: {
        endereco_locador: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  
    return LocadorMapper.paraListaResposta(locadores);
  }

  async buscarLocadorPorId(id: number, usuarioIdCorretorLogado: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('ID do locador inválido.');
    }

    const locador = await this.prisma.locador.findFirst({
      where: {
        id: BigInt(id),
        usuario_id: BigInt(usuarioIdCorretorLogado),
      },
      include: {
        endereco_locador: true,
      },
    });

    if (!locador) {
      throw new NotFoundException('Locador não encontrado.');
    }

    return LocadorMapper.paraResposta(locador);
  }

  async atualizarLocador(
  id: number,
  atualizarLocadorDto: AtualizarLocadorDto,
  usuarioIdCorretorLogado: number,
  ) {
    if (!id || id <= 0) {
      throw new BadRequestException('ID do locador inválido.');
    }
  
    const locadorExistente = await this.prisma.locador.findFirst({
      where: {
        id: BigInt(id),
        usuario_id: BigInt(usuarioIdCorretorLogado),
      },
    });
  
    if (!locadorExistente) {
      throw new NotFoundException('Locador não encontrado.');
    }
  
    try {
      const locadorAtualizado = await this.prisma.$transaction(async (prisma) => {
        if (atualizarLocadorDto.endereco) {
          await prisma.endereco_locador.update({
            where: {
              locador_id: BigInt(id),
            },
            data: {
              logradouro: atualizarLocadorDto.endereco.logradouro,
              numero: atualizarLocadorDto.endereco.numero,
              complemento: atualizarLocadorDto.endereco.complemento,
              bairro: atualizarLocadorDto.endereco.bairro,
              cidade: atualizarLocadorDto.endereco.cidade,
              estado: atualizarLocadorDto.endereco.estado,
              cep: atualizarLocadorDto.endereco.cep,
            },
          });
        }
      
        return prisma.locador.update({
          where: {
            id: BigInt(id),
          },
          data: {
            nome: atualizarLocadorDto.nome,
            cpf: atualizarLocadorDto.cpf,
            email: atualizarLocadorDto.email,
          },
          include: {
            endereco_locador: true,
          },
        });
      });
    
      return LocadorMapper.paraResposta(locadorAtualizado);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('CPF ou e-mail já cadastrado.');
      }
    
      throw error;
    }
  }

  async inativarLocador(id: number, usuarioIdCorretorLogado: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('ID do locador inválido.');
    }

    if (!usuarioIdCorretorLogado || usuarioIdCorretorLogado <= 0) {
      throw new BadRequestException('ID do corretor logado inválido.');
    }

    const locadorExistente = await this.prisma.locador.findFirst({
      where: {
        id: BigInt(id),
        usuario_id: BigInt(usuarioIdCorretorLogado),
      },
    });

    if (!locadorExistente) {
      throw new NotFoundException('Locador não encontrado.');
    }

    const locadorInativado = await this.prisma.locador.update({
      where: {
        id: BigInt(id),
      },
      data: {
        status: locador_status.INATIVO,
      },
      include: {
        endereco_locador: true,
      },
    });

    return LocadorMapper.paraResposta(locadorInativado);
  } 

  async reativarLocador(id: number, usuarioIdCorretorLogado: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('ID do locador inválido.');
    }

    if (!usuarioIdCorretorLogado || usuarioIdCorretorLogado <= 0) {
      throw new BadRequestException('ID do corretor logado inválido.');
    }

    const locadorExistente = await this.prisma.locador.findFirst({
      where: {
        id: BigInt(id),
        usuario_id: BigInt(usuarioIdCorretorLogado),
      },
    });

    if (!locadorExistente) {
      throw new NotFoundException('Locador não encontrado.');
    }

    const locadorReativado = await this.prisma.locador.update({
      where: {
        id: BigInt(id),
      },
      data: {
        status: locador_status.ATIVO,
      },
      include: {
        endereco_locador: true,
      },
    });

    return LocadorMapper.paraResposta(locadorReativado);
  }

}