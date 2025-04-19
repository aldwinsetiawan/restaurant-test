import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { FoodItemDto } from './dto/place-order.dto';
import { RabbitService } from './rabbit/rabbit.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private rabbit: RabbitService
  ) {}


  async placeOrder(foods: FoodItemDto[], userId: any) {
    let totalPrice: number = 0;

    for (let food of foods) {
      totalPrice += (food.price * food.qty);
    }

    const createdOrder = await this.prisma.order.create({
        data: {
            foods: JSON.parse(JSON.stringify(foods)),
            total_price: totalPrice,
            status: 'Pending',
            user: {
                connect: { id: userId },
            },
        }
    });

    const userData = await this.prisma.user.findUnique({ where: { id: userId } });

    this.rabbit.emit({orderData: JSON.stringify(createdOrder), total_price: totalPrice, status: 'Pending', user: userData});

    return createdOrder.id;
  }

  async trackOrder(orderId: string) {
    const order = await this.prisma.order.findFirst({where: { id: orderId }});
    if (!order) {
        throw new Error('Order not found');
    }
    return order.status;
  }
}