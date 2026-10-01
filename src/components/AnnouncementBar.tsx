import React from 'react';
import { MessageCircle } from 'lucide-react';

interface AnnouncementBarProps {
  onWhatsAppClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onWhatsAppClick }) => {
  return (
    <section
      className="bg-maroon-800 text-white text-xs py-2.5 px-4 font-medium tracking-wide border-b border-maroon-900/40 select-none"
      data-purpose="announcement-bar"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
            Free Delivery on Orders Over PKR 3,000
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-normal">
          <button
            onClick={onWhatsAppClick || (() => window.open('https://wa.me/923244999395', '_blank'))}
            className="flex items-center gap-1.5 hover:text-emerald-100 transition-colors cursor-pointer text-left"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300/30" />
            <span>
              WhatsApp Orders:{' '}
              <strong className="font-medium text-emerald-200">0324 4999395</strong>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
