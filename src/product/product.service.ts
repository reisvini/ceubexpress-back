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

      const formatPrice = parseInt((createProductDto.price * 100).toFixed(0));

      const stripePriceRef = await this.stripeService.createPriceRef(
        stripeRef.id,
        formatPrice,
      );

      createProductDto.stripe_price_id = stripePriceRef.id;
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
    return this.prisma.product.findMany({ where: { forSale: true } });
  }

  async findAllPagination(take: number, skip: number) {
    const products = await this.prisma.product.findMany({
      take: take,
      skip: skip,
      where: { forSale: true },
      orderBy: { created_at: 'desc' },
    });
    const productsCount = await this.prisma.product.count();

    return { products, productsCount };
  }

  async searchProduct(search: string, take: number, skip: number) {
    const products = await this.prisma.product.findMany({
      where: {
        name: { contains: search },
        forSale: true,
      },
      take: take,
      skip: skip,
      orderBy: { created_at: 'desc' },
    });
    const productsCount = await this.prisma.product.count({
      where: {
        name: { contains: search },
      },
    });
    return { products, productsCount };
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

        await this.stripeService.updateProductImage(
          imageCloud.secure_url,
          isProductExist.stripe_id,
        );

        updateProductDto.image = imageCloud.secure_url;
      }

      if (updateProductDto.price) {
        const formatPrice = parseInt((updateProductDto.price * 100).toFixed(0));
        const updatedPrice = await this.stripeService.updatePrice(
          isProductExist.stripe_price_id,
          formatPrice,
          isProductExist.stripe_id,
        );

        updateProductDto.stripe_price_id = updatedPrice.id;
      }

      if (updateProductDto.name) {
        await this.stripeService.updateProductName(
          updateProductDto.name,
          isProductExist.stripe_id,
        );
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

      return this.prisma.product.update({
        data: { forSale: false },
        where: { id },
      });
    } catch (err) {
      return { err: err.message };
    }
  }
}
