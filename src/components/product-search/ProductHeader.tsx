
import React from 'react';
import { FileText, Package, Button } from 'lucide-react';
import { Product } from '@/lib/mockData';
import { Button as UIButton } from '@/components/ui/button';

interface ProductHeaderProps {
  product: Product;
  onNewSearch: () => void;
}

const ProductHeader = ({ product, onNewSearch }: ProductHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center">
            <span className="teal-gradient inline-block w-3 h-5 mr-2 rounded-sm"></span>
            {product.name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <FileText size={14} />
              Code: <span className="font-medium text-foreground">{product.code}</span>
            </span>
            {product.rack && (
              <span className="text-muted-foreground">
                Rack: <span className="font-medium text-foreground">{product.rack}</span>
              </span>
            )}
            <span className="text-muted-foreground flex items-center gap-1">
              <Package size={14} />
              Total Qty: <span className="font-medium text-foreground">{product.totalQty}</span>
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <UIButton
            variant="outline"
            size="sm"
            onClick={onNewSearch}
          >
            New Search
          </UIButton>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
