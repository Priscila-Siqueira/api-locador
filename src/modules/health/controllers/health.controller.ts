import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';
import { HealthResponseDto } from '../dto/health-response.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar saúde da API',
    description:
      'Verifica se o Microsserviço Locador está online e se a conexão com o banco de dados está funcionando.',
  })
  @ApiResponse({
  status: 200,
  description: 'API e banco de dados disponíveis.',
  type: HealthResponseDto,
  })
  @ApiResponse({
    status: 503,
    description: 'API ou banco de dados indisponível.',
    schema: {
      example: {
        statusCode: 503,
        message: {
          status: 'DOWN',
          servico: 'api-locador',
          database: 'DOWN',
          timestamp: '2026-05-23T20:00:00.000Z',
        },
        error: 'Service Unavailable',
      },
    },
  })
  verificarSaude() {
    return this.healthService.verificarSaude();
  }
}