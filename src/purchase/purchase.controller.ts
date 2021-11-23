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
  Query,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from 'src/auth/guards/user.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
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
  @Get(':id')
  findAllByUser(@Param('id') id: string) {
    return this.purchaseService.findAllByUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Get()
  findAll(@Query('take') take: number, @Query('skip') skip: number) {
    return this.purchaseService.findAll(+take, +skip);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }
}
