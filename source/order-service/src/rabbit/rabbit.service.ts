import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitService implements OnModuleInit {
  private channelTemp;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connection = amqp.connect([this.configService.get('RABBIT_URL')]);

    this.channelTemp = connection.createChannel({
      json: true,
      setup: async (channel) => {
        await channel.assertExchange('orders', 'fanout', {durable: false});

        await channel.assertQueue('order.process', {durable: false});
        await channel.bindQueue('order.process', 'orders', '');

        await channel.assertQueue('order.confirmation', {durable: false});
        await channel.bindQueue('order.confirmation', 'orders', '');
      },
    });
  }

  async emit(order: any) {
    await this.channelTemp.publish('orders', '', order);
  }
  
}
