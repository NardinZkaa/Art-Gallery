import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Star, Eye, X } from 'lucide-react';
import { artworks } from '../data/artworks';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const { addToCart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'painting', name: 'Paintings' },
    { id: 'sculpture', name: 'Sculptures' }
  ];

  // Filter only available items for purchase (excluding commission works)
  const shopItems = artworks.filter(artwork => 
    artwork.available && artwork.price !== 'Commission'
  );

  const filteredItems = shopItems.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.medium.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (artwork: any) => {
    addToCart(artwork);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price.replace('$', '').replace(',', ''));
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Shop
          </h1>
          <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Acquire original artworks and limited editions from Philip Boles' 
            contemporary fusion art collection.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((artwork) => (
            <div
              key={artwork.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <button 
                      onClick={() => setSelectedArtwork(artwork)}
                      className="block p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="block p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleAddToCart(artwork)}
                      className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full capitalize">
                    {artwork.category}
                  </span>
                </div>
                
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {artwork.title}
                </h3>
                
                <p className="text-gray-600 mb-2">{artwork.medium}</p>
                <p className="text-gray-500 text-sm mb-4">{artwork.size} | {artwork.year}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    5.0 (Original Artwork)
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-playfair text-2xl font-bold text-gray-900">
                    {artwork.price}
                  </span>
                  <button 
                    onClick={() => setSelectedArtwork(artwork)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Expanded Artwork Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-96 lg:h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-full capitalize">
                        {selectedArtwork.category}
                      </span>
                    </div>
                    
                    <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
                      {selectedArtwork.title}
                    </h2>
                    
                    <div className="flex items-center mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        5.0 (Original Artwork)
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-700">
                        <span className="font-semibold">Medium:</span> {selectedArtwork.medium}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Size:</span> {selectedArtwork.size}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Year:</span> {selectedArtwork.year}
                      </p>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {selectedArtwork.description}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-playfair text-3xl font-bold text-gray-900">
                        {selectedArtwork.price}
                      </span>
                      <span className="text-green-600 font-medium">In Stock</span>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAddToCart(selectedArtwork)}
                        className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                      
                      <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500 space-y-1">
                      <p>• Certificate of authenticity included</p>
                      <p>• Professional packaging and shipping</p>
                      <p>• 30-day return policy</p>
                      <p>• Free worldwide shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}