import { SiteContent } from '../types';
import { WINTER_BANNER_IMG } from './products';

export const CEO_IMAGE_PRESETS = [
  {
    id: 'preset-1',
    label: 'Executive Studio',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-2',
    label: 'Radiant Couture',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-3',
    label: 'Warm Elegance',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preset-4',
    label: 'Artisanal Atelier',
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
  },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  lastUpdated: new Date().toISOString(),
  about: {
    badge: 'Heritage & Craftsmanship',
    title: 'A Touch of Luxury Elegance',
    subtitle:
      'Glow with Maleeha was born from an unyielding conviction: that South Asian skin deserves skincare formulated with dermatological mastery and the purest organic botanicals on earth. Never compromise, never dilute, and never mass-produce.',
    storyHeading: 'Formulated Specifically for Our Climate',
    storyText1:
      'Mainstream imported skincare is often engineered for European and North American climates—failing under Pakistan’s intense ultraviolet rays, scorching 45°C summers, and dry winter winds.',
    storyText2:
      'At Glow with Maleeha, our biochemists and herbalists developed lightweight, non-comedogenic emulsions that penetrate deeply without clogging pores or melting under summer humidity.',
    storyText3:
      'Every batch of our 24K Hydra Serum, Damascus Rose Mist, and Cashmere Glow Cream is micro-blended in strictly limited quantities to preserve maximum bio-active potency.',
    storyImageUrl: WINTER_BANNER_IMG,
    storyImageTag: 'Ethical Sourcing',
    storyImageCaption: 'Pure Damascus Rose Hydrosol & Kashmiri Saffron',
    ceo: {
      name: 'Maleeha Wajahat',
      title: 'Founder & Chief Executive Officer',
      qualifications: 'Cosmetic Chemist & Master Herbal Formulator',
      bio:
        'With over a decade devoted to organic botanical chemistry and dermatological skincare formulation in Pakistan, Maleeha Wajahat founded Glow with Maleeha to craft ultra-luxurious, clinically pure remedies that honor South Asian beauty. Her passion continues to guide every small-batch formulation blended in our Lahore laboratory.',
      quote:
        'When I started Glow with Maleeha, my goal was simple: to create formulas that I would confidently put on my own daughters’ skin. Today, walking into our Liberty Market flagship and meeting generations of women whose confidence has been transformed by our craft is the deepest honor of my life.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      signatureText: 'Maleeha Wajahat',
      socialHandle: '@glowwithmaleeha.official',
    },
    commitments: [
      {
        id: 'c1',
        number: '01',
        title: 'Clinically Active Botanicals',
        description:
          'We extract active principles from mountain herbs, cold-pressed oils, and wild botanicals, free of synthetic filler liquids.',
      },
      {
        id: 'c2',
        number: '02',
        title: 'Zero Harsh Bleaching Agents',
        description:
          'We celebrate natural South Asian skin tones. Our brightening formulas use licorice, niacinamide, and saffron to bring out a translucent healthy glow.',
      },
      {
        id: 'c3',
        number: '03',
        title: 'Royal Bridal Expertise',
        description:
          'Trusted by thousands of Pakistani brides for bespoke 30-day pre-wedding regimens that ensure radiance on Baraat and Valima days.',
      },
      {
        id: 'c4',
        number: '04',
        title: 'Artisanal Couture Synergy',
        description:
          'Pairing dermatological glow with exquisite hand-woven cashmere velvet shawls and boutique lawn ensembles from Lahore.',
      },
    ],
  },
};
