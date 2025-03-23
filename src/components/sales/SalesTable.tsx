
import React from 'react';
import { Table } from '@/components/ui/table';
import { SalesItem } from './types';
import AddItemDialog from './table/AddItemDialog';
import SalesTableHeader from './table/SalesTableHeader';
import SalesTableBody from './table/SalesTableBody';
import { Plus, ShoppingCart } from 'lucide-react';

interface SalesTableProps {
  items: SalesItem[];
  onRemoveItem: (index: number) => void;
  onAddItem: (item: SalesItem) => void;
}

const SalesTable = ({ items, onRemoveItem, onAddItem }: SalesTableProps) => {
  return (
    <div className="flex flex-col h-full border border-orange-200 rounded-md overflow-hidden bg-white shadow-md">
      <div className="p-3 flex justify-between items-center border-b border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} className="text-orange-600" />
          <h3 className="font-medium text-gray-700">Sales Items</h3>
        </div>
        <AddItemDialog onAddItem={onAddItem}>
          <div className="flex items-center gap-1 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium">
            <Plus size={16} />
            Add Item
          </div>
        </AddItemDialog>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <SalesTableHeader />
          <SalesTableBody items={items} onRemoveItem={onRemoveItem} />
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;
