
import React from 'react';
import { cn } from '@/lib/utils';
import { Package, ArrowRight, Search } from 'lucide-react';
import { Product } from '@/lib/mockData';

interface SearchResultsProps {
  searchResults: Product[];
  debouncedQuery: string;
  isSearching: boolean;
  showResultsList: boolean;
  onProductSelect: (product: Product) => void;
}

const SearchResults = ({ 
  searchResults, 
  debouncedQuery, 
  isSearching, 
  showResultsList,
  onProductSelect 
}: SearchResultsProps) => {
  if (!showResultsList) return null;

  if (searchResults.length > 0) {
    return (
      <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-white/90 backdrop-blur-md shadow-xl dark:bg-gray-800/90 overflow-hidden transition-all duration-300 scale-in">
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground p-2">
            Products ({searchResults.length})
          </div>
          <div className="max-h-64 overflow-y-auto">
            {searchResults.map((product, index) => (
              <button
                key={product.code}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2",
                  "transition-colors hover:bg-primary/10 focus:bg-primary/10 focus:outline-none",
                  "fade-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => onProductSelect(product)}
              >
                <Package size={16} className="text-primary shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground">Code: {product.code} • Qty: {product.totalQty}</div>
                </div>
                <ArrowRight size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (searchResults.length === 0 && !isSearching) {
    return (
      <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-white/90 backdrop-blur-md shadow-xl dark:bg-gray-800/90 overflow-hidden">
        <div className="p-6 text-center">
          <Search className="mx-auto mb-2 text-muted-foreground" size={20} />
          <div className="text-sm text-muted-foreground">
            No products found for "{debouncedQuery}"
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SearchResults;
