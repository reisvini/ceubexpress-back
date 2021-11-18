import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductModule } from './product/product.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Cloudinary } from './cloudinary';
import { StripeService } from './stripe/stripe.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PurchaseModule,
    ProductModule,
    FavoritesModule,
    RoleModule,
    AuthModule,
    CloudinaryModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Cloudinary,
    StripeService,
    ConfigService,
    PrismaService,
  ],
})
export class AppModule {}
