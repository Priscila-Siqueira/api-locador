import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusLocador } from '../enums/status-locador.enum';

export class ListarLocadoresQueryDto {
  @ApiPropertyOptional({
    enum: StatusLocador,
    example: StatusLocador.ATIVO,
    description:
      'Filtro por status do locador. Se não informado, a API retorna apenas locadores ativos.',
  })
  @IsOptional()
  @IsEnum(StatusLocador)
  status?: StatusLocador;
}