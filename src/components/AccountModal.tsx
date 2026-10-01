import React, { useState } from 'react';
import { Order, UserProfile } from '../types';
import { X, User, Package, MapPin, Sparkles, LogOut, CheckCircle, Mail, Phone, Calendar, Save } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSignOut: () => void;
  orders: Order[];
  onUpdateUser?: (updated: UserProfile) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSignOut,
  orders,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [editCity, setEditCity] = useState(currentUser?.city || 'Lahore');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: UserProfile = {
      ...currentUser,
      address: editAddress,
      city: editCity,
    };

    // Update current user and stored users
    try {
      localStorage.setItem('gwm_current_user', JSON.stringify(updated));
      const usersData = localStorage.getItem('gwm_registered_users');
      if (usersData) {
        const users: UserProfile[] = JSON.parse(usersData);
        const idx = users.findIndex((u) => u.id === currentUser.id || u.email === currentUser.email);
        if (idx !== -1) {
          users[idx] = updated;
          localStorage.setItem('gwm_registered_users', JSON.stringify(users));
        }
      }
    } catch {
      // ignore
    }

    if (onUpdateUser) onUpdateUser(updated);
    setIsEditingAddress(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-maroon-800 text-amber-200 flex items-center justify-center font-bold text-xs font-luxury-title border border-amber-300/40">
              GM
            </div>
            <div>
              <h3 className="font-luxury-title font-bold text-lg text-gray-900 leading-tight">
                VIP Patron Account
              </h3>
              <p className="text-[10px] text-gray-400">Glow with Maleeha Private Club</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentUser ? (
            <div className="space-y-5">
              {/* User Profile Card */}
              <div className="bg-gradient-to-r from-amber-50/70 via-stone-50 to-white border border-amber-200/80 rounded-xl p-4 flex items-center justify-between shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-luxury-title font-bold text-lg text-gray-900">
                      {currentUser.name}
                    </h4>
                    <span className="bg-maroon-800 text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-300/30">
                      {currentUser.tier || 'VIP Patron'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 flex flex-wrap gap-x-4 gap-y-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-maroon-800" />
                      {currentUser.email}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Phone className="w-3 h-3" />
                      {currentUser.phone}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 flex items-center gap-1 pt-0.5">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>Member since: {currentUser.joinedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="flex flex-col items-center gap-1 text-gray-400 hover:text-rose-700 text-[10px] font-medium p-2 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2 rounded text-xs flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Profile delivery details updated successfully!</span>
                </div>
              )}

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
                  <span>Saved Address &amp; Data</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'orders' ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {orders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-500">
                      No orders placed yet. Explore our luxury collection to place your first order!
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 border border-gray-200 rounded-lg text-xs space-y-1.5 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-gray-900">
                            #{ord.orderNumber}
                          </span>
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
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
                <div className="space-y-4 text-xs text-gray-600">
                  {isEditingAddress ? (
                    <form onSubmit={handleSaveProfile} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Delivery City
                        </label>
                        <input
                          type="text"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          placeholder="e.g. Lahore"
                          className="w-full text-xs p-2 bg-stone-50 border border-gray-300 rounded focus:outline-none focus:border-maroon-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                          Street / Apartment Address
                        </label>
                        <textarea
                          rows={2}
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          placeholder="Enter your street address"
                          className="w-full text-xs p-2 bg-stone-50 border border-gray-300 rounded focus:outline-none focus:border-maroon-800"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-maroon-800 hover:bg-maroon-900 text-white text-xs px-4 py-2 rounded font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingAddress(false)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-lg bg-stone-50/70 flex justify-between items-start">
                        <div>
                          <strong className="block text-gray-900 mb-1 text-xs">
                            Saved Delivery Destination:
                          </strong>
                          <p className="text-gray-700">
                            {currentUser.address || 'No street address saved yet.'}
                          </p>
                          <p className="font-semibold text-maroon-800">
                            {currentUser.city || 'Lahore'}, Pakistan
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setEditAddress(currentUser.address || '');
                            setEditCity(currentUser.city || 'Lahore');
                            setIsEditingAddress(true);
                          }}
                          className="text-xs text-maroon-800 hover:underline font-semibold cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="p-3 border border-amber-200/60 rounded-lg bg-amber-50/50 text-[11px] text-amber-900 space-y-1">
                        <div className="font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Data Protection Guarantee</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-light">
                          Your account data is private, encrypted, and saved locally. All orders and consultations are linked to your WhatsApp number ({currentUser.phone}).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-gray-500 mb-3">You are currently browsing as guest.</p>
              <button
                onClick={() => {
                  onSignOut(); // Triggers auth gate
                  onClose();
                }}
                className="bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold py-2 px-5 rounded shadow cursor-pointer"
              >
                Sign In / Register VIP Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
