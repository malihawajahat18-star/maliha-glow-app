import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  ShieldCheck,
  ArrowRight,
  Quote,
  CheckCircle2,
  Settings,
  MessageCircle,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react';
import { SiteContent } from '../types';

interface AboutScreenProps {
  content: SiteContent;
  onShopCollections: () => void;
  onOpenAdmin: () => void;
  onOpenInquiry?: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  content,
  onShopCollections,
  onOpenAdmin,
  onOpenInquiry,
}) => {
  const { about } = content;
  const { ceo } = about;
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 lg:px-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Admin Quick-Access Hint */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="hover:text-maroon-800 cursor-pointer" onClick={onShopCollections}>
            Home
          </span>
          <span>/</span>
          <span className="text-gray-900 font-semibold uppercase tracking-wider">About Us</span>
        </div>

        <button
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors text-[11px] font-medium cursor-pointer shadow-xs"
          title="Manage CEO details, photo, and about page text"
        >
          <Settings className="w-3.5 h-3.5 text-amber-700" />
          <span>Admin CMS: Edit CEO &amp; Page</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-maroon-800 font-bold block mb-2">
          {about.badge || 'Heritage & Craftsmanship'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-luxury-title font-bold text-gray-900 tracking-wide uppercase">
          {about.title || 'A Touch of Luxury Elegance'}
        </h1>
        <div className="w-20 h-0.5 bg-maroon-800 mx-auto mt-3 mb-6" />
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
          {about.subtitle}
        </p>
      </div>

      {/* ================= CEO SPOTLIGHT SECTION ================= */}
      <section className="mb-20">
        <div className="relative rounded-2xl bg-gradient-to-br from-cream-50 via-white to-amber-50/40 border border-amber-200/80 shadow-md p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle decorative watermark */}
          <div className="absolute -right-8 -bottom-10 opacity-5 select-none pointer-events-none font-luxury-title text-9xl text-maroon-900 font-bold">
            GM
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* CEO Portrait Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                {/* Luxury decorative ring frame */}
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-maroon-800/30 bg-stone-100">
                  <img
                    src={ceo.imageUrl}
                    alt={ceo.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if custom URL fails to load
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-flex items-center gap-1 bg-maroon-800/90 backdrop-blur-xs text-amber-200 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full mb-1 border border-amber-300/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      Executive Leadership
                    </span>
                    <h3 className="text-lg font-bold font-luxury-title tracking-wide text-white drop-shadow-sm">
                      {ceo.name}
                    </h3>
                  </div>

                  {/* Zoom button */}
                  <button
                    onClick={() => setIsPhotoZoomed(true)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-xs transition-colors cursor-pointer"
                    aria-label="Zoom CEO photo"
                    title="Enlarge CEO portrait"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Floating Verified Seal */}
                <div className="absolute -bottom-3 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-amber-200 flex items-center gap-1.5 px-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800">
                    Official Profile
                  </span>
                </div>
              </div>

              {/* Caption under portrait */}
              <div className="mt-5 text-center">
                <span className="text-xs text-gray-500 font-medium block">
                  {ceo.socialHandle || '@glowwithmaleeha.official'}
                </span>
                <span className="text-[11px] text-maroon-800 font-semibold tracking-wider uppercase mt-0.5 block">
                  Lahore, Pakistan
                </span>
              </div>
            </div>

            {/* CEO Narrative & Quote Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-100 text-maroon-800 text-xs uppercase tracking-widest font-bold mb-3 border border-amber-200/60">
                  <span>Founder Spotlight</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-luxury-title font-bold text-gray-900 tracking-tight">
                  {ceo.name}
                </h2>
                <p className="text-maroon-800 font-semibold text-sm sm:text-base uppercase tracking-widest mt-1">
                  {ceo.title}
                </p>
                {ceo.qualifications && (
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {ceo.qualifications}
                  </p>
                )}
              </div>

              {/* Quote box */}
              <div className="relative bg-white/90 backdrop-blur-xs border-l-4 border-maroon-800 p-5 sm:p-6 rounded-r-xl shadow-xs">
                <Quote className="w-8 h-8 text-amber-500/30 absolute top-3 right-4 rotate-180" />
                <p className="text-xs sm:text-sm text-gray-700 italic font-serif leading-relaxed pr-6">
                  &ldquo;{ceo.quote}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-luxury-title text-base sm:text-lg font-bold text-maroon-900 tracking-wider block">
                      {ceo.signatureText || ceo.name}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                      Founder &amp; Master Formulator
                    </span>
                  </div>
                </div>
              </div>

              {/* Biography paragraph */}
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light space-y-3">
                <p>{ceo.bio}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {onOpenInquiry && (
                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire with Maleeha</span>
                  </button>
                )}
                <button
                  onClick={onShopCollections}
                  className="inline-flex items-center gap-2 border border-maroon-800 hover:bg-maroon-50 text-maroon-800 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded transition-all cursor-pointer"
                >
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Story Section: Formulated for our Climate */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-stone-900">
          <img
            src={about.storyImageUrl}
            alt="Artisanal Skincare Extraction"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] uppercase tracking-widest text-amber-200 font-medium block">
              {about.storyImageTag}
            </span>
            <p className="font-luxury-title text-xl font-bold">
              {about.storyImageCaption}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
          <h2 className="font-luxury-title text-2xl sm:text-3xl font-bold text-gray-900">
            {about.storyHeading}
          </h2>
          <p>{about.storyText1}</p>
          <p>{about.storyText2}</p>
          <p>{about.storyText3}</p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-800 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-maroon-800" />
              100% Steroid-Free
            </span>
            <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded border border-gray-200">
              <Award className="w-4 h-4 text-maroon-800" />
              Cruelty-Free Botanicals
            </span>
            <span className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded border border-gray-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Lahore Micro-Blended
            </span>
          </div>
        </div>
      </section>

      {/* 4 Guiding Commitments */}
      <section className="border-t border-b border-gray-200 py-12 mb-16">
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] text-maroon-800 font-bold block mb-1">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury-title font-bold text-gray-900 tracking-wide uppercase">
            Four Guiding Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {about.commitments.map((commitment) => (
            <div
              key={commitment.id || commitment.number}
              className="p-6 bg-stone-50 rounded-lg border border-gray-200/80 hover:border-maroon-800/40 transition-colors"
            >
              <span className="text-maroon-800 font-luxury-title text-3xl font-bold block mb-2">
                {commitment.number}
              </span>
              <h4 className="font-bold text-gray-900 text-sm mb-2">{commitment.title}</h4>
              <p className="text-gray-600 leading-relaxed font-light">
                {commitment.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Panel Quick Callout Footer Card */}
      <div className="bg-cream-100/70 border border-amber-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-maroon-800 block">
            Content Management Hub
          </span>
          <h4 className="font-luxury-title text-xl font-bold text-gray-900">
            Dynamically Manage Website Content &amp; CEO Profile
          </h4>
          <p className="text-xs text-gray-600 mt-1 max-w-xl">
            Update CEO Name, Photo (upload file or paste URL), founder bio, commitments, and
            announcements through the integrated Glow with Maleeha Admin Dashboard.
          </p>
        </div>
        <button
          onClick={onOpenAdmin}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded shadow cursor-pointer transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Launch Admin Panel</span>
        </button>
      </div>

      {/* Lightbox Modal for CEO Photo */}
      {isPhotoZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={ceo.imageUrl}
              alt={ceo.name}
              className="w-full max-h-[75vh] object-cover rounded-xl"
            />
            <div className="p-4 text-center">
              <h3 className="font-luxury-title text-xl font-bold text-gray-900">{ceo.name}</h3>
              <p className="text-xs text-maroon-800 uppercase tracking-widest font-semibold">
                {ceo.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
