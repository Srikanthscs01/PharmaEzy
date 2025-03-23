
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Printer, XCircle, FileEdit, Trash, Settings } from 'lucide-react';

interface PurchaseFooterProps {
  onSave: () => void;
}

const PurchaseFooter = ({ onSave }: PurchaseFooterProps) => {
  return (
    <div className="mt-4 bg-gradient-to-b from-teal-50 to-teal-100 p-4 rounded-md flex justify-between shadow-md border border-teal-200">
      <div className="flex gap-2">
        <Button variant="destructive" size="sm" className="gap-1">
          <Trash size={16} />
          Delete
        </Button>
        <Button variant="outline" size="sm" className="gap-1 border-teal-300 bg-white text-gray-700 hover:bg-teal-100">
          <FileEdit size={16} />
          Doc/Notes
        </Button>
        <Button variant="outline" size="sm" className="gap-1 border-teal-300 bg-white text-gray-700 hover:bg-teal-100">
          <Settings size={16} />
          Options
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" className="gap-1 bg-teal-500 hover:bg-teal-600" onClick={onSave}>
          <Save size={16} />
          Save
        </Button>
        <Button variant="outline" size="sm" className="gap-1 border-teal-300 bg-white text-gray-700 hover:bg-teal-100">
          <Printer size={16} />
          Print
        </Button>
        <Button variant="secondary" size="sm" className="gap-1 bg-white hover:bg-teal-100 text-gray-700 border border-teal-300">
          <XCircle size={16} />
          Close
        </Button>
      </div>
    </div>
  );
};

export default PurchaseFooter;
