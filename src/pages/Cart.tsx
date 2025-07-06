import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleQuantityChange = (artworkId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(artworkId);
    } else {
      updateQuantity(artworkId, newQuantity);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price.replace('$', '').replace(',', ''));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-12"></div>
            
            <div className="max-w-md mx-auto">
              <div className="bg-gray-50 rounded-lg p-12 mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Discover beautiful artworks in our shop and add them to your cart.
                </p>
                <Link 
                  to="/shop"
                  className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span>Browse Artworks</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link 
            to="/shop"
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.artwork.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 flex-shrink-0">
                      <img 
                        src={item.artwork.image}
                        alt={item.artwork.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                            {item.artwork.title}
                          </h3>
                          <p className="text-gray-600 mb-1">{item.artwork.medium}</p>
                          <p className="text-gray-500 text-sm">{item.artwork.size} | {item.artwork.year}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.artwork.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {item.artwork.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.artwork.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.artwork.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-playfair text-2xl font-bold text-gray-900">
                            ${(formatPrice(item.artwork.price) * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {item.artwork.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-8 sticky top-24">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="font-playfair text-lg font-semibold">Total</span>
                    <span className="font-playfair text-2xl font-bold text-gray-900">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">
                  Secure checkout with SSL encryption
                </p>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>• Free worldwide shipping on all orders</p>
                  <p>• 30-day return policy</p>
                  <p>• Certificate of authenticity included</p>
                  <p>• Professional packaging and insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}