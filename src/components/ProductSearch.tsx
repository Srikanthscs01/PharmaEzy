import { useState, useEffect } from 'react';
import { searchProducts, getProductByCode, Product, ProductBatch } from '@/lib/mockData';
import SearchInput from './ui-custom/SearchInput';
import ProductBatchTable from './ProductBatchTable';
import ProductBatchDetail from './ProductBatchDetail';
import { cn } from '@/lib/utils';
import { Package, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<ProductBatch | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResultsList, setShowResultsList] = useState(false);
  const { toast } = useToast();

  // Handle debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setSearchResults([]);
      setShowResultsList(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = searchProducts(debouncedQuery);
      setSearchResults(results);
      setShowResultsList(true);
      setIsSearching(false);
    }, 300);
  }, [debouncedQuery]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedBatch(null);
    setShowResultsList(false);
    setSearchQuery(product.code + ' - ' + product.name);
    
    toast({
      title: "Product Selected",
      description: `${product.code} - ${product.name}`,
      duration: 3000,
    });
  };

  const handleBatchSelect = (batch: ProductBatch) => {
    setSelectedBatch(batch);
    
    toast({
      title: "Batch Selected",
      description: `Batch ${batch.batchNo}`,
      duration: 3000,
    });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') return;
    
    // Try to find by product code first
    const codeMatch = searchQuery.match(/^(\d+)/);
    if (codeMatch) {
      const product = getProductByCode(codeMatch[1]);
      if (product) {
        handleProductSelect(product);
        return;
      }
    }
    
    // Otherwise search as normal
    const results = searchProducts(searchQuery);
    setSearchResults(results);
    setShowResultsList(true);
    
    if (results.length === 1) {
      handleProductSelect(results[0]);
    }
  };

  return (
    <div className="w-full">
      {/* Search Header */}
      <div className="mb-8 flex flex-col items-center relative">
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <SearchInput
              placeholder="Search product by code or name..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearchSubmit}
              autoFocus
              className="shadow-md"
            />
            
            {/* Search Results Dropdown */}
            {showResultsList && searchResults.length > 0 && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-800/90 overflow-hidden transition-all duration-300 scale-in">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground p-2">
                    Products
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.map((product, index) => (
                      <button
                        key={product.code}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg flex items-center gap-2",
                          "transition-colors hover:bg-primary/10 focus:bg-primary/10 focus:outline-none",
                          "fade-up"
                        )}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => handleProductSelect(product)}
                      >
                        <Package size={16} className="text-primary shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">Code: {product.code}</div>
                        </div>
                        <ArrowRight size={14} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {showResultsList && searchResults.length === 0 && !isSearching && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-border bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-800/90 overflow-hidden">
                <div className="p-6 text-center">
                  <Search className="mx-auto mb-2 text-muted-foreground" size={20} />
                  <div className="text-sm text-muted-foreground">
                    No products found for "{debouncedQuery}"
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {selectedProduct ? (
        <div className="scale-in">
          {/* Product Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1 flex items-center">
                  <span className="teal-gradient inline-block w-3 h-5 mr-2 rounded-sm"></span>
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-muted-foreground">
                    Code: <span className="font-medium text-foreground">{selectedProduct.code}</span>
                  </span>
                  {selectedProduct.rack && (
                    <span className="text-sm text-muted-foreground">
                      Rack: <span className="font-medium text-foreground">{selectedProduct.rack}</span>
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Total Qty: <span className="font-medium text-foreground">{selectedProduct.totalQty}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedBatch(null);
                    setSearchQuery('');
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Batches Table */}
            <div className="lg:col-span-7">
              <ProductBatchTable 
                batches={selectedProduct.batches}
                onSelectBatch={handleBatchSelect}
                selectedBatchNo={selectedBatch?.batchNo}
              />
            </div>
            
            {/* Batch Details */}
            <div className="lg:col-span-5">
              <ProductBatchDetail batch={selectedBatch} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 max-w-lg mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Search for Products</h2>
            <p className="text-muted-foreground">
              Enter a product code or name to search for batches.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl p-4 bg-white/50 dark:bg-gray-900/40 backdrop-blur-sm border border-border">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">{i + 1}</span>
                </div>
                <h3 className="text-sm font-medium mb-1">
                  {i === 0 ? "Search product" : i === 1 ? "Select from results" : "View batch details"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {i === 0 
                    ? "Enter a product code or name in the search bar" 
                    : i === 1 
                    ? "Choose the product from the search results" 
                    : "Select a batch to view detailed information"
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
