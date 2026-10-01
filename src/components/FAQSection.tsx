import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'Does Glow with Maleeha accept orders via social media or WhatsApp?',
    answer:
      'Yes, absolutely! While you can place your order directly through our official website with instant cart checkout, our dedicated VIP WhatsApp concierge (0324 4999395) operates 7 days a week from 10:00 AM to 11:00 PM. Simply message us with the screenshot or names of your chosen products, your delivery address, and preferred payment method (Cash on Delivery or Bank Transfer).',
  },
  {
    id: 2,
    question: 'Can I cancel or amend my order once placed?',
    answer:
      'Orders can be amended or cancelled within 2 hours of placement before our dispatch team books the courier consignment. Please immediately message our WhatsApp concierge at 0324 4999395 with your Order ID. Once a tracking number is generated via TCS, Trax, or Call Courier, changes cannot be guaranteed.',
  },
  {
    id: 3,
    question: "How do I know I'm ordering from the official verified store?",
    answer:
      'Always ensure you are transacting through our verified domain, our verified WhatsApp business number (+92 324 4999395), or visiting our official Liberty Market Lahore Flagship Store. Our bank accounts are strictly registered under the registered corporate name "GLOW WITH MALEEHA" or "GLOW WITH MALEEHA (PVT) LTD". We never ask you to transfer funds to personal unverified wallets.',
  },
  {
    id: 4,
    question: 'What is your exchange and return policy?',
    answer:
      'We offer a hassle-free 7-day replacement or store credit guarantee for items that arrive damaged, defective, or leaked in transit. Due to strict hygiene and dermatological formulation standards, opened and used skincare or cosmetic items cannot be returned unless verified by our clinical advisory team as causing an adverse reaction.',
  },
  {
    id: 5,
    question: 'How can I verify bank account payment details securely?',
    answer:
      'All verified bank account details are publicly listed under the "Bank Details" section on this website. Our primary account is with Meezan Bank Limited (Account Title: GLOW WITH MALEEHA (PVT) LTD, IBAN: PK52MEZN0002010108849201). After completing your online transfer or Raast transaction, take a screenshot of the transaction receipt and send it to 0324 4999395 for instant order confirmation.',
  },
  {
    id: 6,
    question: 'What are the product return and replacement conditions?',
    answer:
      'To qualify for a replacement: 1) The claim must be initiated within 7 calendar days of courier receipt. 2) Provide a short unboxing video or photographs of the parcel showing the batch code. 3) The outer packaging and seal must be intact for non-defective exchanges. Replacement parcels are dispatched within 48 hours free of extra courier fees.',
  },
  {
    id: 7,
    question: 'What happens after I place an order online?',
    answer:
      'Immediately upon order placement: 1) You receive an automated SMS and WhatsApp confirmation summary with your Order ID. 2) For Cash on Delivery orders, our customer support will initiate a quick confirmation check. 3) Orders are dispatched from our Lahore fulfillment hub within 24 hours. Delivery takes 1–2 working days within Lahore and 2–4 working days nationwide via tracked express courier.',
  },
  {
    id: 8,
    question: 'Are your organic skincare products safe for sensitive skin?',
    answer:
      'All Glow with Maleeha formulas are dermatologist-tested, hypoallergenic, 100% cruelty-free, and formulated without harsh parabens, sulfates, synthetic dyes, or bleaching steroids. Because our botanical extracts (like pure Kashmiri saffron, Damascus rose hydrosol, and alpine peptides) are active and potent, we always advise doing a 24-hour patch test on your inner arm or jawline before first full facial application.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 lg:px-8 py-14 border-t border-gray-100"
      data-purpose="faq-accordion"
    >
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-luxury-title tracking-wider text-gray-900 uppercase font-semibold">
          HAVE A QUESTION?
        </h2>
        <div className="w-16 h-0.5 bg-maroon-800 mx-auto mt-3" />
      </div>

      {/* FAQ Accordion 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto items-start">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              onClick={() => toggleFAQ(faq.id)}
              className={`rounded-lg p-4 sm:p-5 transition-all duration-200 cursor-pointer border shadow-sm ${
                isOpen
                  ? 'bg-amber-50/40 border-amber-200/80 ring-1 ring-amber-200/50'
                  : 'bg-gray-100/80 hover:bg-gray-100 border-gray-200/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-sm sm:text-base text-gray-800 leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`text-2xl font-light ml-2 flex-shrink-0 leading-none transition-transform duration-200 select-none ${
                    isOpen ? 'text-maroon-800 rotate-45' : 'text-gray-500'
                  }`}
                >
                  +
                </span>
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-gray-200/50 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
