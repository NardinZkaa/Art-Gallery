import { supabase } from '../lib/supabase';
import { stripePromise } from '../lib/stripe';

export interface PaymentData {
  orderId: string;
  amount: number;
  currency: string;
}

export class PaymentService {
  static async createPaymentIntent(paymentData: PaymentData): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: paymentData
      });

      if (error) throw error;

      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  static async confirmPayment(clientSecret: string, paymentMethodId: string): Promise<boolean> {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId
      });

      if (error) {
        console.error('Payment confirmation error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error confirming payment:', error);
      return false;
    }
  }

  static async processCheckout(
    orderId: string,
    amount: number,
    paymentMethodData: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      nameOnCard: string;
    }
  ): Promise<boolean> {
    try {
      // Create payment intent
      const clientSecret = await this.createPaymentIntent({
        orderId,
        amount,
        currency: 'usd'
      });

      // In a real implementation, you would use Stripe Elements
      // For now, we'll simulate a successful payment
      console.log('Processing payment with data:', { orderId, amount, paymentMethodData });
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update order status
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'processing',
          stripe_payment_intent_id: clientSecret
        })
        .eq('id', orderId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error processing checkout:', error);
      return false;
    }
  }
}