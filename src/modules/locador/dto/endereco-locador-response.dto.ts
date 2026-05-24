import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnderecoLocadorResponseDto {
  @ApiProperty({
    example: 1,
    description: 'ID do locador vinculado ao endereço.',
  })
  locadorId!: number;

  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Logradouro do endereço do locador.',
  })
  logradouro!: string;

  @ApiProperty({
    example: '123',
    description: 'Número do endereço.',
  })
  numero!: string;

  @ApiPropertyOptional({
    example: 'Apartamento 45',
    nullable: true,
    description: 'Complemento do endereço.',
  })
  complemento?: string | null;

  @ApiProperty({
    example: 'Centro',
    description: 'Bairro do endereço.',
  })
  bairro!: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do endereço.',
  })
  cidade!: string;

  @ApiProperty({
    example: 'SP',
    description: 'Estado em formato UF.',
  })
  estado!: string;

  @ApiProperty({
    example: '01001000',
    description: 'CEP do endereço.',
  })
  cep!: string;
}