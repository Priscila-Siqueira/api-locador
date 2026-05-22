import { IsEnum, IsOptional } from 'class-validator';
import { StatusLocador } from '../enums/status-locador.enum';

export class ListarLocadoresQueryDto {
  @IsOptional()
  @IsEnum(StatusLocador)
  status?: StatusLocador;
}