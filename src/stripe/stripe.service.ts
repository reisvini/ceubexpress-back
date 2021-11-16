import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/product/entities/product.entity';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET'), {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(email: string, name: string): Promise<any> {
    return this.stripe.customers.create({
      email,
      name,
    });
  }

  async createProductRef(name: string, image: string): Promise<any> {
    return this.stripe.products.create({
      name: name,
      images: [image],
    });
  }

  async createPayment(product_id: string, customer_id: string): Promise<any> {
    return this.stripe.orders.create({
      currency: 'brl',
      customer: customer_id,
      items: [
        {
          parent: product_id,
        },
      ],
    });
  }
}
