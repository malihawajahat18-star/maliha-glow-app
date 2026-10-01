import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { WINTER_BANNER_IMG, SUMMER_BANNER_IMG } from '../data/products';

interface OurStoryScreenProps {
  onShopCollections: () => void;
}

export const OurStoryScreen: React.FC<OurStoryScreenProps> = ({ onShopCollections }) => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-maroon-800 font-semibold block mb-2">
          Heritage &amp; Craftsmanship
        </span>
        <h1 className="text-3xl sm:text-5xl font-luxury-title font-bold text-gray-900 tracking-wide uppercase">
          A Touch of Luxury Elegance
        </h1>
        <div className="w-16 h-0.5 bg-maroon-800 mx-auto mt-3 mb-6" />
        <p className="text-sm text-gray-600 leading-relaxed font-light">
          Glow with Maleeha was born from an unyielding conviction: that South Asian skin deserves
          skincare formulated with dermatological mastery and the purest organic botanicals on earth.
          Never compromise, never dilute, and never mass-produce.
        </p>
      </div>

      {/* Split Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative rounded-sm overflow-hidden shadow-lg aspect-[4/3] bg-stone-900">
          <img
            src={WINTER_BANNER_IMG}
            alt="Artisanal Skincare Extraction"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-widest text-amber-200 font-medium block">
              Ethical Sourcing
            </span>
            <p className="font-luxury-title text-xl font-bold">
              Pure Damascus Rose Hydrosol &amp; Kashmiri Saffron
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
          <h2 className="font-luxury-title text-2xl sm:text-3xl font-bold text-gray-900">
            Formulated Specifically for Our Climate
          </h2>
          <p>
            Mainstream imported skincare is often engineered for European and North American
            climates—failing under Pakistan&apos;s intense ultraviolet rays, scorching 45°C summers,
            and dry winter winds.
          </p>
          <p>
            At Glow with Maleeha, our biochemists and herbalists developed lightweight, non-comedogenic
            emulsions that penetrate deeply without clogging pores or melting under summer humidity.
          </p>
          <p>
            Every batch of our 24K Hydra Serum, Damascus Rose Mist, and Cashmere Glow Cream is micro-blended
            in strictly limited quantities to preserve maximum bio-active potency.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-maroon-800" />
              100% Steroid-Free
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-maroon-800" />
              Cruelty-Free
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="border-t border-b border-gray-200 py-12 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-gray-900 tracking-wide uppercase">
            Our Four Guiding Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="p-6 bg-stone-50 rounded border border-gray-200/80">
            <span className="text-maroon-800 font-luxury-title text-3xl font-bold block mb-2">01</span>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Clinically Active Botanicals</h4>
            <p className="text-gray-600 leading-relaxed font-light">
              We extract active principles from mountain herbs, cold-pressed oils, and wild botanicals,
              free of synthetic filler liquids.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded border border-gray-200/80">
            <span className="text-maroon-800 font-luxury-title text-3xl font-bold block mb-2">02</span>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Zero Harsh Bleaching Agents</h4>
            <p className="text-gray-600 leading-relaxed font-light">
              We celebrate natural South Asian skin tones. Our brightening formulas use licorice, niacinamide,
              and saffron to bring out a translucent healthy glow.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded border border-gray-200/80">
            <span className="text-maroon-800 font-luxury-title text-3xl font-bold block mb-2">03</span>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Royal Bridal Expertise</h4>
            <p className="text-gray-600 leading-relaxed font-light">
              Trusted by thousands of Pakistani brides for bespoke 30-day pre-wedding regimens that ensure
              radiance on Baraat and Valima days.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded border border-gray-200/80">
            <span className="text-maroon-800 font-luxury-title text-3xl font-bold block mb-2">04</span>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Artisanal Couture Synergy</h4>
            <p className="text-gray-600 leading-relaxed font-light">
              Pairing dermatological glow with exquisite hand-woven cashmere velvet shawls and boutique
              lawn ensembles from Lahore.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Letter Box */}
      <div className="bg-cream-50 border border-amber-200/70 rounded-lg p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
        <div className="w-14 h-14 rounded-full border border-maroon-800 mx-auto mb-4 flex items-center justify-center bg-white shadow">
          <span className="font-luxury-title text-2xl text-maroon-800 font-bold">GM</span>
        </div>
        <h3 className="font-luxury-title text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          A Message from Maleeha
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed mb-6 font-serif">
          &ldquo;When I started Glow with Maleeha, my goal was simple: to create formulas that I would
          confidently put on my own daughters&apos; skin. Today, walking into our Liberty Market flagship
          and meeting generations of women whose confidence has been transformed by our craft is the
          deepest honor of my life.&rdquo;
        </p>
        <span className="font-luxury-title text-lg font-bold text-maroon-800 block tracking-wider">
          MALEEHA WAJAHAT
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">
          Founder &amp; Master Formulator
        </span>

        <div className="mt-8">
          <button
            onClick={onShopCollections}
            className="inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-widest px-8 py-3 rounded shadow transition-all cursor-pointer"
          >
            <span>Explore Seasonal Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
