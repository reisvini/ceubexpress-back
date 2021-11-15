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
      return { success: false };
    }
  }

  findAll(id: string) {
    return this.prisma.favorites.findMany({
      where: { userId: { equals: id } },
      select: { id: true, created_at: true, product: true },
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.favorites.delete({
        where: { id },
      });
    } catch (err) {
      return { error: 'Error deleting favorite' };
    }
  }
}
