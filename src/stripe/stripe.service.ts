import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
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
    const product = await this.stripe.products.create({
      name: name,
      images: [image],
    });

    return product;
  }

  async createPriceRef(product_id: string, unit_amount: number): Promise<any> {
    return this.stripe.prices.create({
      currency: 'brl',
      product: product_id,
      unit_amount,
    });
  }

  async createPayment(products, user): Promise<any> {
    return this.stripe.checkout.sessions.create({
      line_items: products.map((product: Product) => ({
        price: product.stripe_price_id,
        quantity: 1,
      })),

      client_reference_id: user.stripe_customer_id,
      customer: user.stripe_customer_id,
      payment_method_types: ['card', 'boleto'],
      mode: 'payment',

      cancel_url: 'http://localhost:3000/',
      success_url: 'http://localhost:3000/',
    });
  }
}
