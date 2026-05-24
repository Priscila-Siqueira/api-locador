import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async verificarSaude() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'UP',
        servico: 'api-locador',
        database: 'UP',
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'DOWN',
        servico: 'api-locador',
        database: 'DOWN',
        timestamp: new Date().toISOString(),
      });
    }
  }
}