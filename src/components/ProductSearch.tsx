import { useState, useEffect } from 'react';
import { searchProducts, getProductByCode, Product, ProductBatch } from '@/lib/mockData';
import SearchInput from './ui-custom/SearchInput';
import ProductBatchTable from './ProductBatchTable';
import ProductBatchDetail from './ProductBatchDetail';
import { useToast } from '@/components/ui/use-toast';
import SearchResults from './product-search/SearchResults';
import ProductHeader from './product-search/ProductHeader';
import EmptyState from './product-search/EmptyState';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<ProductBatch | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResultsList, setShowResultsList] = useState(false);
  const [recentSearches] = useState<string[]>(['006161', '007250', '008943']);
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
    setSelectedBatch(product.batches.length > 0 ? product.batches[0] : null);
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

  const handleNewSearch = () => {
    setSelectedProduct(null);
    setSelectedBatch(null);
    setSearchQuery('');
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
              isLoading={isSearching}
              className="shadow-lg"
            />
            
            {/* Search Results Dropdown */}
            <SearchResults
              searchResults={searchResults}
              debouncedQuery={debouncedQuery}
              isSearching={isSearching}
              showResultsList={showResultsList}
              onProductSelect={handleProductSelect}
            />
          </div>
        </div>
      </div>
      
      {selectedProduct ? (
        <div className="scale-in">
          {/* Product Header */}
          <ProductHeader 
            product={selectedProduct}
            onNewSearch={handleNewSearch}
          />
          
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
        <EmptyState 
          recentSearches={recentSearches}
          onProductSelect={handleProductSelect}
        />
      )}
    </div>
  );
};

export default ProductSearch;
