import React, { useState } from 'react';
import { BANK_ACCOUNTS } from '../data/products';
import { Copy, Check, ShieldCheck, AlertCircle, Building, MessageCircle } from 'lucide-react';

export const BankDetailsScreen: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
      {/* Title Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-maroon-800 font-semibold block mb-2">
          Transparent &amp; Secure Payments
        </span>
        <h1 className="text-3xl md:text-5xl font-luxury-title tracking-wider text-gray-900 uppercase font-semibold">
          OFFICIAL BANK DETAILS
        </h1>
        <div className="w-16 h-0.5 bg-maroon-800 mx-auto mt-3" />
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed font-light">
          To protect our valued patrons against fraud, please verify that your beneficiary account
          title strictly reads <strong className="text-gray-900 font-semibold">GLOW WITH MALEEHA</strong> or{' '}
          <strong className="text-gray-900 font-semibold">GLOW WITH MALEEHA (PVT) LTD</strong>.
        </p>
      </div>

      {/* Security Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
        <ShieldCheck className="w-5 h-5 text-maroon-800 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Verified Banking Protection:</strong>
          <span>
            We do NOT accept payments into unverified individual accounts. For instant confirmation,
            kindly share your transaction reference or mobile screenshot directly to our official
            WhatsApp Concierge at <strong>0324 4999395</strong>.
          </span>
        </div>
      </div>

      {/* Bank Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {BANK_ACCOUNTS.map((acc, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200/90 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cream-100 rounded-bl-full -z-0 opacity-40" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-maroon-800/10 flex items-center justify-center text-maroon-800">
                    <Building className="w-4 h-4" />
                  </div>
                  <h3 className="font-luxury-title font-bold text-lg text-gray-900">
                    {acc.bankName}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                  {acc.branchCode}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="block text-[11px] text-gray-400 uppercase tracking-wider">
                    Account Title
                  </span>
                  <span className="font-bold text-gray-800 text-sm font-luxury-nav">
                    {acc.accountTitle}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] text-gray-400 uppercase tracking-wider">
                    Account Number
                  </span>
                  <div className="flex items-center justify-between bg-stone-50 p-2 rounded border border-gray-200/60 font-mono">
                    <span className="text-gray-900 font-semibold">{acc.accountNumber}</span>
                    <button
                      onClick={() => handleCopy(acc.accountNumber, `num-${index}`)}
                      className="text-maroon-800 hover:text-maroon-900 flex items-center gap-1 text-[11px] font-sans font-medium cursor-pointer"
                    >
                      {copiedKey === `num-${index}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] text-gray-400 uppercase tracking-wider">
                    IBAN / Instant Rails
                  </span>
                  <div className="flex items-center justify-between bg-stone-50 p-2 rounded border border-gray-200/60 font-mono">
                    <span className="text-gray-800 text-[11px] truncate max-w-[260px]">
                      {acc.iban}
                    </span>
                    <button
                      onClick={() => handleCopy(acc.iban, `iban-${index}`)}
                      className="text-maroon-800 hover:text-maroon-900 flex items-center gap-1 text-[11px] font-sans font-medium cursor-pointer flex-shrink-0"
                    >
                      {copiedKey === `iban-${index}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 pt-1">
                  <strong>Branch:</strong> {acc.branchName}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 italic">
              {acc.notes}
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-Step Instructions */}
      <div className="bg-stone-50 rounded p-6 sm:p-8 border border-gray-200">
        <h3 className="font-luxury-title text-xl font-bold text-gray-900 mb-4 text-center">
          How to Complete Your Bank Transfer Order
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="p-3 bg-white rounded border border-gray-200/60">
            <span className="w-7 h-7 rounded-full bg-maroon-800 text-white font-bold inline-flex items-center justify-center mb-2">
              1
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Place Order</h4>
            <p className="text-gray-500 text-[11px]">
              Select Bank Transfer or Raast at online checkout to receive your Order ID.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200/60">
            <span className="w-7 h-7 rounded-full bg-maroon-800 text-white font-bold inline-flex items-center justify-center mb-2">
              2
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Initiate Transfer</h4>
            <p className="text-gray-500 text-[11px]">
              Send the exact total via your mobile banking app (Meezan, HBL, Alfalah, or Raast).
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200/60">
            <span className="w-7 h-7 rounded-full bg-maroon-800 text-white font-bold inline-flex items-center justify-center mb-2">
              3
            </span>
            <h4 className="font-bold text-gray-900 mb-1">Capture Proof</h4>
            <p className="text-gray-500 text-[11px]">
              Take a clean screenshot or note down the transaction reference number.
            </p>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200/60">
            <span className="w-7 h-7 rounded-full bg-maroon-800 text-white font-bold inline-flex items-center justify-center mb-2">
              4
            </span>
            <h4 className="font-bold text-gray-900 mb-1">WhatsApp Verification</h4>
            <p className="text-gray-500 text-[11px]">
              Send the proof to 0324 4999395 for instant priority dispatch confirmation.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://wa.me/923244999395?text=Hello%20Glow%20with%20Maleeha%20Team!%20I%20want%20to%20verify%20my%20bank%20transfer."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-6 py-2.5 rounded shadow transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Verification Concierge (0324 4999395)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
