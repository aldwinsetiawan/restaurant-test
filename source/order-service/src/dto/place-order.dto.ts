import { IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FoodItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  qty: number;
}

export class PlaceOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  orderData: FoodItemDto[];
}