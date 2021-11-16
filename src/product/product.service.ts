import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinary: CloudinaryService,
    private readonly stripeService: StripeService,
  ) {}

  async create(createProductDto: CreateProductDto, image) {
    try {
      const imageCloud = await this.cloudinary.uploadImage(image).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });

      const stripeRef = await this.stripeService.createProductRef(
        createProductDto.name,
        await imageCloud.secure_url,
      );

      createProductDto.image = imageCloud.secure_url;
      createProductDto.stripe_id = stripeRef.id;

      return this.prisma.product.create({
        data: createProductDto,
      });
    } catch (err) {
      return new BadRequestException('Error');
    }
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto, image) {
    try {
      const isProductExist = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!isProductExist) {
        throw new BadRequestException('Product not found');
      }

      if (image) {
        const user = await this.prisma.product.findUnique({ where: { id } });

        const image_url = user.image.split('/').pop().split('.')[0];

        const imageCloud = await this.cloudinary
          .uploadImage(image)
          .catch(() => {
            throw new BadRequestException('Invalid file type');
          });

        this.cloudinary.deleteImage(image_url).catch(() => {
          throw new BadRequestException('Error deleting image');
        });

        updateProductDto.image = imageCloud.secure_url;
      }

      if (Object.keys(updateProductDto).length === 0) {
        throw new BadRequestException('Nothing to be updated');
      }

      return this.prisma.product.update({
        data: updateProductDto,
        where: { id },
      });
    } catch (err) {
      return { err: err.message };
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      const image_url = product.image.split('/').pop().split('.')[0];

      this.cloudinary.deleteImage(image_url).catch(() => {
        throw new BadRequestException('Error deleting image');
      });

      return this.prisma.product.delete({ where: { id } });
    } catch (err) {
      return { err: err.message };
    }
  }
}
