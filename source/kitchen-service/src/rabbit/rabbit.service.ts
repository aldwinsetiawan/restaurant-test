import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';
import { AppService } from 'src/app.service';

@Injectable()
export class RabbitService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private appService: AppService
  ) {}

  async onModuleInit() {
    const connection = amqp.connect([this.configService.get('RABBIT_URL')]);

    connection.createChannel({
      json: true,
      setup: async (channel) => {
        await channel.assertExchange('orders', 'fanout', {durable: false});

        await channel.assertQueue('order.process', {durable: false});
        await channel.bindQueue('order.process', 'orders', '');

        await channel.consume('order.process', async (message) => {
          console.log('KITCHEN CALEEEEDDDDDDDDDDDDDD');
          console.log(message);
          if (message) {
            const order = JSON.parse(message.content.toString());
            console.log(order);
            await this.appService.processOrder(order);

            channel.ack(message);
          }
        });
      },
    });
  }

}
