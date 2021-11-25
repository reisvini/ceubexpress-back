import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
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

  async createPriceRef(
    product_id: string,
    unit_amount: number,
  ): Promise<Stripe.Price> {
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
      customer_update: { address: 'auto', name: 'never' },
      shipping_address_collection: { allowed_countries: ['BR'] },
      billing_address_collection: 'auto',

      cancel_url: 'https://uniceubexpress.vercel.app/purchases',
      success_url: 'https://uniceubexpress.vercel.app/purchases',
    });
  }

  async webhook(event, signature): Promise<any> {
    let hook: any;
    hook = this.stripe.webhooks.constructEvent(
      event,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (hook.type === 'payment_intent.succeeded') {
      await this.prisma.purchase.update({
        data: {
          isPaid: true,
          receipt_url: hook.data.object.charges.data[0].receipt_url,
        },
        where: { stripePaymentIntent: hook.data.object.id },
      });
      console.log('Payment Succeded');
    } else if (hook.type === 'payment_intent.payment_failed') {
      console.log('Payment Failed');
    } else if (hook.type === 'checkout.session.expired') {
      console.log('Checkout Session Expired');
      await this.prisma.purchase.update({
        data: { isPurchaseExpired: true },
        where: { stripePaymentIntent: hook.data.object.id },
      });
    }
    return hook.type;
  }

  async updatePrice(
    price_id: string,
    new_price: number,
    product_stripe_id: string,
  ): Promise<any> {
    try {
      await this.stripe.prices.update(price_id, {
        active: false,
      });

      return this.createPriceRef(product_stripe_id, new_price);
    } catch (err) {
      return err;
    }
  }

  async updateProductName(
    new_name: string,
    product_stripe_id: string,
  ): Promise<any> {
    try {
      return this.stripe.products.update(product_stripe_id, { name: new_name });
    } catch (err) {
      return err;
    }
  }

  async updateProductImage(
    image: string,
    product_stripe_id: string,
  ): Promise<any> {
    try {
      return this.stripe.products.update(product_stripe_id, {
        images: [image],
      });
    } catch (err) {
      return err;
    }
  }
}
