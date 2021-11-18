import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  async webhook(event, signature) {
    return await this.stripeService.webhook(event, signature);
  }

  async paymentStatus(event) {
    if (event === 'payment_intent.succeeded') {
      console.log('true');
    } else if (event === 'payment_intent.payment_failed') {
      console.log('false');
    }
  }

  async create(createPurchaseDto: CreatePurchaseDto) {
    try {
      const product = await this.prisma.product.findMany({
        where: { id: { in: createPurchaseDto.productOnPurchase } },
        select: { stripe_price_id: true },
      });
      const userStripeRef = await this.prisma.user.findUnique({
        where: { id: createPurchaseDto.userId },
        select: { stripe_customer_id: true },
      });

      const stripeId = await this.stripeService.createPayment(
        product,
        userStripeRef,
      );

      createPurchaseDto.stripePurchaseReference = stripeId.id;
      createPurchaseDto.stripePaymentIntent = stripeId.payment_intent;
      await this.prisma.purchase
        .create({
          data: {
            userId: createPurchaseDto.userId,
            stripePurchaseReference: createPurchaseDto.stripePurchaseReference,
            stripePaymentIntent: stripeId.payment_intent,
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

      return { success: stripeId.url };
    } catch (err) {
      return { success: err };
    }
  }

  findAll() {
    return this.prisma.purchase.findMany({
      include: { productOnPurchase: { include: { product: true } } },
    });
  }

  updatePaymentStatus(id: string) {
    return this.prisma.purchase.update({
      where: { stripePaymentIntent: id },
      data: { isPaid: true },
    });
  }

  findOne(id: string) {
    return this.prisma.purchase.findMany({
      where: { id },

      include: { productOnPurchase: { include: { product: true } } },
    });
  }
}
