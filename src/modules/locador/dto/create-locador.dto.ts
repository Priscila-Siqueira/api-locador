import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CriarEnderecoLocadorDto } from './create-endereco-locador.dto';

export class CriarLocadorDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do locador.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  nome!: string;

  @ApiProperty({
    example: '12345678901',
    description: 'CPF do locador. Deve ser único.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpf!: string;

  @ApiProperty({
    example: 'joao@email.com',
    description: 'E-mail do locador. Deve ser único.',
  })
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  email!: string;

  @ApiProperty({
    type: CriarEnderecoLocadorDto,
    description: 'Endereço vinculado ao locador.',
  })
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CriarEnderecoLocadorDto)
  endereco!: CriarEnderecoLocadorDto;
}