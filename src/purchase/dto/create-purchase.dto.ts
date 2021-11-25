import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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

  @IsBoolean()
  @IsOptional()
  isPurchaseExpired: boolean;

  @IsString()
  @IsOptional()
  purchase_url: string;

  @IsNumber()
  @IsOptional()
  amount: number;
}
