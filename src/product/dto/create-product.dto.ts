import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsString()
  brand: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  price: number;

  @IsString()
  stripe_id: string;
}
