import React from 'react';
import { StoreLocation } from '../types';

interface FooterProps {
  onOpenLocation: (locationId?: string) => void;
  onOpenPolicy: (policyKey: string) => void;
  onNavigateToBank: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLocation,
  onOpenPolicy,
  onNavigateToBank,
}) => {
  return (
    <footer
      className="bg-stone-50 border-t border-gray-200 pt-16 pb-12 text-gray-700"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand Info & Bio */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full border border-maroon-800 flex items-center justify-center p-0.5 bg-white shadow-sm flex-shrink-0">
              <span className="font-luxury-title font-bold text-lg text-maroon-800">
                GM
              </span>
            </div>
            <div>
              <h4 className="font-luxury-title font-bold text-lg text-gray-900 tracking-wider">
                GLOW WITH MALEEHA
              </h4>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase font-medium">
                (A Touch of Elegance)
              </p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-gray-600 font-normal pr-2">
            With years of dedication and expertise, Glow with Maleeha has become a
            trusted name in luxury skincare, organic beauty treatments, and contemporary
            couture. We craft timeless elegance with pure dermatologically formulated
            botanicals.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 pt-2 text-gray-700">
            {/* Facebook */}
            <a
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-maroon-800 hover:text-white hover:border-maroon-800 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              aria-label="Instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-maroon-800 hover:text-white hover:border-maroon-800 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              aria-label="YouTube"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-maroon-800 hover:text-white hover:border-maroon-800 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              aria-label="TikTok"
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-maroon-800 hover:text-white hover:border-maroon-800 transition-all"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.29.69.13 1.41.05 2.06-.23.75-.32 1.37-.92 1.71-1.67.24-.52.34-1.1.34-1.68.03-4.88.02-9.77.02-14.65h4.05z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Need Help Links */}
        <div>
          <h4 className="font-luxury-title font-bold text-lg text-gray-900 tracking-wider mb-4">
            Need Help!
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-600">
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('shipping')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Shipping Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('refund')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Refund Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('privacy')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('terms')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('disclaimer')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Products Disclaimer Policy
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onNavigateToBank}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Payment Options
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenPolicy('contact')}
                className="hover:text-maroon-800 transition-colors cursor-pointer text-left"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Store Locations (matching chips in reference) */}
        <div>
          <h4 className="font-luxury-title font-bold text-lg text-gray-900 tracking-wider mb-4">
            Location
          </h4>
          <div className="space-y-3 text-xs">
            {/* Location 1 */}
            <button
              type="button"
              onClick={() => onOpenLocation('lahore-flagship')}
              className="w-full text-left bg-gray-200/60 hover:bg-gray-200 p-2.5 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <span className="text-base select-none">📍</span>
              <span className="font-semibold text-gray-800">Lahore Flagship</span>
            </button>
            {/* Location 2 */}
            <button
              type="button"
              onClick={() => onOpenLocation('gulberg-boutique')}
              className="w-full text-left bg-gray-200/60 hover:bg-gray-200 p-2.5 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <span className="text-base select-none">📍</span>
              <span className="font-semibold text-gray-800">Gulberg III Boutique</span>
            </button>
            {/* Location 3 */}
            <button
              type="button"
              onClick={() => onOpenLocation('gujranwala-studio')}
              className="w-full text-left bg-gray-200/60 hover:bg-gray-200 p-2.5 rounded flex items-center gap-2.5 transition-colors cursor-pointer"
            >
              <span className="text-base select-none">📍</span>
              <span className="font-semibold text-gray-800">Gujranwala Studio</span>
            </button>
          </div>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="font-luxury-title font-bold text-lg text-gray-900 tracking-wider mb-4">
            Contact us
          </h4>
          <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <p className="text-gray-900 font-semibold text-sm tracking-wide font-mono tabular-nums">
              03101025997
            </p>
            <p>
              Basement Ashrafi Tower, 19 Commercial Zone Liberty Market,
              <br />
              Gulberg III Lahore, 54000
            </p>
            <div className="pt-1">
              <span className="block text-gray-400 text-[11px]">For Business Inquiries:</span>
              <a
                className="text-gray-800 hover:text-maroon-800 font-medium transition-colors"
                href="mailto:sales@glowwithmaleeha.com"
              >
                sales@glowwithmaleeha.com
              </a>
            </div>
            <div className="pt-1">
              <span className="block text-gray-400 text-[11px]">WhatsApp Concierge:</span>
              <a
                href="https://wa.me/923244999395"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors block font-mono"
              >
                0324 4999395
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        © 2026 Glow with Maleeha. All Rights Reserved. Luxury Skincare &amp; Fashion.
      </div>
    </footer>
  );
};
