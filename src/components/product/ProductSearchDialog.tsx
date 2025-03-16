
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, X, ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { searchProducts, getProductByCode, Product } from '@/lib/mockData';
import { ProductFormValues } from './types';

interface ProductSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (productData: Partial<ProductFormValues>) => void;
}

const ProductSearchDialog = ({ 
  open, 
  onOpenChange,
  onSelectProduct 
}: ProductSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterBy, setFilterBy] = useState<'code' | 'name'>('code');
  const { toast } = useToast();

  // Search products when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = searchProducts(searchQuery);
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      toast({
        variant: "destructive",
        description: "Please enter a search query",
      });
      return;
    }

    const results = searchProducts(searchQuery);
    setSearchResults(results);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleConfirmSelection = () => {
    if (!selectedProduct) {
      toast({
        variant: "destructive",
        description: "Please select a product first",
      });
      return;
    }

    // Map the product to form values
    const productFormData: Partial<ProductFormValues> = {
      code: selectedProduct.code,
      name: selectedProduct.name,
      rackNo: selectedProduct.rack || '',
      // Add more mappings as needed
      packing: selectedProduct.batches.length > 0 ? selectedProduct.batches[0].type || '' : '',
    };

    onSelectProduct(productFormData);
    
    toast({
      description: `Product ${selectedProduct.name} selected`,
    });
    
    onOpenChange(false);
    setSearchQuery('');
    setSelectedProduct(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Product Selection</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Search Bar */}
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <Label htmlFor="search" className="font-medium underline mb-1 block">Typed Keys:</Label>
              <div className="flex items-center">
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter product code or name to search..."
                  className="input-field"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            
            <div className="self-end">
              <Label htmlFor="filterBy" className="font-medium underline mb-1 block">Selection On:</Label>
              <div className="flex border border-input rounded-md overflow-hidden">
                <select 
                  id="filterBy" 
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as 'code' | 'name')}
                  className="py-2 px-3 bg-background border-none focus:outline-none"
                >
                  <option value="code">Code</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Results Table */}
          <div className="border border-border rounded-md overflow-hidden">
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-cyan-50 text-left">
                    <th className="py-2 px-4 font-semibold w-8">&nbsp;</th>
                    <th className="py-2 px-4 font-semibold">Name</th>
                    <th className="py-2 px-4 font-semibold">Code</th>
                    <th className="py-2 px-4 font-semibold">Packing</th>
                    <th className="py-2 px-4 font-semibold">BillPrice</th>
                    <th className="py-2 px-4 font-semibold">MRP</th>
                    <th className="py-2 px-4 font-semibold">RackNo</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <tr 
                        key={product.code} 
                        className={`border-b hover:bg-cyan-50 cursor-pointer transition-colors ${
                          selectedProduct?.code === product.code ? 'bg-cyan-100' : ''
                        }`}
                        onClick={() => handleProductSelect(product)}
                      >
                        <td className="py-2 px-4">
                          {selectedProduct?.code === product.code && (
                            <Check size={16} className="text-green-600" />
                          )}
                        </td>
                        <td className="py-2 px-4">{product.name}</td>
                        <td className="py-2 px-4">{product.code}</td>
                        <td className="py-2 px-4">
                          {product.batches[0]?.type || '-'}
                        </td>
                        <td className="py-2 px-4">
                          {product.batches[0]?.billPrice?.toFixed(2) || '-'}
                        </td>
                        <td className="py-2 px-4">
                          {product.batches[0]?.mrp?.toFixed(2) || '-'}
                        </td>
                        <td className="py-2 px-4">{product.rack || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground">
                        {searchQuery ? "No products found" : "Enter a product code or name to search"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {searchResults.length > 0 && `${searchResults.length} results found`}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => handleSearch()}>
              Refresh
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSelection}>
              OK
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSearchDialog;
