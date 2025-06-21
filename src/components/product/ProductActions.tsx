
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Edit, X, Trash2, Code, FileX } from 'lucide-react';

interface ProductActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const ProductActions = ({ 
  isEditing, 
  onEdit, 
  onCancel
}: ProductActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4">
      {/* Form Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
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
    </div>
  );
};

export default ProductActions;
