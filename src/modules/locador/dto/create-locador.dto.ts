import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CriarEnderecoLocadorDto } from './create-endereco-locador.dto';

export class CriarLocadorDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  nome!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  cpf!: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  email!: string;

  @ValidateNested()
  @Type(() => CriarEnderecoLocadorDto)
  endereco!: CriarEnderecoLocadorDto;
}