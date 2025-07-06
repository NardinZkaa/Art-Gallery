import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="font-playfair text-3xl font-bold mb-4">
              Philip Boles
            </h3>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg mb-2">
              Fusion Art
            </p>
            <p className="text-gray-400">
              Contemporary Egyptian Artist | Painting, Sculpture, Scenography, Costume Design
            </p>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-400 mb-4">
              Graduate, Faculty of Fine Arts - Alexandria (1996) | Member, Egyptian Syndicate of Plastic Arts
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 Philip Boles - Fusion Art. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}