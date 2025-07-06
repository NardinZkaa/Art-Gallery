import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-playfair font-bold text-xl text-gray-900">
            Philip Boles
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className={`transition-colors ${isActive('/gallery') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Gallery
            </Link>
            <Link 
              to="/shop" 
              className={`transition-colors ${isActive('/shop') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Shop
            </Link>
            <button 
              onClick={() => handleSectionNavigation('commissions')}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Commissions
            </button>
            <button 
              onClick={() => handleSectionNavigation('contact')}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
            
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`transition-colors ${isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className={`transition-colors ${isActive('/gallery') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/shop" 
                className={`transition-colors ${isActive('/shop') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <button 
                onClick={() => handleSectionNavigation('commissions')}
                className="text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                Commissions
              </button>
              <button 
                onClick={() => handleSectionNavigation('contact')}
                className="text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}