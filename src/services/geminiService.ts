import { ChatMessage } from '../types/chat';
import { PRODUCTS } from '../data/products';

const GEMINI_STORAGE_KEY = 'gwm_gemini_api_key';

export function getGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem(GEMINI_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
    if (envKey && envKey !== 'MY_GEMINI_API_KEY' && envKey.trim()) return envKey.trim();
  } catch (e) {
    console.error('Failed to get Gemini API key:', e);
  }
  return '';
}

export function saveGeminiApiKey(key: string): void {
  try {
    if (!key || !key.trim()) {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
    } else {
      localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
    }
    window.dispatchEvent(new CustomEvent('gwm-gemini-key-changed', { detail: key }));
  } catch (e) {
    console.error('Failed to save Gemini API key:', e);
  }
}

export async function testGeminiApiKey(key: string): Promise<{ success: boolean; message: string }> {
  if (!key || !key.trim()) {
    return { success: false, message: 'Please enter an API key.' };
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key.trim()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello, reply with "OK".' }] }],
        }),
      }
    );
    if (!response.ok) {
      // Try fallback to gemini-1.5-flash
      const fallback = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hello' }] }],
          }),
        }
      );
      if (!fallback.ok) {
        const errorData = await fallback.json().catch(() => ({}));
        return {
          success: false,
          message: errorData.error?.message || 'Invalid Gemini API key or unauthorized request.',
        };
      }
    }
    return { success: true, message: 'Gemini API Key validated successfully!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error connecting to Gemini API.' };
  }
}

// Comprehensive brand training prompt
const SYSTEM_PROMPT = `
You are the official AI Luxury Beauty Concierge for "Glow with Maleeha", Pakistan's premier botanical and organic skincare brand.
Brand Tagline: "A Touch of Luxury Elegance"
Founder & CEO: Maleeha Wajahat (Cosmetic Chemist & Master Herbal Formulator).

BRAND PHILOSOPHY & KNOWLEDGE:
- Glow with Maleeha formulations are 100% steroid-free, non-comedogenic, and cruelty-free.
- Engineered specially for South Asian skin tones and Pakistan's extreme climate (harsh 45°C summer heat, high monsoonal humidity, and dry winter winds).
- Ingredients: Kashmiri pure saffron, organic Damascus rose hydrosol, 24K bio-gold flakes, multi-molecular hyaluronic acid, niacinamide (5%), cold-pressed herbal oils, licorice extract.
- All products are micro-blended in artisanal batches in Lahore to ensure maximum bioactive potency.

CATALOG & PRICING (All prices in PKR):
1. 24K Gold Hydra Infusion Serum: PKR 3,450 (Sale from 4,200). 72h moisture lock, hyaluronic acid + 24K gold flakes, perfect for winter dryness.
2. Royal Cashmere Glow Moisture Cream: PKR 3,200 (Sale from 3,800). Kashmiri saffron, shea butter & ceramides. Nourishes parched winter skin.
3. Damascus Rose Velvet Hydrosol Mist: PKR 2,450 (Sale from 2,900). Alcohol-free steam-distilled rose water toner.
4. Saffron & Licorice Radiant Face Oil: PKR 3,850 (Sale from 4,500). Lightweight brightening night nectar for pigmentation and natural glow.
5. Vitamin C Glow Renewal Elixir: PKR 2,950 (Sale from 3,500). 15% Ethyl Ascorbic Acid + Ferulic Acid.
6. Royal Bridal Radiance 30-Day Box: PKR 14,500 (Sale from 18,000). Complete Baraat and Valima bride bridal regimen.
7. Hand-Woven Cashmere Velvet Shawls (Pret): PKR 18,500.

DISCOUNT CODES:
- 'GLOW10': 10% off entire order.
- 'ELEGANCE': Flat PKR 500 off.
- Free shipping across Pakistan on orders over PKR 5,000.

LOCATIONS & CONTACT:
- Lahore Flagship: Basement Ashrafi Tower, 19 Commercial Zone Liberty Market, Gulberg III Lahore.
- Gulberg Boutique: MM Alam Road, Lahore.
- Gujranwala Studio: Model Town.
- WhatsApp Concierge: 0324 4999395 / +92 324 4999395
- Phone: 0310 1025997
- Email: sales@glowwithmaleeha.com
- Delivery: Cash on Delivery (COD), Bank Transfer (Askari Bank / Raast) all over Pakistan within 2-4 business days.

TONE & BEHAVIOR:
- Warm, polite, elegant, royal, and exceptionally knowledgeable about skincare.
- Greet with warmth ("Assalam-o-Alaikum" or "Welcome to Glow with Maleeha").
- Recommend suitable products tailored to their skin concern (dryness, dullness, bridal glow, pigmentation, oiliness).
- Mention pricing in PKR and helpful discount codes when relevant.
- Keep answers concise, helpful, and beautifully formatted with bullet points where appropriate.
`;

