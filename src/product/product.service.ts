import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, image) {
    const imageCloud = await this.cloudinary.uploadImage(image).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    createProductDto.image = imageCloud.secure_url;

    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto, image) {
    if (image) {

      const user = this.prisma.product.findUnique({ where: { id } });

      const image_url = (await user).image.split('/').pop().split('.')[0];

      this.cloudinary.deleteImage(image_url).catch(() => {
        throw new BadRequestException('Error deleting image');
      });

      const imageCloud = await this.cloudinary.uploadImage(image).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      updateProductDto.image = imageCloud.secure_url;
    }

    return this.prisma.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const user = this.prisma.product.findUnique({ where: { id } });

    const image_url = (await user).image.split('/').pop().split('.')[0];

    this.cloudinary.deleteImage(image_url).catch(() => {
      throw new BadRequestException('Error deleting image');
    });

    return this.prisma.product.delete({ where: { id } });
  }
}
