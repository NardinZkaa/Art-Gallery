import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';

const Gallery: React.FC = () => {
  // Sample artwork data - you can replace this with your actual data
  const artworks = [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Elena Rodriguez",
      price: 1200,
      image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Abstract"
    },
    {
      id: 2,
      title: "Urban Landscape",
      artist: "Marcus Chen",
      price: 850,
      image: "https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Landscape"
    },
    {
      id: 3,
      title: "Portrait in Blue",
      artist: "Sarah Williams",
      price: 950,
      image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Portrait"
    },
    {
      id: 4,
      title: "Nature's Symphony",
      artist: "David Park",
      price: 1100,
      image: "https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Nature"
    },
    {
      id: 5,
      title: "Modern Expression",
      artist: "Lisa Thompson",
      price: 750,
      image: "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Modern"
    },
    {
      id: 6,
      title: "Coastal Dreams",
      artist: "Robert Kim",
      price: 1300,
      image: "https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Landscape"
    }
  ];

  const categories = ["All", "Abstract", "Landscape", "Portrait", "Nature", "Modern"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredArtworks = selectedCategory === "All" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Art Gallery
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary artworks from talented artists around the world
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors shadow-lg">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                    {artwork.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-gray-600 mb-4">by {artwork.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">
                    ${artwork.price.toLocaleString()}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Load More Artworks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;