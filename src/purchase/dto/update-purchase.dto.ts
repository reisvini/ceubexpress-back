import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreatePurchaseDto } from './create-purchase.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
  @IsBoolean()
  isPaid: boolean;
}
