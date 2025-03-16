
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Printer, X, Edit } from 'lucide-react';

interface ReceiptFooterProps {
  onSave: () => void;
}

const ReceiptFooter = ({ onSave }: ReceiptFooterProps) => {
  return (
    <div className="mt-4 bg-teal-700 p-4 rounded-md flex items-center justify-between text-white shadow-md">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500 font-semibold"
        >
          <Trash2 className="h-5 w-5 mr-2" /> DELETE
        </Button>
        <Button 
          variant="outline" 
          className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500 font-semibold"
        >
          <Edit className="h-5 w-5 mr-2" /> MODIFY
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500 font-semibold"
        >
          <Printer className="h-5 w-5 mr-2" /> PRINT
        </Button>
        <Button 
          onClick={onSave}
          variant="default" 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold border-yellow-700"
        >
          <Save className="h-5 w-5 mr-2" /> SAVE
        </Button>
        <Button 
          variant="default" 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold border-yellow-700"
        >
          <X className="h-5 w-5 mr-2" /> CLOSE
        </Button>
      </div>
    </div>
  );
};

export default ReceiptFooter;
