
import React from 'react';
import { Table } from '@/components/ui/table';
import { SalesItem } from './types';
import AddItemDialog from './table/AddItemDialog';
import SalesTableHeader from './table/SalesTableHeader';
import SalesTableBody from './table/SalesTableBody';

interface SalesTableProps {
  items: SalesItem[];
  onRemoveItem: (index: number) => void;
  onAddItem: (item: SalesItem) => void;
}

const SalesTable = ({ items, onRemoveItem, onAddItem }: SalesTableProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex justify-between items-center border-b">
        <h3 className="font-medium">Sale Items</h3>
        <AddItemDialog onAddItem={onAddItem} />
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
