import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from 'src/auth/guards/user.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(UserGuard)
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePurchaseDto: UpdatePurchaseDto,
  // ) {
  //   return this.purchaseService.update(id, updatePurchaseDto);
  // }

  // @Delete(':id')
  // @UseGuards(UserGuard)
  // remove(@Param('id') id: string) {
  //   return this.purchaseService.remove(id);
  // }
}
