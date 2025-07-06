import React, { useState, useEffect } from 'react';
import { Eye, Heart, ArrowLeft, X } from 'lucide-react';
import { artworks } from '../data/artworks';
import { useCart } from '../context/CartContext';
import MessageModal from '../components/MessageModal';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
  const [commissionArtwork, setCommissionArtwork] = useState<string>('');
  const { addToCart } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Works' },
    { id: 'painting', name: 'Paintings' },
    { id: 'sculpture', name: 'Sculptures' },
    { id: 'scenography', name: 'Scenography' },
    { id: 'costume', name: 'Costume Design' }
  ];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  const handleAddToCart = (artwork: any) => {
    if (artwork.available && artwork.price !== 'Commission') {
      addToCart(artwork);
    }
  };

  const handleCommissionRequest = (artworkTitle: string) => {
    setCommissionArtwork(artworkTitle);
    setIsCommissionModalOpen(true);
    setSelectedArtwork(null);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Gallery
          </h1>
          <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Philip Boles' complete collection of contemporary fusion art spanning 
            painting, sculpture, scenography, and costume design.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
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

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  {!artwork.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sold
                      </span>
                    </div>
                  )}
                  {artwork.price === 'Commission' && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Commission
                      </span>
                    </div>
                  )}
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
                
                <div className="flex justify-between items-center">
                  <span className="font-playfair text-2xl font-bold text-gray-900">
                    {artwork.price}
                  </span>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No artworks found in this category.</p>
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
                  {!selectedArtwork.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">
                        Sold
                      </span>
                    </div>
                  )}
                  {selectedArtwork.price === 'Commission' && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium">
                        Commission Work
                      </span>
                    </div>
                  )}
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
                      {selectedArtwork.available && selectedArtwork.price !== 'Commission' && (
                        <span className="text-green-600 font-medium">Available</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-4">
                      {selectedArtwork.available && selectedArtwork.price !== 'Commission' ? (
                        <button
                          onClick={() => handleAddToCart(selectedArtwork)}
                          className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      ) : selectedArtwork.price === 'Commission' ? (
                        <button
                          onClick={() => handleCommissionRequest(selectedArtwork.title)}
                          className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Request Commission
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 bg-gray-300 text-gray-500 py-4 px-6 rounded-lg font-medium cursor-not-allowed"
                        >
                          Sold Out
                        </button>
                      )}
                      
                      <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500 space-y-1">
                      <p>• Certificate of authenticity included</p>
                      <p>• Professional packaging and shipping</p>
                      <p>• 30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commission Modal */}
      <MessageModal
        isOpen={isCommissionModalOpen}
        onClose={() => setIsCommissionModalOpen(false)}
        type="commission"
        artworkTitle={commissionArtwork}
      />
    </div>
  );
}