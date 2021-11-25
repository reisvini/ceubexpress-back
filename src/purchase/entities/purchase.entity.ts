export class Purchase {
  id: string;
  userId: string;
  productOnPurchase: Array<string>;
  stripePurchaseReference: string;
  stripePaymentIntent: string;
  isPaid: boolean;
  purchase_url: string;
  isPurchaseExpired: boolean;
  created_at: Date;
}
