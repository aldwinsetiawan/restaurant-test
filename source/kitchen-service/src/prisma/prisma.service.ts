import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/app/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on('beforeExit', async (event) => {
    //     console.log(event.name);
    //     await app.close();
    //     });
    // }
}
  