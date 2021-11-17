import { Prisma } from '.prisma/client';

export class Product implements Prisma.productUncheckedCreateInput {
  id: string;
  name: string;
  brand: string;
  stripe_id: string;
  stripe_price_id: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
