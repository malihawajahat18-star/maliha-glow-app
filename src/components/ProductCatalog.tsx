import React, { useState, useMemo } from 'react';
import { Product, Season, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { Heart, Eye, ShoppingBag, SlidersHorizontal, Check } from 'lucide-react';

interface ProductCatalogProps {
  initialSeason?: Season;
  initialCategory?: Category;
  initialSubTag?: string;
  initialSpecialSale?: boolean;
  initialNewArrival?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialSeason = 'all',
  initialCategory = 'all',
  initialSubTag,
  initialSpecialSale = false,
  initialNewArrival = false,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>(initialSeason);
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedSubTag, setSelectedSubTag] = useState<string | undefined>(initialSubTag);
  const [onlySale, setOnlySale] = useState<boolean>(initialSpecialSale);
  const [onlyNew, setOnlyNew] = useState<boolean>(initialNewArrival);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedSeason !== 'all' && item.season !== selectedSeason && item.season !== 'all') {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedSubTag && item.subPillTag !== selectedSubTag) {
        return false;
      }
      if (onlySale && !item.isSpecialSale) {
        return false;
      }
      if (onlyNew && !item.isNewArrival) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedSeason, selectedCategory, selectedSubTag, onlySale, onlyNew, sortBy]);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedNoticeId(product.id);
    setTimeout(() => {
      setAddedNoticeId((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Header & Breadcrumb */}
      <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-maroon-800 font-semibold block mb-1">
            Official E-Boutique
          </span>
          <h1 className="text-3xl sm:text-4xl font-luxury-title font-bold text-gray-900 tracking-wide uppercase">
            {selectedSubTag
              ? `${selectedSubTag} Editions`
              : selectedSeason === 'winter'
              ? 'Winter Collection 2026-27'
              : selectedSeason === 'summer'
              ? 'Summer Botanical Collection'
              : selectedSeason === 'bundle'
              ? 'Wholesale & Bridal Bundles'
              : onlySale
              ? 'Special Luxury Sale'
              : 'All Formulations & Collections'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing {filteredProducts.length} handcrafted luxury beauty &amp; couture items
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="catalog-sort" className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Sort by:
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium border border-gray-300 rounded px-2.5 py-1.5 bg-white text-gray-800 focus:outline-none focus:border-maroon-800"
          >
            <option value="featured">Featured / Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-stone-50 border border-gray-200 rounded p-3 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Season:
          </span>
          <button
            onClick={() => {
              setSelectedSeason('all');
              setSelectedSubTag(undefined);
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              selectedSeason === 'all' && !selectedSubTag
                ? 'bg-maroon-800 text-white font-medium shadow-sm'
                : 'text-gray-700 hover:bg-stone-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setSelectedSeason('winter');
              setSelectedSubTag(undefined);
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              selectedSeason === 'winter' && !selectedSubTag
                ? 'bg-maroon-800 text-white font-medium shadow-sm'
                : 'text-gray-700 hover:bg-stone-200'
            }`}
          >
            Winter
          </button>
          <button
            onClick={() => {
              setSelectedSeason('summer');
              setSelectedSubTag(undefined);
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              selectedSeason === 'summer' && !selectedSubTag
                ? 'bg-maroon-800 text-white font-medium shadow-sm'
                : 'text-gray-700 hover:bg-stone-200'
            }`}
          >
            Summer
          </button>
          <button
            onClick={() => {
              setSelectedSeason('bundle');
              setSelectedSubTag(undefined);
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              selectedSeason === 'bundle' && !selectedSubTag
                ? 'bg-maroon-800 text-white font-medium shadow-sm'
                : 'text-gray-700 hover:bg-stone-200'
            }`}
          >
            Bundles
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedSubTag && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[11px] font-medium">
              Tag: {selectedSubTag}
              <button
                onClick={() => setSelectedSubTag(undefined)}
                className="text-amber-800 hover:text-red-700 font-bold ml-1"
              >
                ×
              </button>
            </span>
          )}

          <button
            onClick={() => setOnlySale(!onlySale)}
            className={`px-2.5 py-1 rounded border transition-colors cursor-pointer text-[11px] font-semibold tracking-wider uppercase ${
              onlySale
                ? 'bg-maroon-800 text-white border-maroon-800'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            Special Sale Only
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-gray-300 rounded p-8">
          <p className="font-luxury-title text-2xl text-gray-700 mb-2">No matching products found</p>
          <p className="text-xs text-gray-500 mb-4">Try clearing active filters to browse the full catalog.</p>
          <button
            onClick={() => {
              setSelectedSeason('all');
              setSelectedCategory('all');
              setSelectedSubTag(undefined);
              setOnlySale(false);
              setOnlyNew(false);
            }}
            className="bg-maroon-800 text-white text-xs font-semibold px-5 py-2 rounded hover:bg-maroon-900"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const wish = isWishlisted(product.id);
            const isAdded = addedNoticeId === product.id;

            return (
              <article
                key={product.id}
                className="group flex flex-col bg-white border border-gray-200/80 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden cursor-pointer">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                    onClick={() => onQuickView(product)}
                  />

                  {/* Gradient Scrim for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.subPillTag && (
                      <span className="bg-black/60 backdrop-blur-sm text-amber-200 text-[10px] tracking-wider uppercase px-2 py-0.5 rounded font-medium border border-amber-200/20">
                        {product.subPillTag}
                      </span>
                    )}
                    {product.isSpecialSale && (
                      <span className="bg-maroon-800 text-white text-[10px] tracking-widest uppercase px-2 py-0.5 rounded font-bold shadow">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow transition-all cursor-pointer focus:outline-none"
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wish ? 'fill-maroon-800 text-maroon-800' : 'text-gray-700'
                      }`}
                    />
                  </button>

                  {/* Quick View Button overlay on hover */}
                  <button
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-gray-900 text-xs font-semibold px-4 py-1.5 rounded shadow flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-maroon-800" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="uppercase tracking-wider text-[10px] font-medium">
                        {product.category.replace('_', ' ')}
                      </span>
                      <span className="text-amber-600 font-medium">
                        ★ {product.rating.toFixed(1)} ({product.reviewsCount})
                      </span>
                    </div>

                    <h2
                      onClick={() => onQuickView(product)}
                      className="font-luxury-title font-bold text-lg text-gray-900 hover:text-maroon-800 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h2>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="block text-xs text-gray-400 font-normal">Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-base text-gray-900 font-mono tabular-nums">
                          PKR {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-mono tabular-nums">
                            PKR {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-maroon-800 hover:bg-maroon-900 active:scale-95 text-white shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
