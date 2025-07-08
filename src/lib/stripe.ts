import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key');
}

export const stripePromise = loadStripe(stripePublishableKey);

export interface PaymentIntentData {
  amount: number;
  currency: string;
  metadata: {
    orderId: string;
    userId: string;
  };
}