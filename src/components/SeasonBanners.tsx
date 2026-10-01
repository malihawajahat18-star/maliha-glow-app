import React from 'react';
import { Season } from '../types';
import {
  WINTER_BANNER_IMG,
  SUMMER_BANNER_IMG,
  BUNDLES_BANNER_IMG,
} from '../data/products';

interface SeasonBannersProps {
  onSelectSeason: (season: Season, subTag?: string) => void;
  onExplorePhilosophy: () => void;
}

export const SeasonBanners: React.FC<SeasonBannersProps> = ({
  onSelectSeason,
  onExplorePhilosophy,
}) => {
  return (
    <section
      className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16"
      data-purpose="seasonal-collections"
    >
      {/* Section Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-luxury-title tracking-wider text-gray-900 uppercase font-semibold">
          SHOP BY SEASON
        </h1>
        <div className="w-16 h-0.5 bg-maroon-800 mx-auto mt-3" />
      </div>

      {/* Top Row: 2 Major Season Cards (Winter Collection & Summer Collection) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* CARD 1: Winter Collection */}
        <article className="banner-card flex flex-col items-center">
          <div className="relative w-full h-[340px] md:h-[390px] rounded-sm overflow-hidden shadow-md group bg-gradient-to-r from-stone-900 via-stone-800 to-stone-700">
            <img
              alt="Winter Radiance Skincare & Fashion Model"
              className="banner-hover-zoom absolute inset-0 w-full h-full object-cover object-center opacity-85"
              src={WINTER_BANNER_IMG}
              referrerPolicy="no-referrer"
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            {/* Banner Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="max-w-xs pt-4">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold block mb-1">
                  Luxury Edition
                </span>
                <h2 className="text-4xl md:text-5xl font-luxury-title text-white leading-none font-bold">
                  Winter
                  <br />
                  Collection
                </h2>
                <p className="font-luxury-title text-2xl text-stone-200 mt-2 tracking-widest italic">
                  2026-27
                </p>
              </div>

              {/* Product sub-pills row inside banner */}
              <div className="w-full bg-black/50 backdrop-blur-sm border border-white/10 rounded py-2 px-3 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-white uppercase tracking-wider font-light">
                <button
                  type="button"
                  onClick={() => onSelectSeason('winter', 'Hydra Serum')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Hydra Serum
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('winter', 'Glow Cream')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Glow Cream
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('winter', 'Night Elixir')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Night Elixir
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('winter', 'Winter Wear')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Winter Wear
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Title & CTA Button */}
          <div className="text-center mt-5">
            <h3 className="font-bold text-sm tracking-wider uppercase text-gray-900 mb-3">
              WINTER COLLECTIONS
            </h3>
            <button
              onClick={() => onSelectSeason('winter')}
              type="button"
              className="inline-block bg-maroon-800 hover:bg-maroon-900 active:scale-95 text-white text-xs font-semibold uppercase tracking-widest px-8 py-2.5 rounded shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Shop now
            </button>
          </div>
        </article>

        {/* CARD 2: Summer Collection */}
        <article className="banner-card flex flex-col items-center">
          <div className="relative w-full h-[340px] md:h-[390px] rounded-sm overflow-hidden shadow-md group bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-800">
            <img
              alt="Summer Glow Essentials and Lawn"
              className="banner-hover-zoom absolute inset-0 w-full h-full object-cover object-top opacity-85"
              src={SUMMER_BANNER_IMG}
              referrerPolicy="no-referrer"
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />

            {/* Banner Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="self-end text-right max-w-xs pt-4">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold block mb-1">
                  Botanical Fresh
                </span>
                <h2 className="text-4xl md:text-5xl font-luxury-title text-white leading-none font-bold">
                  Summer
                  <br />
                  Collection
                </h2>
                <p className="font-luxury-title text-2xl text-stone-200 mt-2 tracking-widest italic">
                  2026
                </p>
              </div>

              {/* Product sub-pills row inside banner */}
              <div className="w-full bg-black/50 backdrop-blur-sm border border-white/10 rounded py-2 px-3 flex flex-wrap items-center justify-around text-[11px] sm:text-xs text-white uppercase tracking-wider font-light">
                <button
                  type="button"
                  onClick={() => onSelectSeason('summer', 'Sun Defense SPF')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Sun Defense SPF
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('summer', 'Lawn & Pret')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Lawn &amp; Pret
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('summer', 'Rose Water Mist')}
                  className="hover:text-amber-200 transition-colors cursor-pointer px-1"
                >
                  Rose Water Mist
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Title & CTA Button */}
          <div className="text-center mt-5">
            <h3 className="font-bold text-sm tracking-wider uppercase text-gray-900 mb-3">
              SUMMER COLLECTIONS
            </h3>
            <button
              onClick={() => onSelectSeason('summer')}
              type="button"
              className="inline-block bg-maroon-800 hover:bg-maroon-900 active:scale-95 text-white text-xs font-semibold uppercase tracking-widest px-8 py-2.5 rounded shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Shop now
            </button>
          </div>
        </article>
      </div>

      {/* Bottom Row: Bundles Banner & Artisanal Formulas Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARD 3: Wholesale & Bridal Bundles */}
        <article className="banner-card flex flex-col items-center">
          <div className="relative w-full h-[330px] rounded-sm overflow-hidden shadow-md group bg-stone-900">
            <img
              alt="Bridal and Wholesale Bundles"
              className="banner-hover-zoom absolute inset-0 w-full h-full object-cover object-center opacity-85"
              src={BUNDLES_BANNER_IMG}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
              <div className="max-w-xs">
                <h2 className="text-3xl sm:text-4xl font-luxury-title text-white font-bold leading-tight">
                  Exclusive
                  <br />
                  Wholesale
                  <br />
                  Bundles
                </h2>
                <p className="text-xs text-amber-200 uppercase tracking-widest font-semibold mt-2">
                  Bridal Packages &amp; Box Sets
                </p>
              </div>

              {/* Product sub-pills row inside banner */}
              <div className="w-full bg-black/55 backdrop-blur-sm border border-white/10 rounded py-2 px-3 flex items-center justify-around text-[11px] sm:text-xs text-white uppercase tracking-wider font-light">
                <button
                  type="button"
                  onClick={() => onSelectSeason('bundle', 'Bridal Glow Box')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Bridal Glow Box
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('bundle', 'Full Routine Set')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Full Routine Set
                </button>
                <span className="text-stone-500">•</span>
                <button
                  type="button"
                  onClick={() => onSelectSeason('bundle', 'Gift Hampers')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Gift Hampers
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Title & CTA Button */}
          <div className="text-center mt-5">
            <h3 className="font-bold text-sm tracking-wider uppercase text-gray-900 mb-3">
              BUNDLES
            </h3>
            <button
              onClick={() => onSelectSeason('bundle')}
              type="button"
              className="inline-block bg-maroon-800 hover:bg-maroon-900 active:scale-95 text-white text-xs font-semibold uppercase tracking-widest px-8 py-2.5 rounded shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Shop now
            </button>
          </div>
        </article>

        {/* Artisanal Formulas block */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-10 border border-dashed border-gray-300 rounded-sm bg-stone-50/70 hover:bg-cream-50 transition-colors">
          <div className="text-center max-w-sm">
            <span className="font-luxury-title text-3xl sm:text-4xl text-maroon-800 font-bold block mb-3">
              Artisanal Formulas
            </span>
            <p className="text-sm text-gray-600 leading-relaxed font-light mb-6">
              Handcrafted skincare rituals blended with premium natural actives and luxury
              formulations. Pure, effective, and tailored for Pakistani skin tones.
            </p>
            <button
              type="button"
              onClick={onExplorePhilosophy}
              className="inline-flex items-center gap-2 text-xs font-bold text-maroon-800 hover:text-maroon-900 uppercase tracking-widest group cursor-pointer"
            >
              <span>Explore Our Philosophy</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
