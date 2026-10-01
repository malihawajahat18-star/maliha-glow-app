import React, { useState } from 'react';
import { Order } from '../types';
import { X, User, Package, MapPin, Sparkles, LogOut, CheckCircle } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Maleeha Wajahat');
  const [userPhone, setUserPhone] = useState('0310-1025997');
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-maroon-800" />
            <h3 className="font-luxury-title font-bold text-xl text-gray-900">
              {isLoggedIn ? 'VIP Patron Account' : 'Sign In to Your Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isLoggedIn ? (
            <div className="space-y-4">
              <div className="text-center pb-2">
                <span className="font-luxury-title text-2xl text-maroon-800 font-bold block">
                  GLOW VIP CLUB
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Access bespoke order tracking, bridal consultation history, and loyalty privileges.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Pakistani Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="03xx-xxxxxxx"
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-widest py-3 rounded shadow transition-all cursor-pointer"
              >
                Sign In / Continue
              </button>

              <div className="text-[11px] text-gray-400 text-center">
                By signing in, you accept Glow with Maleeha Terms of Service and Privacy Policy.
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* User card */}
              <div className="bg-cream-50 border border-amber-200/80 rounded p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-luxury-title font-bold text-base text-gray-900">
                    {userName}
                  </h4>
                  <span className="text-xs text-gray-600 font-mono">{userPhone}</span>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gold Tier Member • Free Delivery Privileges</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-400 hover:text-red-700 text-xs p-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'border-maroon-800 text-maroon-800'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>My Orders ({orders.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'profile'
                      ? 'border-maroon-800 text-maroon-800'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'orders' ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {orders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-500">
                      You haven&apos;t placed any orders yet in this session.
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 border border-gray-200 rounded text-xs space-y-1.5 bg-stone-50/50"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-gray-900">
                            #{ord.orderNumber}
                          </span>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                            {ord.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-[11px]">
                          <span>{ord.date}</span>
                          <span className="font-bold text-maroon-800 font-mono">
                            PKR {ord.total.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-600 truncate">
                          {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-3 text-xs text-gray-600">
                  <div className="p-3 border border-gray-200 rounded bg-stone-50">
                    <span className="font-bold text-gray-900 block mb-1">Primary Address:</span>
                    <p>Basement Ashrafi Tower, Liberty Market, Gulberg III</p>
                    <p>Lahore, 54000, Pakistan</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
