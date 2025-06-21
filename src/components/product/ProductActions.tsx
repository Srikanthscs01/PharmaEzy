
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Save, Edit, X, Plus, Trash2, Code, FileX } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      {/* Left Side Actions */}
      <div className="flex flex-wrap gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="h-11 px-6 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-700 border-amber-200 font-medium shadow-sm" 
          onClick={() => setSearchDialogOpen(true)}
        >
          <Search size={18} className="mr-2" />
          Search Product
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="h-11 px-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border-green-200 font-medium shadow-sm" 
          onClick={onNew}
        >
          <Plus size={18} className="mr-2" />
          New Product
        </Button>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex flex-wrap gap-3">
        {isEditing ? (
          <>
            <Button 
              type="submit" 
              className="h-11 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="h-11 px-6 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-700 border-red-200 font-medium shadow-sm" 
              onClick={onCancel}
            >
              <X size={18} className="mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              type="button" 
              variant="outline" 
              className="h-11 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 border-blue-200 font-medium shadow-sm" 
              onClick={onEdit}
            >
              <Edit size={18} className="mr-2" />
              Edit Product
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="h-11 px-6 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-700 border-red-200 font-medium shadow-sm"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </Button>
          </>
        )}
        
        <Button 
          type="button" 
          variant="outline" 
          className="h-11 px-6 bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 text-purple-700 border-purple-200 font-medium shadow-sm"
          onClick={() => console.log('A.Code clicked')}
        >
          <Code size={18} className="mr-2" />
          A.Code
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          className="h-11 px-6 bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 text-slate-700 border-slate-200 font-medium shadow-sm" 
          onClick={() => console.log('Close clicked')}
        >
          <FileX size={18} className="mr-2" />
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
