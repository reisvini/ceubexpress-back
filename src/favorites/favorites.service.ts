import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      const existRecord = await this.prisma.favorites.findFirst({
        where: {
          productId: { equals: createFavoriteDto.productId },
          userId: { equals: createFavoriteDto.userId },
        },
      });

      if (existRecord) {
        return { error: 'Product already exist in favorites' };
      } else {
        return await this.prisma.favorites.create({
          data: createFavoriteDto,
        });
      }
    } catch (err) {
      return { success: err };
    }
  }

  findAll(id: string) {
    return this.prisma.favorites.findMany({
      where: { userId: { equals: id } },
      select: { id: true, created_at: true, product: true },
    });
  }

  async remove(id: string, userId: string) {
    try {
      const removeFavorite = await this.prisma.favorites.deleteMany({
        where: { productId: { equals: id }, userId: { equals: userId } },
      });
      if (removeFavorite.count > 0) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (err) {
      return { error: err };
    }
  }
}
