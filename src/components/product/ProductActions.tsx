
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Save, Edit, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductActionsProps {
  isEditing: boolean;
  onNew: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const ProductActions = ({ isEditing, onNew, onEdit, onCancel }: ProductActionsProps) => {
  return (
    <div className="flex justify-between border-t border-cyan-100 dark:border-cyan-800/30 pt-6">
      <div className="flex gap-2">
        <Button type="button" variant="outline" className="bg-amber-100 hover:bg-amber-200 border-amber-200" onClick={() => console.log('Search clicked')}>
          <Search size={16} className="mr-1" />
          Search
        </Button>
        
        <Button type="button" variant="outline" className="bg-blue-100 hover:bg-blue-200 border-blue-200" onClick={onNew}>
          <Plus size={16} className="mr-1" />
          New
        </Button>
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button type="submit" variant="outline" className="bg-green-100 hover:bg-green-200 border-green-200">
              <Save size={16} className="mr-1" />
              Save
            </Button>
            
            <Button type="button" variant="outline" className="bg-red-100 hover:bg-red-200 border-red-200" onClick={onCancel}>
              <X size={16} className="mr-1" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button type="button" variant="outline" className="bg-yellow-100 hover:bg-yellow-200 border-yellow-200" onClick={onEdit}>
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            
            <Button type="button" variant="outline" className="bg-red-100 hover:bg-red-200 border-red-200">
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </>
        )}
        
        <Button type="button" variant="outline" onClick={() => console.log('A.Code clicked')}>
          A.Code
        </Button>
        
        <Button type="button" variant="outline" onClick={() => console.log('Close clicked')}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
