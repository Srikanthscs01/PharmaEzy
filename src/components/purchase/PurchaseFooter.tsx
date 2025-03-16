
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Printer, XCircle, FileEdit, Trash } from 'lucide-react';

interface PurchaseFooterProps {
  onSave: () => void;
}

const PurchaseFooter = ({ onSave }: PurchaseFooterProps) => {
  return (
    <div className="mt-4 flex justify-between">
      <div className="flex gap-2">
        <Button variant="destructive" size="sm" className="gap-1">
          <Trash size={16} />
          Delete
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <FileEdit size={16} />
          Doc/Notes
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          Options
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          Modify
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" className="gap-1" onClick={onSave}>
          <Save size={16} />
          Save
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Printer size={16} />
          Print
        </Button>
        <Button variant="secondary" size="sm" className="gap-1">
          <XCircle size={16} />
          Close
        </Button>
      </div>
    </div>
  );
};

export default PurchaseFooter;
