import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusLocador } from '../enums/status-locador.enum';
import { EnderecoLocadorResponseDto } from './endereco-locador-response.dto';

export class LocadorResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID do locador.',
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: 'ID do corretor logado responsável pelo cadastro do locador.',
  })
  usuarioId!: number;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do locador.',
  })
  nome!: string;

  @ApiProperty({
    example: '12345678901',
    description: 'CPF do locador.',
  })
  cpf!: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do locador.',
  })
  email!: string;

  @ApiProperty({
    enum: StatusLocador,
    example: StatusLocador.ATIVO,
    description: 'Status do locador.',
  })
  status!: StatusLocador;

  @ApiProperty({
    example: '2026-05-23T20:00:00.000Z',
    description: 'Data de criação do registro.',
  })
  criadoEm!: string;

  @ApiProperty({
    example: '2026-05-23T20:10:00.000Z',
    description: 'Data da última atualização do registro.',
  })
  atualizadoEm!: string;

  @ApiPropertyOptional({
    type: EnderecoLocadorResponseDto,
    nullable: true,
    description: 'Endereço vinculado ao locador.',
  })
  endereco?: EnderecoLocadorResponseDto | null;
}