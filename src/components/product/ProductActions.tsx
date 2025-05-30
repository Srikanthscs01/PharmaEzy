
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Save, Edit, X, Plus, Trash2 } from 'lucide-react';
import ProductSearchDialog from './ProductSearchDialog';
import { ProductFormValues } from './types';

interface ProductActionsProps {
  isEditing: boolean;
  onNew: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSelectProduct: (productData: Partial<ProductFormValues>) => void;
}

const ProductActions = ({ 
  isEditing, 
  onNew, 
  onEdit, 
  onCancel,
  onSelectProduct
}: ProductActionsProps) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  return (
    <div className="flex justify-between border-t border-cyan-100 dark:border-cyan-800/30 pt-6">
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200" 
          onClick={() => setSearchDialogOpen(true)}
        >
          <Search size={16} className="mr-1" />
          Search
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200" 
          onClick={onNew}
        >
          <Plus size={16} className="mr-1" />
          New
        </Button>
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button 
              type="submit" 
              variant="outline" 
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              <Save size={16} className="mr-1" />
              Save
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200" 
              onClick={onCancel}
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              type="button" 
              variant="outline" 
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200" 
              onClick={onEdit}
            >
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
          onClick={() => console.log('A.Code clicked')}
        >
          A.Code
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200" 
          onClick={() => console.log('Close clicked')}
        >
          Close
        </Button>
      </div>

      <ProductSearchDialog 
        open={searchDialogOpen} 
        onOpenChange={setSearchDialogOpen}
        onSelectProduct={onSelectProduct}
      />
    </div>
  );
};

export default ProductActions;
