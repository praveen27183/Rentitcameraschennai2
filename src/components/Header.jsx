import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, Camera, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../asset/Rentit logo (1).png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const collectionsRef = useRef(null);

  const navItems = [
    { label: 'Home', to: '/home' },
    { label: 'Equipments', to: '/equipments' },
    { label: 'Collections', isDropdown: true },
    { label: 'Support', to: '/support' },
    { label: 'About', to: '/about' },
  ];

  const searchSuggestions = [
    'Canon EOS R5',
    'Sony A7S III',
    'RED Komodo',
    'Arri Alexa Mini',
    'Blackmagic Pocket',
    'Lighting Kit',
    'Tripods',
    'Lenses'
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (collectionsRef.current && !collectionsRef.current.contains(event.target)) {
        setCollectionsOpen(false);
      }
    }
    if (collectionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [collectionsOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white">
              <img src={logo} alt="RentIt Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Rentit Cameras</span>
              <div className="text-xs text-[#1A97A9] font-medium">Camera Rental</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isDropdown ? (
                <div key={item.label} className="relative" ref={collectionsRef}>
                  <button
                    type="button"
                    className="text-gray-700 hover:text-[#1A97A9] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#E0F7FA] focus:outline-none"
                    onClick={() => setCollectionsOpen((open) => !open)}
                  >
                    {item.label}
                  </button>
                  {collectionsOpen && (
                    <div className="absolute left-0 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50 grid grid-cols-4 gap-6 text-left">
                      {/* Canon */}
                      <div>
                        <div className="font-bold mb-2">CANON</div>
                        <div className="text-gray-700 space-y-1">
                          <div>MACRO LENS</div>
                          <div>MIDRANGE ZOOM LENS</div>
                          <div>NORMAL LENS</div>
                          <div>TELEPHOTO LENS</div>
                          <div>WIDEANGLE LENS</div>
                          <div>SPECIALITY LENS</div>
                        </div>
                      </div>
                      {/* Nikon */}
                      <div>
                        <div className="font-bold mb-2">NIKON</div>
                        <div className="text-gray-700 space-y-1">
                          <div>MACRO LENS</div>
                          <div>MIDRANGE ZOOM LENS</div>
                          <div>NORMAL LENS</div>
                          <div>TELEPHOTO LENS</div>
                          <div>WIDEANGLE LENS</div>
                          <div>FISH EYE LENS</div>
                        </div>
                      </div>
                      {/* Sony */}
                      <div>
                        <div className="font-bold mb-2">SONY</div>
                        <div className="text-gray-700 space-y-1">
                          <div>WIDE ANGLE LENS</div>
                          <div>MIDRANGE ZOOM LENS</div>
                          <div>NORMAL LENS</div>
                          <div>TELEPHOTO LENS</div>
                        </div>
                      </div>
                      {/* Fujifilm */}
                      <div>
                        <div className="font-bold mb-2">FUJIFILM</div>
                        <div className="text-gray-700 space-y-1">
                          <div>WIDE ANGLE LENS</div>
                          <div>MIDRANGE ZOOM LENS</div>
                          <div>NORMAL LENS</div>
                          <div>TELEPHOTO LENS</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-gray-700 hover:text-[#1A97A9] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-[#E0F7FA]"
                >
                  {item.label}
                </Link>
              ) : null
            )}
          </nav>

          <div className="flex-1 max-w-md mx-4 md:mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#1A97A9]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cameras, lenses, equipment..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A97A9] focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg backdrop-blur-md z-50">
                  {searchSuggestions
                    .filter(suggestion =>
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice(0, 6)
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-[#E0F7FA] cursor-pointer text-sm text-gray-700 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        <div className="flex items-center space-x-2">
                          <Camera className="w-4 h-4 text-[#1A97A9]" />
                          <span>{suggestion}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 mr-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white border border-[#1A97A9] text-[#1A97A9] font-semibold hover:bg-[#E0F7FA] transition"
            >
              Login
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            <button onClick={() => (window.open('tel:+919940423791', '_blank'))} className="p-2 text-gray-400 hover:text-[#1A97A9] hover:bg-[#E0F7FA] rounded-lg transition-colors duration-200">
              <Phone className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-[#1A97A9] hover:bg-[#E0F7FA] rounded-lg transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
