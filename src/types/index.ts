export type Season = 'winter' | 'summer' | 'bundle' | 'all';
export type Category = 'all' | 'skincare' | 'haircare' | 'luxury_glow' | 'bundles' | 'pret';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: Category;
  season: Season;
  subPillTag?: string; // e.g. "Hydra Serum", "Glow Cream", "Sun Defense SPF"
  price: number; // in PKR
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  ingredients: string;
  volume: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Pre-Order';
  tags: string[];
  imageUrl: string;
  isSpecialSale?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'COD' | 'BANK_TRANSFER' | 'RAAST';
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    notes?: string;
  };
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface StoreLocation {
  id: string;
  name: string;
  type: string;
  address: string;
  area: string;
  city: string;
  phone: string;
  hours: string;
  services: string[];
  isFlagship?: boolean;
}

export type ActiveScreen = 'home' | 'catalog' | 'story' | 'about' | 'bank_details' | 'locations' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  city?: string;
  address?: string;
  joinedAt: string;
  tier: 'VIP Patron' | 'Gold Tier' | 'Platinum Tier';
}

export interface CeoProfile {
  name: string;
  title: string;
  qualifications: string;
  bio: string;
  quote: string;
  imageUrl: string;
  signatureText: string;
  socialHandle?: string;
}

export interface AboutCommitment {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  badge: string;
  title: string;
  subtitle: string;
  storyHeading: string;
  storyText1: string;
  storyText2: string;
  storyText3: string;
  storyImageUrl: string;
  storyImageTag: string;
  storyImageCaption: string;
  ceo: CeoProfile;
  commitments: AboutCommitment[];
}

export interface SiteContent {
  about: AboutPageContent;
  lastUpdated?: string;
}
