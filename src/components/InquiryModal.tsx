import React, { useState } from 'react';
import { X, User, Mail, Phone, Sparkles, CheckCircle2, MessageCircle, Heart, ArrowRight } from 'lucide-react';

export interface InquiryFormData {
  name: string;
  gmail: string;
  whatsapp: string;
  inquiryType?: string;
  message?: string;
  submittedAt: string;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: InquiryFormData) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [inquiryType, setInquiryType] = useState('Personalized Skincare Consultation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!gmail.trim() || !gmail.includes('@')) {
      setError('Please provide a valid Gmail address.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setError('Please provide a valid WhatsApp number (e.g. 0324 4999395).');
      return;
    }

    setIsSubmitting(true);

    const submissionData: InquiryFormData = {
      name: name.trim(),
      gmail: gmail.trim(),
      whatsapp: whatsapp.trim(),
      inquiryType,
      message: message.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    // 1. Store submission in local browser storage
    try {
      const existing = localStorage.getItem('gwm_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(submissionData);
      localStorage.setItem('gwm_inquiries', JSON.stringify(list));
    } catch {
      // ignore storage error
    }

    // 2. Submit to Google Sheets Webhook
    const googleSheetUrl =
      (import.meta as any).env?.VITE_GOOGLE_SHEET_URL ||
      'https://script.google.com/macros/s/AKfycbyyloSL0IDugKyERdwIB4Y7uRu2CSEW7KwNdnZX9Xyqy10F8yEgyM2_dPQeK2tTW-kk/exec';
    if (googleSheetUrl) {
      try {
        const formData = new FormData();
        formData.append('Name', submissionData.name);
        formData.append('Gmail', submissionData.gmail);
        formData.append('WhatsApp', submissionData.whatsapp);
        formData.append('Service', submissionData.inquiryType || '');
        formData.append('Message', submissionData.message || '');
        formData.append('Timestamp', submissionData.submittedAt);

        await fetch(googleSheetUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        });
      } catch (err) {
        console.warn('Google Sheets transmission error:', err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(submissionData);
      }
    }, 400);
  };

  const handleReset = () => {
    setName('');
    setGmail('');
    setWhatsapp('');
    setMessage('');
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 animate-in zoom-in-95 duration-200">
        {/* Luxury Brand Header */}
        <div className="relative bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white px-6 py-5 border-b border-amber-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-amber-300/40 bg-white/10 flex items-center justify-center p-0.5 shadow-inner">
                <span className="font-luxury-title text-base font-bold text-amber-200">GM</span>
              </div>
              <div>
                <h3 className="font-luxury-title font-bold text-xl tracking-wide text-amber-50">
                  Contact Us
                </h3>
                <p className="text-xs text-amber-200/90 font-light flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Glow with Maleeha Luxury Skincare
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 px-2 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="font-luxury-title text-2xl font-bold text-gray-900 mb-2">
                  Thank You, {name}!
                </h4>
                {/* Specific required message */}
                <div className="bg-emerald-50/90 border border-emerald-300 rounded-lg p-3.5 text-emerald-950 font-semibold text-sm sm:text-base leading-snug shadow-xs">
                  ✨ Your form has been submitted, our team will contact you soon.
                </div>
              </div>

              <div className="bg-[#FAF8F5] border border-amber-100 rounded-lg p-4 text-xs text-gray-600 space-y-2 text-left">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Name:</span>
                  <span className="font-semibold text-gray-900">{name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Gmail:</span>
                  <span className="font-mono text-gray-800">{gmail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">WhatsApp No:</span>
                  <span className="font-mono font-bold text-emerald-700">{whatsapp}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/923244999395?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Glow with Maleeha! I just submitted the contact form on your website. My name is ${name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 px-4 rounded-md shadow flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Directly on WhatsApp (0324 4999395)
                </a>
                <button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2.5 px-4 rounded-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-gray-600 pb-1 border-b border-gray-100">
                <p>
                  Please enter your contact details below. Our beauty advisors will reach out to you directly.
                </p>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4 text-maroon-800" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800 transition-colors"
                  />
                </div>
              </div>

              {/* Field 2: Gmail */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">
                  Gmail <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4 text-maroon-800" />
                  </div>
                  <input
                    type="email"
                    required
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Field 3: WhatsApp No */}
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1 flex items-center justify-between">
                  <span>WhatsApp No <span className="text-rose-500">*</span></span>
                  <span className="text-[10px] text-gray-400 font-normal">e.g. 0324 4999395</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="0324 4999395"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-1 focus:ring-emerald-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Inquiry / Interest Type
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white text-gray-800"
                >
                  <option value="Personalized Skincare Consultation">✨ Personalized Skincare Consultation</option>
                  <option value="Bridal Glow & Wedding Preps">👰 Bridal Glow &amp; Wedding Preps</option>
                  <option value="Product Recommendation & Order Help">🛍️ Product Recommendation &amp; Order Help</option>
                  <option value="Acne, Pigmentation & Glow Treatment">🌿 Acne, Pigmentation &amp; Glow Routine</option>
                  <option value="General Inquiry">💬 General Inquiry</option>
                </select>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Message / Special Request (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for..."
                  className="w-full text-xs p-2.5 bg-stone-50 border border-gray-300 rounded-md focus:outline-none focus:border-maroon-800 focus:bg-white focus:ring-1 focus:ring-maroon-800 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-700 hover:from-maroon-800 hover:to-maroon-900 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-md shadow-lg border border-amber-300/30 flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-[0.99] cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Submit Form</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-maroon-800 fill-maroon-800/30" />
                  Your information is strictly protected by Glow with Maleeha privacy policy.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
