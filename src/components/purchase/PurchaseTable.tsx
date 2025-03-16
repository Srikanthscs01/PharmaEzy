
import React from 'react';
import { Table } from '@/components/ui/table';
import { PurchaseItem } from './types';
import AddItemDialog from './table/AddItemDialog';
import PurchaseTableHeader from './table/PurchaseTableHeader';
import PurchaseTableBody from './table/PurchaseTableBody';

interface PurchaseTableProps {
  items: PurchaseItem[];
  onRemoveItem: (index: number) => void;
  onAddItem: (item: PurchaseItem) => void;
}

const PurchaseTable = ({ items, onRemoveItem, onAddItem }: PurchaseTableProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex justify-between items-center border-b">
        <h3 className="font-medium">Purchase Items</h3>
        <AddItemDialog onAddItem={onAddItem} />
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
