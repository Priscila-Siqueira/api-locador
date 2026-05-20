import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocadorModule } from './modules/locador/locador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LocadorModule,
  ],
})
export class AppModule {}
