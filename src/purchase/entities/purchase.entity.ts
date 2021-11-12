import { Prisma } from '.prisma/client';

export class Purchase implements Prisma.purchaseUncheckedCreateInput {
  id: string;
  productId: string;
  userId: string;
  created_at: Date;
}
