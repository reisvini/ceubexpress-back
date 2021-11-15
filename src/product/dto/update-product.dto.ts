import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  brand: string;

  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  stripe_id: string;
}
