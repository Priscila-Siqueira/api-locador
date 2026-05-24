import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    example: 'UP',
    description: 'Status geral do microsserviço.',
  })
  status!: string;

  @ApiProperty({
    example: 'api-locador',
    description: 'Nome do microsserviço.',
  })
  servico!: string;

  @ApiProperty({
    example: 'UP',
    description: 'Status da conexão com o banco de dados.',
  })
  database!: string;

  @ApiProperty({
    example: '2026-05-23T20:00:00.000Z',
    description: 'Data e hora da verificação.',
  })
  timestamp!: string;
}