export async function generateGeminiReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = getGeminiApiKey();

  // If API key is available, call Gemini API
  if (apiKey) {
    try {
      // Build conversation history for Gemini
      const contents = messages
        .filter((m) => m.id !== 'welcome') // skip initial greeting from history if desired or include
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      // Try gemini-2.5-flash first, then fallback to gemini-1.5-flash
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      for (const model of models) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: SYSTEM_PROMPT }],
                },
                contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'Hello' }] }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600,
                },
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply && reply.trim()) {
              return reply.trim();
            }
          }
        } catch (innerErr) {
          console.warn(`Model ${model} call failed, trying next:`, innerErr);
        }
      }
    } catch (err) {
      console.error('Gemini API call failed, using fallback knowledge base:', err);
    }
  }

  // Fallback smart knowledge base when API key is missing or network fails
  const lastUserMsg = messages[messages.length - 1]?.text?.toLowerCase() || '';
  return getFallbackReply(lastUserMsg);
}

function getFallbackReply(query: string): string {
  if (query.includes('winter') || query.includes('dry') || query.includes('hydrate') || query.includes('serum')) {
    return (
      "For winter hydration and dry skin, our master formulator Maleeha Wajahat specifically recommends our **24K Gold Hydra Infusion Serum** (PKR 3,450) followed by the **Royal Cashmere Glow Moisture Cream** (PKR 3,200).\n\n" +
      "✨ **Why it works**: Engineered for dry Pakistani winters, this duo infuses pure multi-molecular hyaluronic acid and Kashmiri saffron to lock moisture in for 72 continuous hours without clogging pores.\n\n" +
      "Use discount code **GLOW10** for 10% off your order!"
    );
  }

  if (query.includes('bridal') || query.includes('bride') || query.includes('wedding') || query.includes('baraat') || query.includes('valima')) {
    return (
      "Assalam-o-Alaikum! Congratulations on your upcoming celebrations! 🌸\n\n" +
      "Our signature **Royal Bridal Radiance 30-Day Box** (PKR 14,500) is trusted by hundreds of Pakistani brides. It includes the complete luxury pre-wedding regimen: 24K Hydra Serum, Damascus Rose Mist, Saffron Face Oil, and Cashmere Glow Cream.\n\n" +
      "Would you like to book a bespoke bridal consultation with Maleeha in our Liberty Market flagship studio? You can reach us directly on WhatsApp at **0324 4999395**."
    );
  }

  if (query.includes('discount') || query.includes('promo') || query.includes('code') || query.includes('sale') || query.includes('offer')) {
    return (
      "We are delighted to offer exclusive VIP savings for you today:\n\n" +
      "• **GLOW10** – 10% off your entire cart.\n" +
      "• **ELEGANCE** – Flat PKR 500 off.\n" +
      "• Plus **Free Express Shipping** across Pakistan on all orders over PKR 5,000!\n\n" +
      "Enter any of these codes during checkout."
    );
  }

  if (query.includes('location') || query.includes('store') || query.includes('address') || query.includes('where') || query.includes('lahore')) {
    return (
      "You are cordially invited to visit our luxury boutiques:\n\n" +
      "📍 **Lahore Flagship Studio**: Basement Ashrafi Tower, 19 Commercial Zone Liberty Market, Gulberg III Lahore.\n" +
      "📍 **Gulberg III Boutique**: MM Alam Road, Lahore.\n" +
      "📍 **Gujranwala Studio**: Model Town.\n\n" +
      "Timings: Mon – Sat: 11:00 AM – 10:00 PM | Sun: 2:00 PM – 9:00 PM.\n" +
      "For directions or phone assistance, call **0310 1025997** or WhatsApp **0324 4999395**."
    );
  }

  if (query.includes('ceo') || query.includes('maleeha') || query.includes('founder') || query.includes('who')) {
    return (
      "**Maleeha Wajahat** is the Founder, CEO, and Master Cosmetic Chemist behind Glow with Maleeha. " +
      "With over a decade of dedicated expertise in organic botanical chemistry, she creates 100% steroid-free, dermatologically perfected formulations designed specifically for South Asian beauty.\n\n" +
      "You can read her personal message and see her official portrait on our **About Us** page!"
    );
  }

  if (query.includes('delivery') || query.includes('cod') || query.includes('shipping') || query.includes('track') || query.includes('pay')) {
    return (
      "We deliver all across Pakistan within **2 to 4 working days** via premier courier services.\n\n" +
      "• **Payment Methods**: Cash on Delivery (COD), Direct Bank Transfer (Askari Bank), and Raast.\n" +
      "• **Shipping Fee**: Standard delivery is PKR 250 (Free for orders above PKR 5,000).\n\n" +
      "To verify your payment receipt, simply share a screenshot to our WhatsApp at **0324 4999395**."
    );
  }

  return (
    "Thank you for contacting Glow with Maleeha! 🌸\n\n" +
    "Our master formulator blends pure, steroid-free botanical skincare for South Asian skin. Whether you are seeking our **24K Gold Hydra Infusion Serum**, **Royal Bridal Box**, or personalized recommendations for acne, dullness, or winter dryness, our concierge is here to assist.\n\n" +
    "You can also chat with our beauty specialists directly on WhatsApp at **0324 4999395**."
  );
}
