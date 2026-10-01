import React from 'react';
import { X, ShieldAlert, Truck, RotateCcw, FileText, Lock, Phone } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyKey: string;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  policyKey,
}) => {
  if (!isOpen) return null;

  const getPolicyContent = () => {
    switch (policyKey) {
      case 'shipping':
        return {
          title: 'Nationwide Shipping Policy',
          icon: <Truck className="w-5 h-5 text-maroon-800" />,
          body: (
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-light">
              <p>
                <strong>Delivery Timelines:</strong> Orders placed before 3:00 PM PST are processed
                and dispatched on the same business day from our Lahore Central Hub.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Lahore Delivery: 1–2 business days via express courier.</li>
                <li>Karachi, Islamabad, Rawalpindi, Faisalabad: 2–3 business days.</li>
                <li>Rest of Pakistan (including AJK and Gilgit-Baltistan): 3–5 business days.</li>
              </ul>
              <p>
                <strong>Free Delivery Policy:</strong> All orders exceeding PKR 3,000 qualify for
                100% Free Nationwide Express Delivery. Orders below PKR 3,000 carry a flat shipping fee
                of PKR 250.
              </p>
              <p>
                <strong>Courier Partners:</strong> We exclusively ship via TCS Express, Trax Courier,
                and Call Courier with real-time SMS tracking updates.
              </p>
            </div>
          ),
        };
      case 'refund':
        return {
          title: 'Refund & Exchange Policy',
          icon: <RotateCcw className="w-5 h-5 text-maroon-800" />,
          body: (
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-light">
              <p>
                At Glow with Maleeha, customer satisfaction and product integrity are our utmost
                priorities.
              </p>
              <p>
                <strong>7-Day Damage Protection:</strong> In the rare event that an item arrives damaged,
                leaked, or defective, contact us via WhatsApp at 0324 4999395 within 7 days with photos
                or video of the parcel. We will immediately dispatch a complimentary replacement.
              </p>
              <p>
                <strong>Hygiene &amp; Safety:</strong> Due to dermatological hygiene protocols, opened
                cosmetic bottles, serums, or creams cannot be returned for change of mind.
              </p>
            </div>
          ),
        };
      case 'disclaimer':
        return {
          title: 'Products Disclaimer Policy',
          icon: <ShieldAlert className="w-5 h-5 text-maroon-800" />,
          body: (
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-light">
              <p>
                Our formulations are handcrafted with premium organic botanicals, botanical extracts,
                and clinically approved cosmetic peptides. They do NOT contain steroids, hydroquinone,
                or synthetic bleaching chemicals.
              </p>
              <p>
                Because natural extracts are potent and active, individual skin sensitivities may vary.
                We strongly recommend conducting a 24-hour patch test on the inner forearm prior to full
                facial application.
              </p>
              <p>
                Our products are not intended to diagnose, treat, cure, or prevent any medical skin
                diseases. For chronic dermatological conditions, consult your physician.
              </p>
            </div>
          ),
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Lock className="w-5 h-5 text-maroon-800" />,
          body: (
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-light">
              <p>
                Glow with Maleeha respects your privacy. We strictly safeguard your personal details,
                shipping addresses, contact numbers, and transaction slips.
              </p>
              <p>
                Your phone number is exclusively used for order status updates, delivery coordination
                via our courier partners, and optional VIP WhatsApp consultation. We never sell or
                share your information with third-party advertising brokers.
              </p>
            </div>
          ),
        };
      default:
        return {
          title: 'Customer Care & Contact',
          icon: <Phone className="w-5 h-5 text-maroon-800" />,
          body: (
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-light">
              <p>
                <strong>WhatsApp Concierge:</strong> 0324 4999395 (24/7 Order Inquiries)
              </p>
              <p>
                <strong>Corporate Email:</strong> sales@glowwithmaleeha.com
              </p>
              <p>
                <strong>Flagship Address:</strong> Basement Ashrafi Tower, 19 Commercial Zone Liberty
                Market, Gulberg III Lahore, 54000.
              </p>
            </div>
          ),
        };
    }
  };

  const { title, icon, body } = getPolicyContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-luxury-title font-bold text-xl text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">{body}</div>

        <div className="px-6 py-3 bg-stone-50 border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="bg-maroon-800 text-white text-xs font-semibold px-5 py-2 rounded hover:bg-maroon-900 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
