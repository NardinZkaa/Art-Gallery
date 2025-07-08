export interface Artwork {
  id: number;
  title: string;
  medium: string;
  size: string;
  year: string;
  price: string;
  category: 'painting' | 'sculpture' | 'scenography' | 'costume';
  image: string;
  description: string;
  available: boolean;
  databaseId?: string; // UUID from database
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: number) => void;
  updateQuantity: (artworkId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}