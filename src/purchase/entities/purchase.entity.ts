export class Purchase {
  id: string;
  userId: string;
  productOnPurchase: Array<string>;
  stripePurchaseReference: string;
  stripePaymentIntent: string;
  isPaid: boolean;
  created_at: Date;
}
