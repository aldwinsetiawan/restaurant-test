import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { AppService } from 'src/app.service';

@Module({
  providers: [RabbitService, AppService],
  exports: [RabbitService],
})
export class RabbitModule {}
