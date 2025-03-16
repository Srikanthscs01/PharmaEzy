
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Printer, X } from 'lucide-react';

interface SalesFooterProps {
  onSave: () => void;
}

const SalesFooter = ({ onSave }: SalesFooterProps) => {
  return (
    <div className="mt-4 bg-orange-100 p-4 rounded-md flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Button variant="destructive" className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500">
          <Trash2 className="h-5 w-5 mr-1" /> DELETE
        </Button>
        <Button variant="outline" className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500">
          OPTIONS
        </Button>
        <Button variant="outline" className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500">
          MODIFY
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="text-sm text-muted-foreground">
          Page: 1 of 1
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-gray-300 text-gray-800 hover:bg-gray-400 border-gray-500">
          <Printer className="h-5 w-5 mr-1" /> PRINT
        </Button>
        <Button 
          onClick={onSave}
          variant="default" 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold border-yellow-700"
        >
          <Save className="h-5 w-5 mr-1" /> SAVE
        </Button>
        <Button 
          variant="default" 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold border-yellow-700"
        >
          <X className="h-5 w-5 mr-1" /> CLOSE
        </Button>
      </div>
    </div>
  );
};

export default SalesFooter;
