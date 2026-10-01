import React, { useState, useEffect } from 'react';
import { CartItem, Order, UserProfile } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, Building2, MessageCircle } from 'lucide-react';
import { BANK_ACCOUNTS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  onOrderSuccess: (order: Order) => void;
  currentUser?: UserProfile | null;
}

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Gujranwala',
  'Sialkot',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Gujrat',
  'Sheikhupura',
  'Other City / Town',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  onOrderSuccess,
  currentUser,
}) => {
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || 'Lahore');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK_TRANSFER' | 'RAAST'>('COD');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name && !fullName) setFullName(currentUser.name);
      if (currentUser.phone && !phone) setPhone(currentUser.phone);
      if (currentUser.email && !email) setEmail(currentUser.email);
      if (currentUser.address && !address) setAddress(currentUser.address);
      if (currentUser.city) setCity(currentUser.city);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 3000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `GWM-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-PK', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        items: [...items],
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total,
        paymentMethod,
        shippingAddress: {
          fullName,
          phone,
          email,
          address,
          city,
          notes,
        },
        status: 'Confirmed',
      };

      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
    }, 900);
  };

  const handleWhatsAppNotify = (order: Order) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Glow with Maleeha Team! I just placed order #${order.orderNumber} for PKR ${order.total.toLocaleString()} (${order.items.length} items) under the name ${order.shippingAddress.fullName}. Please confirm receipt! 🌸`
    );
    window.open(`https://wa.me/923244999395?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-maroon-800 font-semibold block">
              Glow with Maleeha Luxury Checkout
            </span>
            <h3 className="font-luxury-title font-bold text-xl text-gray-900">
              {confirmedOrder ? 'Order Confirmed!' : 'Delivery & Payment Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <h4 className="font-luxury-title text-2xl font-bold text-gray-900">
                Thank You, {confirmedOrder.shippingAddress.fullName}!
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Your luxury order has been received and logged into our Lahore fulfillment hub.
              </p>
              <div className="mt-3 inline-block bg-amber-50 border border-amber-200/80 px-4 py-2 rounded text-xs">
                <span className="text-gray-600">Order Reference: </span>
                <strong className="text-maroon-900 font-mono font-bold tracking-wider">
                  #{confirmedOrder.orderNumber}
                </strong>
              </div>
            </div>

            {confirmedOrder.paymentMethod === 'BANK_TRANSFER' && (
              <div className="bg-stone-50 border border-gray-200 p-4 rounded text-left text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-maroon-800 font-bold">
                  <Building2 className="w-4 h-4" />
                  <span>Next Step for Bank Transfer Verification:</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Please transfer <strong>PKR {confirmedOrder.total.toLocaleString()}</strong> to our
                  verified Meezan Bank account:
                </p>
                <div className="bg-white p-2.5 rounded border border-gray-200 font-mono text-[11px] space-y-0.5">
                  <p><strong>Bank:</strong> {BANK_ACCOUNTS[0].bankName}</p>
                  <p><strong>Title:</strong> {BANK_ACCOUNTS[0].accountTitle}</p>
                  <p><strong>IBAN:</strong> {BANK_ACCOUNTS[0].iban}</p>
                </div>
                <p className="text-gray-500 text-[11px]">
                  Send the payment transfer screenshot to WhatsApp <strong>0324 4999395</strong> with your order number.
                </p>
              </div>
            )}

            {/* Order Summary Recap */}
            <div className="border border-gray-100 rounded p-4 text-left text-xs bg-stone-50/60 divide-y divide-gray-100">
              <div className="pb-2 flex justify-between">
                <span className="text-gray-600">Ship To:</span>
                <span className="font-medium text-gray-900 text-right">
                  {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-600">Payment:</span>
                <span className="font-semibold text-gray-900">
                  {confirmedOrder.paymentMethod === 'COD'
                    ? 'Cash on Delivery (COD)'
                    : 'Direct Bank Transfer'}
                </span>
              </div>
              <div className="pt-2 flex justify-between text-sm font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-maroon-800 font-mono tabular-nums">
                  PKR {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => handleWhatsAppNotify(confirmedOrder)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded shadow flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-3 px-4 rounded transition-colors cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
            {/* Contact details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-maroon-800" />
                <span>Customer &amp; Contact Details</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Mobile Number (for SMS &amp; WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0321-1234567"
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Email Address (Optional for invoice)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-maroon-800" />
                <span>Shipping Address in Pakistan</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Apartment #, Street, Block, Area"
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Delivery Special Instructions / Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Near Liberty Roundabout / Call before arrival"
                  className="w-full text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-maroon-800"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-800">
                Select Payment Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`border rounded-lg p-3 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-maroon-800 bg-amber-50/50 ring-1 ring-maroon-800'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-0.5 text-maroon-800 focus:ring-maroon-800"
                  />
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Cash on Delivery (COD)
                    </span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      Pay cash upon delivery to the courier at your doorstep.
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('BANK_TRANSFER')}
                  className={`border rounded-lg p-3 flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'BANK_TRANSFER'
                      ? 'border-maroon-800 bg-amber-50/50 ring-1 ring-maroon-800'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'BANK_TRANSFER'}
                    onChange={() => setPaymentMethod('BANK_TRANSFER')}
                    className="mt-0.5 text-maroon-800 focus:ring-maroon-800"
                  />
                  <div>
                    <span className="block text-xs font-bold text-gray-900">
                      Direct Bank Transfer / Raast
                    </span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      Transfer to verified Meezan Bank or HBL account.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Summary */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {items.length} product(s) in bag • Express courier
              </span>
              <div className="text-right">
                <span className="block text-[10px] text-gray-400 uppercase">Total Payable</span>
                <span className="text-lg font-bold text-maroon-800 font-mono tabular-nums">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-widest py-3.5 rounded shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Order...' : 'Confirm and Place Order'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
