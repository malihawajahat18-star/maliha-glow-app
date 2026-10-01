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

export type ActiveScreen = 'home' | 'catalog' | 'story' | 'bank_details' | 'locations';

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
