/*
  # Initial Schema Setup for Philip Boles Art Website

  1. New Tables
    - `artworks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `medium` (text)
      - `size` (text)
      - `year` (text)
      - `price` (numeric)
      - `category` (text)
      - `image_url` (text)
      - `description` (text)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `total_amount` (numeric)
      - `status` (text)
      - `stripe_payment_intent_id` (text)
      - `shipping_address` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `artwork_id` (uuid, foreign key to artworks)
      - `quantity` (integer)
      - `price_at_time` (numeric)
      - `created_at` (timestamp)

    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `subject` (text)
      - `message` (text)
      - `type` (text) -- 'contact' or 'commission'
      - `artwork_title` (text, nullable)
      - `project_details` (jsonb, nullable)
      - `status` (text) -- 'new', 'read', 'replied'
      - `created_at` (timestamp)

    - `user_profiles`
      - `id` (uuid, primary key, foreign key to auth.users)
      - `full_name` (text)
      - `phone` (text)
      - `address` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access where appropriate
*/

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  medium text NOT NULL,
  size text NOT NULL,
  year text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL CHECK (category IN ('painting', 'sculpture', 'scenography', 'costume')),
  image_url text NOT NULL,
  description text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  stripe_payment_intent_id text,
  shipping_address jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price_at_time numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('contact', 'commission')),
  artwork_title text,
  project_details jsonb,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Artworks policies (public read, admin write)
CREATE POLICY "Anyone can view artworks"
  ON artworks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert artworks"
  ON artworks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artworks"
  ON artworks
  FOR UPDATE
  TO authenticated
  USING (true);

-- Orders policies (users can only see their own orders)
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for own orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Contact messages policies (anyone can create, only admin can read)
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON artworks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();