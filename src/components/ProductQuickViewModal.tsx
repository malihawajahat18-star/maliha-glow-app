import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, MessageCircle, Check, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello Glow with Maleeha! I want to order "${product.name}" (${quantity} unit(s) - PKR ${(
        product.price * quantity
      ).toLocaleString()}). Please confirm availability.`
    );
    window.open(`https://wa.me/923244999395?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-700 bg-white/80 rounded-full hover:bg-white shadow transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-square md:aspect-auto bg-stone-900 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded text-amber-200 font-medium">
                {product.volume}
              </span>
              <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-semibold">
                {product.stockStatus}
              </span>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="uppercase tracking-widest text-[10px] font-semibold text-maroon-800">
                  {product.category.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-luxury-title font-bold text-2xl text-gray-900 leading-snug">
                {product.name}
              </h2>
              {product.subtitle && (
                <p className="text-xs text-stone-500 mt-1 italic font-light">{product.subtitle}</p>
              )}

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-maroon-800 font-mono tabular-nums">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through font-mono tabular-nums">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save PKR {(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 mt-4 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Key Benefits */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-bold text-gray-800 uppercase tracking-wider block">
                  Key Dermatological Benefits
                </span>
                <ul className="text-xs text-gray-600 space-y-1">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-maroon-800 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Active Formulation Ingredients
                </span>
                <p className="text-[11px] text-gray-500 leading-normal font-light">
                  {product.ingredients}
                </p>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-maroon-800 hover:bg-maroon-900 text-white shadow'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-3 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-maroon-800 text-maroon-800' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Instant WhatsApp Order */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 px-4 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Quick Order via WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
