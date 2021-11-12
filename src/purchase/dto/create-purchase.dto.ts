import { IsString } from 'class-validator';
import { Purchase } from '../entities/purchase.entity';

export class CreatePurchaseDto extends Purchase {

  @IsString()
  productId: string;

  @IsString()
  userId: string;
}
