import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LocadorController } from './controllers/locador.controller';
import { LocadorService } from './services/locador.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LocadorController],
  providers: [LocadorService],
  exports: [LocadorService],
})
export class LocadorModule {}