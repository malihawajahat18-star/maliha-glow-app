import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ClipboardEdit, Mail } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenInquiry?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenInquiry }) => {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showInquiryTooltip, setShowInquiryTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const WHATSAPP_NUMBER = '923244999395';
  const DISPLAY_PHONE = '0324 4999395';

  const handleSendMessage = (textToSend?: string) => {
    const msg = textToSend || chatInput || 'Assalam-o-Alaikum Glow with Maleeha! I have an inquiry about your skincare collection.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsOpen(false);
    setChatInput('');
  };

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-40 flex flex-col items-start pointer-events-auto">
      {/* Mini Chat Flyout */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/40 bg-white p-0.5 flex items-center justify-center">
                <span className="font-luxury-title text-sm font-bold text-maroon-800">GM</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Glow with Maleeha</h4>
                <p className="text-[10px] text-emerald-200">Online • Typically replies in 5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] space-y-3 text-xs max-h-60 overflow-y-auto">
            <div className="bg-white p-3 rounded-lg shadow-xs rounded-tl-none max-w-[85%] text-gray-800 leading-relaxed">
              <p className="font-medium text-gray-900 mb-1">Assalam-o-Alaikum! 🌸</p>
              <p>Welcome to Glow with Maleeha Luxury Skincare. How can our beauty advisor assist you today?</p>
              <span className="text-[9px] text-gray-400 block text-right mt-1">Just now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleSendMessage('I want to order via WhatsApp')}
                className="w-full text-left bg-white/90 hover:bg-white text-gray-700 p-2 rounded border border-gray-200 text-[11px] transition-colors cursor-pointer"
              >
                🛍️ Place Order via WhatsApp
              </button>
              <button
                onClick={() => handleSendMessage('I want to verify bank transfer details')}
                className="w-full text-left bg-white/90 hover:bg-white text-gray-700 p-2 rounded border border-gray-200 text-[11px] transition-colors cursor-pointer"
              >
                💳 Verify Bank Transfer Receipt
              </button>
              <button
                onClick={() => handleSendMessage('I want to book a bridal consultation in Lahore')}
                className="w-full text-left bg-white/90 hover:bg-white text-gray-700 p-2 rounded border border-gray-200 text-[11px] transition-colors cursor-pointer"
              >
                👰 Book Bridal Skincare Consultation
              </button>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 text-xs border border-gray-300 rounded-full px-3 py-1.5 focus:outline-none focus:border-emerald-600"
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Buttons Group: New Consultation Button (Left) + WhatsApp Button (Right) */}
      <div className="flex items-center gap-3">
        {/* NEW BUTTON TO THE LEFT OF WHATSAPP: Contact Us Button */}
        <div className="relative flex items-center">
          <button
            onClick={onOpenInquiry}
            onMouseEnter={() => setShowInquiryTooltip(true)}
            onMouseLeave={() => setShowInquiryTooltip(false)}
            aria-label="Contact Us - Submit Information"
            className="group flex items-center gap-2 bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 hover:from-maroon-800 hover:to-maroon-900 text-amber-50 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border border-amber-300/40 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <span className="font-luxury-nav text-xs sm:text-sm font-bold tracking-wide uppercase whitespace-nowrap">
              Contact
            </span>
          </button>

          {showInquiryTooltip && (
            <span className="absolute bottom-full mb-2 left-0 whitespace-nowrap bg-stone-900 text-white text-[11px] font-medium py-1 px-3 rounded shadow-lg border border-amber-400/20 animate-in fade-in duration-150">
              ✉️ Contact Us • Submit Details
            </span>
          )}
        </div>

        {/* WHATSAPP BUTTON */}
        <div className="relative flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            aria-label={`Contact on WhatsApp (${DISPLAY_PHONE})`}
            className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer"
          >
            <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
          </button>

          {showWhatsAppTooltip && !isOpen && (
            <span className="absolute bottom-full mb-2 left-0 whitespace-nowrap bg-stone-900 text-white text-[11px] font-medium py-1 px-2.5 rounded shadow-lg animate-in fade-in duration-150">
              Chat on WhatsApp ({DISPLAY_PHONE})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
