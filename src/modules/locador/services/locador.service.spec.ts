import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../database/prisma.service';
import { StatusLocador } from '../enums/status-locador.enum';
import { LocadorService } from './locador.service';

describe('LocadorService', () => {
  let service: LocadorService;

  const prismaMock = {
    locador: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    endereco_locador: {
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const locadorMock = {
    id: BigInt(1),
    usuario_id: BigInt(1),
    nome: 'João da Silva',
    cpf: '12345678901',
    email: 'joao@email.com',
    status: StatusLocador.ATIVO,
    criado_em: new Date('2026-05-23T10:00:00.000Z'),
    atualizado_em: new Date('2026-05-23T10:00:00.000Z'),
    endereco_locador: {
      locador_id: BigInt(1),
      logradouro: 'Rua das Flores',
      numero: '123',
      complemento: 'Apartamento 45',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01001000',
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocadorService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<LocadorService>(LocadorService);
  });

  it('deve listar locadores ativos por padrão', async () => {
    prismaMock.locador.findMany.mockResolvedValue([locadorMock]);

    const resultado = await service.listarLocadores(1);

    expect(prismaMock.locador.findMany).toHaveBeenCalledWith({
      where: {
        usuario_id: BigInt(1),
        status: StatusLocador.ATIVO,
      },
      include: {
        endereco_locador: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toMatchObject({
      id: 1,
      usuarioId: 1,
      nome: 'João da Silva',
      cpf: '12345678901',
      email: 'joao@email.com',
      status: StatusLocador.ATIVO,
    });
  });

  it('deve listar locadores inativos quando status for informado', async () => {
    prismaMock.locador.findMany.mockResolvedValue([
      {
        ...locadorMock,
        status: StatusLocador.INATIVO,
      },
    ]);

    const resultado = await service.listarLocadores(1, StatusLocador.INATIVO);

    expect(prismaMock.locador.findMany).toHaveBeenCalledWith({
      where: {
        usuario_id: BigInt(1),
        status: StatusLocador.INATIVO,
      },
      include: {
        endereco_locador: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    expect(resultado[0].status).toBe(StatusLocador.INATIVO);
  });

  it('deve lançar BadRequestException quando ID do corretor for inválido na listagem', async () => {
    await expect(service.listarLocadores(0)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('deve buscar locador por ID', async () => {
    prismaMock.locador.findFirst.mockResolvedValue(locadorMock);

    const resultado = await service.buscarLocadorPorId(1, 1);

    expect(prismaMock.locador.findFirst).toHaveBeenCalledWith({
      where: {
        id: BigInt(1),
        usuario_id: BigInt(1),
      },
      include: {
        endereco_locador: true,
      },
    });

    expect(resultado).toMatchObject({
      id: 1,
      usuarioId: 1,
      nome: 'João da Silva',
    });
  });

  it('deve lançar NotFoundException quando locador não existir', async () => {
    prismaMock.locador.findFirst.mockResolvedValue(null);

    await expect(service.buscarLocadorPorId(999, 1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('deve inativar locador', async () => {
    prismaMock.locador.findFirst.mockResolvedValue(locadorMock);
    prismaMock.locador.update.mockResolvedValue({
      ...locadorMock,
      status: StatusLocador.INATIVO,
    });

    const resultado = await service.inativarLocador(1, 1);

    expect(prismaMock.locador.update).toHaveBeenCalledWith({
      where: {
        id: BigInt(1),
      },
      data: {
        status: StatusLocador.INATIVO,
      },
      include: {
        endereco_locador: true,
      },
    });

    expect(resultado.status).toBe(StatusLocador.INATIVO);
  });

  it('deve reativar locador', async () => {
    prismaMock.locador.findFirst.mockResolvedValue({
      ...locadorMock,
      status: StatusLocador.INATIVO,
    });

    prismaMock.locador.update.mockResolvedValue({
      ...locadorMock,
      status: StatusLocador.ATIVO,
    });

    const resultado = await service.reativarLocador(1, 1);

    expect(prismaMock.locador.update).toHaveBeenCalledWith({
      where: {
        id: BigInt(1),
      },
      data: {
        status: StatusLocador.ATIVO,
      },
      include: {
        endereco_locador: true,
      },
    });

    expect(resultado.status).toBe(StatusLocador.ATIVO);
  });
});