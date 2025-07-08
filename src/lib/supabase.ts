import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseArtwork {
  id: string;
  title: string;
  medium: string;
  size: string;
  year: string;
  price: number;
  category: 'painting' | 'sculpture' | 'scenography' | 'costume';
  image_url: string;
  description: string;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  stripe_payment_intent_id?: string;
  shipping_address: {
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
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrderItem {
  id: string;
  order_id: string;
  artwork_id: string;
  quantity: number;
  price_at_time: number;
  created_at: string;
}

export interface DatabaseContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type: 'contact' | 'commission';
  artwork_title?: string;
  project_details?: {
    projectType?: string;
    budget?: string;
    timeline?: string;
    reference?: string;
  };
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface DatabaseUserProfile {
  id: string;
  full_name?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  created_at: string;
  updated_at: string;
}