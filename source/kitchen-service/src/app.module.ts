import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitModule,
    PrismaModule
  ],
  providers: [AppService],
})
export class AppModule {}
