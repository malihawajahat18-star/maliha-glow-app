/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, ActiveScreen, Season, Category, UserProfile } from './types';
import { PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { SeasonBanners } from './components/SeasonBanners';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ProductCatalog } from './components/ProductCatalog';
import { OurStoryScreen } from './components/OurStoryScreen';
import { BankDetailsScreen } from './components/BankDetailsScreen';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { LocationsModal } from './components/LocationsModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { InquiryModal } from './components/InquiryModal';
import { AuthGate } from './components/AuthGate';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [catalogFilters, setCatalogFilters] = useState<{
    season?: Season;
    category?: Category;
    subTag?: string;
    isSpecialSale?: boolean;
    isNewArrival?: boolean;
  }>({
    season: 'all',
    category: 'all',
  });

  // Cart & Wishlist state with local persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gwm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('gwm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gwm_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePolicyKey, setActivePolicyKey] = useState<string | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('gwm_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isGuest, setIsGuest] = useState(false);

  // Persist state
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('gwm_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('gwm_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('gwm_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gwm_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('gwm_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Discount code handler
  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.toUpperCase().trim();
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (clean === 'GLOW10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountCode('GLOW10 (10% OFF)');
      setDiscountAmount(discount);
      return true;
    }
    if (clean === 'ELEGANCE') {
      const discount = Math.min(500, subtotal);
      setDiscountCode('ELEGANCE (PKR 500 OFF)');
      setDiscountAmount(discount);
      return true;
    }
    return false;
  };

  const handleRemoveDiscount = () => {
    setDiscountCode('');
    setDiscountAmount(0);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Seasonal banner actions
  const handleSelectSeason = (season: Season, subTag?: string) => {
    // If a sub-pill tag was clicked (e.g. "Hydra Serum", "Sun Defense SPF", "Bridal Glow Box"),
    // find the matching product or filter catalog
    if (subTag) {
      const matched = PRODUCTS.find((p) => p.subPillTag === subTag);
      if (matched) {
        setQuickViewProduct(matched);
        return;
      }
    }

    setCatalogFilters({
      season,
      category: 'all',
      subTag,
      isSpecialSale: false,
      isNewArrival: false,
    });
    setActiveScreen('catalog');
  };

  const handleFilterCategory = (
    category: Category,
    season: Season = 'all',
    isSpecialSale = false,
    isNewArrival = false
  ) => {
    setCatalogFilters({
      category,
      season,
      subTag: undefined,
      isSpecialSale,
      isNewArrival,
    });
    setActiveScreen('catalog');
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    handleRemoveDiscount();
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white text-gray-800 antialiased min-h-screen flex flex-col font-sans selection:bg-amber-100 selection:text-maroon-900">
      {/* 0. VIP Authentication Gate */}
      {!currentUser && !isGuest && (
        <AuthGate
          onAuthenticate={(user) => {
            setCurrentUser(user);
            setIsGuest(false);
          }}
          onContinueAsGuest={() => setIsGuest(true)}
        />
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Luxury Header */}
      <Header
        currentUser={currentUser}
        activeScreen={activeScreen}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onNavigate={(screen) => setActiveScreen(screen)}
        onFilterCategory={handleFilterCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Main Screen Router */}
      <main className="flex-grow">
        {activeScreen === 'home' && (
          <>
            {/* SHOP BY SEASON - Exact match to reference screenshot & HTML */}
            <SeasonBanners
              onSelectSeason={handleSelectSeason}
              onExplorePhilosophy={() => setActiveScreen('story')}
            />

            {/* HAVE A QUESTION? - Exact match to reference FAQ accordion */}
            <FAQSection />
          </>
        )}

        {activeScreen === 'catalog' && (
          <ProductCatalog
            key={`${catalogFilters.season}-${catalogFilters.category}-${catalogFilters.subTag}-${catalogFilters.isSpecialSale}`}
            initialSeason={catalogFilters.season}
            initialCategory={catalogFilters.category}
            initialSubTag={catalogFilters.subTag}
            initialSpecialSale={catalogFilters.isSpecialSale}
            initialNewArrival={catalogFilters.isNewArrival}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={isWishlisted}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activeScreen === 'story' && (
          <OurStoryScreen
            onShopCollections={() => {
              setCatalogFilters({ season: 'all', category: 'all' });
              setActiveScreen('catalog');
            }}
          />
        )}

        {activeScreen === 'bank_details' && <BankDetailsScreen />}
      </main>

      {/* 4. Luxury Footer - Exact match to reference */}
      <Footer
        onOpenLocation={(locId) => {
          setSelectedLocationId(locId);
          setIsLocationsOpen(true);
        }}
        onOpenPolicy={(policy) => setActivePolicyKey(policy)}
        onNavigateToBank={() => setActiveScreen('bank_details')}
      />

      {/* 5. Floating Actions: VIP Consultation + WhatsApp */}
      <FloatingWhatsApp onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* 6. Drawers & Modals */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        discountAmount={discountAmount}
        onApplyDiscount={handleApplyDiscount}
        onRemoveDiscount={handleRemoveDiscount}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={(id) => handleToggleWishlist({ id } as Product)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
      />

      <LocationsModal
        isOpen={isLocationsOpen}
        onClose={() => setIsLocationsOpen(false)}
        selectedLocationId={selectedLocationId}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        currentUser={currentUser}
        onSignOut={() => {
          setCurrentUser(null);
          setIsGuest(false);
          setIsAccountOpen(false);
        }}
        orders={orders}
        onUpdateUser={(updated) => setCurrentUser(updated)}
      />

      <PolicyModal
        isOpen={activePolicyKey !== null}
        onClose={() => setActivePolicyKey(null)}
        policyKey={activePolicyKey || 'shipping'}
      />
    </div>
  );
}
