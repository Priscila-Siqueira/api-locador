import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './common/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { LocadorModule } from './modules/locador/locador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HealthModule,
    LocadorModule,
  ],
})
export class AppModule {}
