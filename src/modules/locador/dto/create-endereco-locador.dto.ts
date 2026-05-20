import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CriarEnderecoLocadorDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  logradouro!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  numero!: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  bairro!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  cidade!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  estado!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 9)
  cep!: string;
}