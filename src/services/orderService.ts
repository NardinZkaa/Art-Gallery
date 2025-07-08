import { supabase, DatabaseOrder, DatabaseOrderItem } from '../lib/supabase';
import { CartItem } from '../types';

export interface CreateOrderData {
  userId: string;
  items: CartItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalAmount: number;
}

export interface OrderWithItems extends DatabaseOrder {
  order_items: (DatabaseOrderItem & {
    artwork: {
      title: string;
      image_url: string;
      medium: string;
    };
  })[];
}

export class OrderService {
  static async createOrder(orderData: CreateOrderData): Promise<string> {
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: orderData.userId,
          total_amount: orderData.totalAmount,
          shipping_address: orderData.shippingAddress,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        artwork_id: item.artwork.databaseId || item.artwork.id.toString(),
        quantity: item.quantity,
        price_at_time: parseFloat(item.artwork.price.replace('$', '').replace(',', ''))
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  static async updateOrderPaymentIntent(orderId: string, paymentIntentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          stripe_payment_intent_id: paymentIntentId,
          status: 'processing'
        })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order payment intent:', error);
      throw new Error('Failed to update order payment intent');
    }
  }

  static async getUserOrders(userId: string): Promise<OrderWithItems[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            artwork:artworks (
              title,
              image_url,
              medium
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data as OrderWithItems[];
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error('Failed to fetch user orders');
    }
  }

  static async getOrderById(orderId: string): Promise<OrderWithItems | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            artwork:artworks (
              title,
              image_url,
              medium
            )
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw error;

      return data as OrderWithItems;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  static async updateOrderStatus(orderId: string, status: DatabaseOrder['status']): Promise<void> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }
}