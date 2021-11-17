import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService, PrismaService],
  imports: [
    UserModule,
    StripeModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: '15d',
      },
    }),
  ],
})
export class PurchaseModule {}
