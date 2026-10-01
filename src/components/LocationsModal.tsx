import React, { useState } from 'react';
import { STORE_LOCATIONS } from '../data/products';
import { X, MapPin, Phone, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface LocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocationId?: string;
}

export const LocationsModal: React.FC<LocationsModalProps> = ({
  isOpen,
  onClose,
  selectedLocationId = 'lahore-flagship',
}) => {
  const [activeLocId, setActiveLocId] = useState(selectedLocationId);

  if (!isOpen) return null;

  const activeStore =
    STORE_LOCATIONS.find((l) => l.id === activeLocId) || STORE_LOCATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-maroon-800" />
            <h3 className="font-luxury-title font-bold text-xl text-gray-900 tracking-wide">
              Official Boutiques &amp; Experience Studios
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location selector tabs */}
        <div className="grid grid-cols-3 border-b border-gray-200 bg-stone-100/50 text-xs font-semibold">
          {STORE_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocId(loc.id)}
              className={`py-3 px-3 sm:px-4 text-center transition-colors cursor-pointer border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                activeLocId === loc.id
                  ? 'border-maroon-800 bg-white text-maroon-900 shadow-xs'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <span>📍</span>
              <span className="truncate">{loc.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {activeStore.type}
                </span>
                {activeStore.isFlagship && (
                  <span className="text-[11px] uppercase tracking-wider text-white font-bold bg-maroon-800 px-2 py-0.5 rounded">
                    Primary Flagship
                  </span>
                )}
              </div>
              <h4 className="font-luxury-title text-2xl font-bold text-gray-900">
                {activeStore.name}
              </h4>
            </div>

            <a
              href={`tel:${activeStore.phone.split('/')[0].trim()}`}
              className="inline-flex items-center gap-1.5 bg-cream-100 hover:bg-cream-200 text-maroon-900 text-xs font-semibold px-4 py-2 rounded transition-colors self-start"
            >
              <Phone className="w-3.5 h-3.5 text-maroon-800" />
              <span>Call Boutique</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-maroon-800 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 mb-0.5">Physical Address</strong>
                  <p className="text-gray-600 leading-relaxed font-light">{activeStore.address}</p>
                  <p className="text-gray-900 font-medium mt-0.5">{activeStore.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-maroon-800 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 mb-0.5">Opening Hours</strong>
                  <p className="text-gray-600 font-light">{activeStore.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-maroon-800 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-gray-900 mb-0.5">Appointments &amp; Inquiries</strong>
                  <p className="text-gray-600 font-mono font-medium">{activeStore.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded border border-gray-200/80">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4 text-maroon-800" />
                <span>Boutique Amenities &amp; Services</span>
              </div>
              <ul className="space-y-2">
                {activeStore.services.map((srv, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/923244999395?text=Hello%20Glow%20with%20Maleeha!%20I%20would%20like%20to%20book%20a%20skincare%20consultation%20at%20${encodeURIComponent(
                activeStore.name
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold py-3 px-4 rounded text-center uppercase tracking-wider transition-colors shadow-sm"
            >
              Book In-Store Bridal &amp; Skincare Consultation
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
