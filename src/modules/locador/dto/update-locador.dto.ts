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
  @IsString()
  @IsOptional()
  @Length(3, 150)
  nome?: string;

  @IsString()
  @IsOptional()
  @Length(11, 14)
  cpf?: string;

  @IsEmail()
  @IsOptional()
  @Length(5, 150)
  email?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => AtualizarEnderecoLocadorDto)
  endereco?: AtualizarEnderecoLocadorDto;
}