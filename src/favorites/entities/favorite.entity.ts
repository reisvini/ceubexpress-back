import { Prisma } from '.prisma/client';

export class Favorite implements Prisma.favoritesUncheckedCreateInput {
  id: string;
  productId: string;
  userId: string;
  createdAt: Date;
}
