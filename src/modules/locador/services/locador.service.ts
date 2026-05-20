import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { CriarLocadorDto } from '../dto/create-locador.dto';
import { LocadorMapper } from '../mappers/locador.mapper';

@Injectable()
export class LocadorService {
  constructor(private readonly prisma: PrismaService) {}

  async listarLocadores() {
    const locadores = await this.prisma.locador.findMany({
      include: {
        endereco_locador: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return LocadorMapper.paraListaResposta(locadores);
  }

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
}