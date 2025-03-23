
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Printer, XCircle, FileEdit, Settings } from 'lucide-react';

interface SalesFooterProps {
  onSave: () => void;
}

const SalesFooter = ({ onSave }: SalesFooterProps) => {
  return (
    <div className="mt-4 bg-gradient-to-b from-orange-50 to-orange-100 p-4 rounded-md flex items-center justify-between shadow-md border border-orange-200">
      <div className="flex items-center gap-2">
        <Button variant="destructive" size="sm" className="gap-1">
          <Trash2 size={16} />
          Delete
        </Button>
        <Button variant="outline" size="sm" className="gap-1 border-orange-300 bg-white text-gray-700 hover:bg-orange-100">
          <Settings size={16} />
          Options
        </Button>
        <Button variant="outline" size="sm" className="gap-1 border-orange-300 bg-white text-gray-700 hover:bg-orange-100">
          <FileEdit size={16} />
          Modify
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="text-sm text-gray-500 mr-4">
          Page: 1 of 1
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1 border-orange-300 bg-white text-gray-700 hover:bg-orange-100">
          <Printer size={16} />
          Print
        </Button>
        <Button 
          onClick={onSave}
          variant="default" 
          size="sm"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium gap-1"
        >
          <Save size={16} />
          Save
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-orange-300 bg-white text-gray-700 hover:bg-orange-100 gap-1"
        >
          <XCircle size={16} />
          Close
        </Button>
      </div>
    </div>
  );
};

export default SalesFooter;
