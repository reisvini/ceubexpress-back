import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserGuard } from 'src/auth/guards/user.guard';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  // @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createProductDto.price = Number(createProductDto.price);
    return this.productService.create(createProductDto, image);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post('/search')
  search(
    @Body() data: any,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return this.productService.searchProduct(data.search, +take, +skip);
  }

  @Get('/pagination')
  findAllPagination(@Query('take') take: number, @Query('skip') skip: number) {
    return this.productService.findAllPagination(+take, +skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (updateProductDto.price) {
      updateProductDto.price = Number(updateProductDto.price);
    }

    return this.productService.update(id, updateProductDto, image);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
