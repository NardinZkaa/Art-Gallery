import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();
  const totalItems = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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

  const handlePageNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setShowUserMenu(false);
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            onClick={() => handlePageNavigation('/')}
            className="font-playfair font-bold text-xl text-gray-900"
          >
            Philip Boles
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              onClick={() => handlePageNavigation('/')}
              className={`transition-colors ${isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              onClick={() => handlePageNavigation('/gallery')}
              className={`transition-colors ${isActive('/gallery') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Gallery
            </Link>
            <Link 
              to="/shop" 
              onClick={() => handlePageNavigation('/shop')}
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
              onClick={() => handlePageNavigation('/cart')}
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
              onClick={() => handlePageNavigation('/cart')}
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
                onClick={() => handlePageNavigation('/')}
                className={`transition-colors ${isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                onClick={() => handlePageNavigation('/gallery')}
                className={`transition-colors ${isActive('/gallery') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
              >
                Gallery
              </Link>
              <Link 
                to="/shop" 
                onClick={() => handlePageNavigation('/shop')}
                className={`transition-colors ${isActive('/shop') ? 'text-gray-900 font-medium' : 'text-gray-700 hover:text-gray-900'}`}
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

                {/* Mobile User Menu */}
                <div className="border-t border-gray-100 pt-4">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-2 py-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </div>
            </div>
          </div>
        )}
      </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
}

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </button>
              )}