
import React from 'react';
import { Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductByCode } from '@/lib/mockData';

interface EmptyStateProps {
  recentSearches: string[];
  onProductSelect: (product: any) => void;
}

const EmptyState = ({ recentSearches, onProductSelect }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 max-w-xl mx-auto">
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Package size={28} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Search for Products</h2>
        <p className="text-muted-foreground">
          Enter a product code or name to search for batches and inventory details.
        </p>
      </div>
      
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center justify-center gap-1">
            <Clock size={14} />
            Recent Searches
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {recentSearches.map((code) => {
              const product = getProductByCode(code);
              return (
                <Button 
                  key={code} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => product && onProductSelect(product)}
                >
                  {code}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl p-5 bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-border shadow-md">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-primary font-bold">{i + 1}</span>
            </div>
            <h3 className="text-sm font-medium mb-1">
              {i === 0 ? "Search product" : i === 1 ? "Select from results" : "View batch details"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {i === 0 
                ? "Enter a product code or name in the search bar above" 
                : i === 1 
                ? "Choose the product from the search results list" 
                : "Select a batch to view detailed information about inventory"
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
