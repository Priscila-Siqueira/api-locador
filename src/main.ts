import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const portaConfigurada = configService.get<string>('PORT');
  const porta = portaConfigurada ? Number(portaConfigurada) : 3001;

  if (Number.isNaN(porta)) {
    throw new Error('A variável de ambiente PORT deve ser um número válido.');
  }

  await app.listen(porta);

  console.log(`API Locador executando na porta ${porta}`);
}

bootstrap();