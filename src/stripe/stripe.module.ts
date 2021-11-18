import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [StripeService, ConfigService, PrismaService],
  exports: [StripeService],
})
export class StripeModule {}
