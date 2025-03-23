
import React from 'react';
import { Table } from '@/components/ui/table';
import { PurchaseItem } from './types';
import AddItemDialog from './table/AddItemDialog';
import PurchaseTableHeader from './table/PurchaseTableHeader';
import PurchaseTableBody from './table/PurchaseTableBody';
import { Plus, Package } from 'lucide-react';

interface PurchaseTableProps {
  items: PurchaseItem[];
  onRemoveItem: (index: number) => void;
  onAddItem: (item: PurchaseItem) => void;
}

const PurchaseTable = ({ items, onRemoveItem, onAddItem }: PurchaseTableProps) => {
  return (
    <div className="flex flex-col h-full border border-teal-200 rounded-md overflow-hidden bg-white shadow-md">
      <div className="p-3 flex justify-between items-center border-b border-teal-200 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-teal-600" />
          <h3 className="font-medium text-gray-700">Purchase Items</h3>
        </div>
        <AddItemDialog onAddItem={onAddItem}>
          <div className="flex items-center gap-1 text-sm bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-md font-medium">
            <Plus size={16} />
            Add Item
          </div>
        </AddItemDialog>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <PurchaseTableHeader />
          <PurchaseTableBody items={items} onRemoveItem={onRemoveItem} />
        </Table>
      </div>
    </div>
  );
};

export default PurchaseTable;
