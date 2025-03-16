
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightCircle } from 'lucide-react';

const ProductNavigationButtons = () => {
  return (
    <div className="flex justify-end space-x-4">
      <Button type="button" variant="outline" className="flex items-center gap-2">
        <ArrowRightCircle size={16} />
        Rates & Misc...
      </Button>
      
      <Button type="button" variant="outline" className="flex items-center gap-2">
        <ArrowRightCircle size={16} />
        Batches
      </Button>
    </div>
  );
};

export default ProductNavigationButtons;
