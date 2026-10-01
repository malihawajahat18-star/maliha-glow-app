import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Search, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  'Hydra Serum',
  'Bridal Glow Box',
  'Sun Defense SPF',
  'Rose Water Mist',
  'Glow Cream',
  'Night Elixir',
  'Winter Wear',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.subPillTag && p.subPillTag.toLowerCase().includes(q)) ||
        p.ingredients.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-maroon-800" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skincare rituals, winter wear, bridal boxes..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {query.trim() === '' ? (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-3">
                Trending Searches in Pakistan
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-cream-50 hover:bg-cream-100 text-stone-800 border border-amber-200/60 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No products found matching &ldquo;{query}&rdquo;. Try searching for &ldquo;Serum&rdquo;, &ldquo;Cream&rdquo;, or &ldquo;Bridal&rdquo;.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Found {searchResults.length} Products
              </span>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-stone-50 p-2 rounded cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded bg-stone-100 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-luxury-title font-semibold text-sm text-gray-900 leading-tight">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                        <span>{product.volume}</span>
                        <span>•</span>
                        <span className="text-amber-700 font-medium">
                          PKR {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
