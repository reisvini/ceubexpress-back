/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashSync } from 'bcrypt';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existing) {
      throw new ConflictException('user_alredy_exists');
    }

    const stripeCustomer = await this.stripeService.createCustomer(
      createUserDto.email,
      createUserDto.name,
    );

    createUserDto.stripe_customer_id = stripeCustomer.id;
    createUserDto.password = hashSync(createUserDto.password, 10);

    return this.prisma.user.create({
      data: createUserDto,
      select: {
        name: true,
        email: true,
        id: true,
        role: { select: { admin: true } },
        stripe_customer_id: true,
      },
    });
  }

  async UserQuantity() {
    return { quantity: await this.prisma.user.count() };
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isUserAdmin: true,
        stripe_customer_id: true,
      },
    });
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isUserAdmin: true,
        stripe_customer_id: true,
        favorites: true,
        purchase: true,
      },
    });
  }

  findOneClient(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        isUserAdmin: false,
        createdAt: true,
        stripe_customer_id: false,
        favorites: true,
        purchase: true,
      },
    });
  }

  findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isUserAdmin: true,
        stripe_customer_id: true,
        favorites: true,
        purchase: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ data: updateUserDto, where: { id } });
  }

  async updateToAdmin(id: string, updateUserDto: UpdateUserDto) {
    try {
      const update = await this.prisma.user.update({
        data: updateUserDto,
        where: { id },
      });
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
