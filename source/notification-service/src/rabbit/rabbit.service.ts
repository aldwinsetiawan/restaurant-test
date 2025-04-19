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

        await channel.assertQueue('order.confirmation', {durable: false});
        await channel.bindQueue('order.confirmation', 'orders', '');

        await channel.consume('order.confirmation', async (message) => {
          if (message) {
            const order = JSON.parse(message.content.toString());

            await this.appService.sendEmail(order);

            channel.ack(message);
          }
        });
      },
    });
  }

}
