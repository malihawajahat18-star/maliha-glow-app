import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { ActiveScreen, Category, Season } from '../types';

interface HeaderProps {
  activeScreen: ActiveScreen;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (screen: ActiveScreen) => void;
  onFilterCategory?: (category: Category, season?: Season, isSpecialSale?: boolean, isNewArrival?: boolean) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  cartCount,
  wishlistCount,
  onNavigate,
  onFilterCategory,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ActiveScreen, action?: () => void) => {
    setMobileMenuOpen(false);
    onNavigate(screen);
    if (action) action();
  };

  return (
    <header
      className="border-b border-gray-100 bg-white sticky top-0 z-40 shadow-sm transition-all duration-300"
      data-purpose="primary-header"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-1.5 text-gray-700 hover:text-maroon-800 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo / Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          {/* Luxury Initial Monogram Badge */}
          <div className="w-12 h-12 rounded-full border border-maroon-800 flex items-center justify-center p-0.5 bg-gradient-to-tr from-amber-50 to-white shadow-inner flex-shrink-0">
            <div className="w-full h-full rounded-full border border-maroon-800/40 flex items-center justify-center bg-white">
              <span className="font-luxury-title font-bold text-xl text-maroon-800 tracking-tighter">
                GM
              </span>
            </div>
          </div>
          <div>
            <span className="block font-luxury-title font-bold text-xl sm:text-2xl tracking-wider text-gray-900 group-hover:text-maroon-800 transition-colors uppercase">
              GLOW WITH MALEEHA
            </span>
            <span className="block text-[10px] tracking-[0.22em] sm:tracking-[0.25em] text-gray-500 uppercase -mt-0.5 sm:-mt-1 font-medium">
              (A Touch of Luxury Elegance)
            </span>
          </div>
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden xl:flex items-center space-x-6 text-[13px] font-semibold tracking-wider text-gray-800 uppercase font-luxury-nav">
          <button
            onClick={() => {
              handleNavClick('catalog', () => {
                if (onFilterCategory) onFilterCategory('all', 'winter', false, true);
              });
            }}
            className="hover:text-maroon-800 transition-colors cursor-pointer py-1"
          >
            Winter New Arrival
          </button>

          <button
            onClick={() => {
              handleNavClick('catalog', () => {
                if (onFilterCategory) onFilterCategory('skincare');
              });
            }}
            className="hover:text-maroon-800 transition-colors cursor-pointer py-1"
          >
            Organic Skincare
          </button>

          <button
            onClick={() => {
              handleNavClick('catalog', () => {
                if (onFilterCategory) onFilterCategory('luxury_glow');
              });
            }}
            className="hover:text-maroon-800 transition-colors cursor-pointer py-1"
          >
            Luxury Glow
          </button>

          <button
            onClick={() => {
              handleNavClick('catalog', () => {
                if (onFilterCategory) onFilterCategory('haircare');
              });
            }}
            className="hover:text-maroon-800 transition-colors cursor-pointer py-1"
          >
            Hair Care
          </button>

          <button
            onClick={() => handleNavClick('story')}
            className={`hover:text-maroon-800 transition-colors cursor-pointer py-1 ${
              activeScreen === 'story' ? 'text-maroon-800 font-bold border-b-2 border-maroon-800' : ''
            }`}
          >
            Our Story
          </button>

          <button
            onClick={() => handleNavClick('bank_details')}
            className={`hover:text-maroon-800 transition-colors cursor-pointer py-1 ${
              activeScreen === 'bank_details'
                ? 'text-maroon-800 font-bold border-b-2 border-maroon-800'
                : ''
            }`}
          >
            Bank Details
          </button>

          <button
            onClick={() => {
              handleNavClick('catalog', () => {
                if (onFilterCategory) onFilterCategory('all', 'all', true);
              });
            }}
            className="text-maroon-800 hover:text-maroon-900 font-bold transition-colors cursor-pointer py-1"
          >
            Special Sale
          </button>
        </nav>

        {/* Utility Icons (Search, Account, Wishlist, Cart) */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-gray-700">
          {/* Search Icon */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-maroon-800 transition-colors cursor-pointer focus:outline-none"
            type="button"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Account / Sign In */}
          <button
            onClick={onOpenAccount}
            aria-label="Account and Lists"
            className="hidden sm:flex items-center space-x-2 cursor-pointer hover:text-maroon-800 transition-colors focus:outline-none text-left"
            type="button"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
            <div className="text-left text-xs leading-tight">
              <span className="block text-gray-400 text-[10px]">Hello, sign in</span>
              <span className="font-semibold text-gray-800">Account &amp; List</span>
            </div>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            className="p-1 hover:text-maroon-800 transition-colors relative cursor-pointer focus:outline-none"
            type="button"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Badge */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="p-1 hover:text-maroon-800 transition-colors relative cursor-pointer focus:outline-none"
            type="button"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.7]" />
            <span className="absolute -top-1 -right-1 bg-maroon-800 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2.5 text-xs font-semibold uppercase tracking-wider text-gray-800">
            <button
              onClick={() => {
                handleNavClick('catalog', () => {
                  if (onFilterCategory) onFilterCategory('all', 'winter', false, true);
                });
              }}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Winter New Arrival</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => {
                handleNavClick('catalog', () => {
                  if (onFilterCategory) onFilterCategory('skincare');
                });
              }}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Organic Skincare</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => {
                handleNavClick('catalog', () => {
                  if (onFilterCategory) onFilterCategory('luxury_glow');
                });
              }}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Luxury Glow</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => {
                handleNavClick('catalog', () => {
                  if (onFilterCategory) onFilterCategory('haircare');
                });
              }}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Hair Care</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Our Story</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => handleNavClick('bank_details')}
              className="text-left py-2 hover:text-maroon-800 border-b border-gray-50 flex items-center justify-between"
            >
              <span>Bank Details</span>
              <span className="text-stone-400">→</span>
            </button>
            <button
              onClick={() => {
                handleNavClick('catalog', () => {
                  if (onFilterCategory) onFilterCategory('all', 'all', true);
                });
              }}
              className="text-left py-2 text-maroon-800 font-bold flex items-center justify-between"
            >
              <span>Special Sale</span>
              <span className="text-maroon-800 font-bold">SALE</span>
            </button>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex-1 bg-cream-100 hover:bg-cream-200 text-maroon-900 py-2.5 rounded text-center font-medium"
              >
                Sign In / Account
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="px-4 py-2.5 border border-gray-200 rounded text-gray-700 flex items-center justify-center gap-1.5"
              >
                <Heart className="w-4 h-4 text-maroon-800" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
