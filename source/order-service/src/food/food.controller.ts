import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('foods')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Post()
  create(@Body() data: { name: string; price: number }) {
    return this.foodService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: { name?: string; price?: number }) {
    return this.foodService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }
}
