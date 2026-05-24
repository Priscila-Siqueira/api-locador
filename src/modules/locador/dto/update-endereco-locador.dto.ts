import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class AtualizarEnderecoLocadorDto {
  @ApiPropertyOptional({
    example: 'Avenida Paulista',
    description: 'Logradouro do endereço do locador.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 150)
  logradouro?: string;

  @ApiPropertyOptional({
    example: '1000',
    description: 'Número do endereço.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  numero?: string;

  @ApiPropertyOptional({
    example: 'Sala 1201',
    description: 'Complemento do endereço.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  complemento?: string;

  @ApiPropertyOptional({
    example: 'Bela Vista',
    description: 'Bairro do endereço.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  bairro?: string;

  @ApiPropertyOptional({
    example: 'São Paulo',
    description: 'Cidade do endereço.',
  })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  cidade?: string;

  @ApiPropertyOptional({
    example: 'SP',
    description: 'Estado em formato UF.',
  })
  @IsString()
  @IsOptional()
  @Length(2, 2)
  estado?: string;

  @ApiPropertyOptional({
    example: '01311000',
    description: 'CEP do endereço.',
  })
  @IsString()
  @IsOptional()
  @Length(8, 9)
  cep?: string;
}