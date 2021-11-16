import { Prisma } from '.prisma/client';

export class User implements Prisma.userUncheckedCreateInput {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  stripe_customer_id: string;
  isUserAdmin?: boolean;
  favorites?: Prisma.favoritesUncheckedCreateNestedManyWithoutUserInput;
  purchase?: Prisma.purchaseUncheckedCreateNestedManyWithoutUserInput;
}
