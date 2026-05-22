import { IsOptional, IsString, Length } from 'class-validator';

export class AtualizarEnderecoLocadorDto {
  @IsString()
  @IsOptional()
  @Length(1, 150)
  logradouro?: string;

  @IsString()
  @IsOptional()
  @Length(1, 20)
  numero?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  complemento?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  bairro?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  cidade?: string;

  @IsString()
  @IsOptional()
  @Length(2, 2)
  estado?: string;

  @IsString()
  @IsOptional()
  @Length(8, 9)
  cep?: string;
}