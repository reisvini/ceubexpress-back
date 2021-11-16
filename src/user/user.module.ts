import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { StripeService } from 'src/stripe/stripe.service';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
  imports: [
    StripeModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: '15d',
      },
    }),
  ],
})
export class UserModule {}
