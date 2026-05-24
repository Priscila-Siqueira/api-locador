import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AtualizarEnderecoLocadorDto } from './update-endereco-locador.dto';

export class AtualizarLocadorDto {
  @ApiPropertyOptional({
    example: 'João Carlos da Silva',
    description: 'Nome completo do locador.',
  })
  @IsString()
  @IsOptional()
  @Length(3, 150)
  nome?: string;

  @ApiPropertyOptional({
    example: '12345678901',
    description: 'CPF do locador. Deve ser único.',
  })
  @IsString()
  @IsOptional()
  @Length(11, 14)
  cpf?: string;

  @ApiPropertyOptional({
    example: 'joao.carlos@email.com',
    description: 'E-mail do locador. Deve ser único.',
  })
  @IsEmail()
  @IsOptional()
  @Length(5, 150)
  email?: string;

  @ApiPropertyOptional({
    type: AtualizarEnderecoLocadorDto,
    description: 'Dados opcionais do endereço do locador.',
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => AtualizarEnderecoLocadorDto)
  endereco?: AtualizarEnderecoLocadorDto;
}