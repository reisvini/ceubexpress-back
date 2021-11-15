import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      await this.prisma.purchase
        .create({
          data: {
            userId: createPurchaseDto.userId,
            stripePurchaseReference: createPurchaseDto.stripePurchaseReference,
          },
        })
        .then((purchase) => {
          const purchaseId = purchase.id;

          return this.prisma.productOnPurchase.createMany({
            data: createPurchaseDto.productOnPurchase.map(
              (productOnPurchase) => {
                return {
                  productId: productOnPurchase,
                  purchaseId,
                };
              },
            ),
          });
        });

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }

  findAll() {
    return this.prisma.purchase.findMany({
      include: { productOnPurchase: { include: { product: true } } },
    });
  }

  findOne(id: string) {
    return this.prisma.purchase.findMany({
      where: { id },

      include: { productOnPurchase: { include: { product: true } } },
    });
  }

  // update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} purchase`;
  // }
}
