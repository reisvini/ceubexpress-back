import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Purchase } from '../entities/purchase.entity';

export class CreatePurchaseDto extends Purchase {
  @IsArray()
  productOnPurchase: Array<string>;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  stripePurchaseReference: string;

  @IsString()
  @IsOptional()
  stripePaymentIntent: string;

  @IsBoolean()
  @IsOptional()
  isPaid: boolean;

  @IsNumber()
  @IsOptional()
  amount: number;
}
