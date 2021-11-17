import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  stripe_id: string;

  @IsString()
  @IsOptional()
  stripe_price_id: string;
}
