import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { AppService } from 'src/app.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RabbitService, AppService],
  exports: [RabbitService],
  imports:[PrismaModule]
})
export class RabbitModule {}
