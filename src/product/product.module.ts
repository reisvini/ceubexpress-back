import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [
    StripeModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: '15d',
      },
    }),
    CloudinaryModule,
  ],
})
export class ProductModule {}
