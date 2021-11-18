import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from 'src/auth/guards/user.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('webhook')
  async webhook(@Headers('stripe-signature') signature, @Req() event: any) {
    try {
      return this.purchaseService.webhook(event.rawBody, signature);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }
}
