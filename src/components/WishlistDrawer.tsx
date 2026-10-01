import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-maroon-800 fill-maroon-800" />
              <h2 className="font-luxury-title font-bold text-xl text-gray-900 tracking-wide">
                Your Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-luxury-title text-xl font-bold text-gray-800">Your wishlist is empty</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Click the heart icon on any skincare ritual or bridal package to save it for later.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded bg-stone-100 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <h4 className="font-luxury-title font-semibold text-sm text-gray-900 line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-[11px] text-gray-500">{product.volume}</span>
                    <div className="mt-1 font-bold text-xs text-maroon-800 font-mono">
                      PKR {product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveWishlist(product.id);
                      }}
                      className="bg-maroon-800 hover:bg-maroon-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded flex items-center gap-1 uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-gray-400 hover:text-red-700 text-[11px] flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-stone-50 text-center">
            <button
              onClick={onClose}
              className="text-xs text-gray-600 hover:text-maroon-800 font-medium"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
