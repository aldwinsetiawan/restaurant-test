import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findAll() {
    return this.prisma.food.findMany();
  }

  async findOne(id: string) {
    return this.prisma.food.findUnique({ where: { id } });
  }

  async create(data: { name: string; price: number }) {
    return this.prisma.food.create({ data });
  }

  async update(id: string, data: { name?: string; price?: number }) {
    return this.prisma.food.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.food.delete({ where: { id } });
  }
}
