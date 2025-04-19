import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService
  ) {}

  async processOrder(data:any){
    await new Promise(resolve => setTimeout(resolve, 10000));
    return this.prisma.order.update({
      where: {
        id: data.orderData.id,
      },
      data: {
        status: 'Processed',
      },
    });
  }

}