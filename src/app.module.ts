import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { ProductModule } from './product/product.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PurchaseModule,
    ProductModule,
    FavoritesModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
