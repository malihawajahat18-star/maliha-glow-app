import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  discountAmount: number;
  onApplyDiscount: (code: string) => boolean;
  onRemoveDiscount: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  discountAmount,
  onApplyDiscount,
  onRemoveDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 3000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const ok = onApplyDiscount(promoInput.trim());
    if (!ok) {
      setPromoError('Invalid coupon code. Try "GLOW10" for 10% off.');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-maroon-800" />
              <h2 className="font-luxury-title font-bold text-xl text-gray-900 tracking-wide">
                Your Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-cream-50 px-6 py-3 border-b border-amber-100/60">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-gray-700">
                {isFreeDelivery ? (
                  <strong className="text-emerald-700">🎉 Congratulations! You have unlocked Free Delivery.</strong>
                ) : (
                  <>
                    Add <strong className="text-maroon-800 font-mono tabular-nums">PKR {remainingForFreeDelivery.toLocaleString()}</strong> more for Free Delivery
                  </>
                )}
              </span>
              <span className="text-[11px] text-gray-500 font-mono tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isFreeDelivery ? 'bg-emerald-600' : 'bg-maroon-800'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="py-16 text-center text-gray-500 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-cream-50 border border-amber-200/60 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-maroon-800/60" />
                </div>
                <h3 className="font-luxury-title text-xl text-gray-800 font-bold mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Indulge in our winter rituals, botanical SPF, or exclusive bridal packages.
                </p>
                <button
                  onClick={onClose}
                  className="bg-maroon-800 text-white text-xs font-semibold px-6 py-2.5 rounded uppercase tracking-wider hover:bg-maroon-900 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded bg-stone-100 flex-shrink-0 border border-gray-200/60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-luxury-title font-semibold text-sm text-gray-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-500 block">{item.product.volume}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-200 rounded bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-gray-900 font-mono tabular-nums">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-stone-50/40 space-y-4">
              {/* Promo Code Input */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Coupon <strong>{discountCode}</strong> applied (-PKR {discountAmount.toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={onRemoveDiscount}
                    className="text-emerald-900 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. GLOW10)"
                    className="flex-1 text-xs border border-gray-300 rounded px-3 py-2 uppercase bg-white focus:outline-none focus:border-maroon-800"
                  />
                  <button
                    type="submit"
                    className="bg-stone-800 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-stone-900 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 font-mono tabular-nums">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium font-mono tabular-nums">
                      -PKR {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Express Delivery</span>
                  <span className="font-medium text-gray-900 font-mono tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">FREE</span>
                    ) : (
                      `PKR ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-900">
                  <span>Estimated Total</span>
                  <span className="text-base text-maroon-800 font-mono tabular-nums">
                    PKR {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery &amp; Bank Transfer Available Across Pakistan</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
