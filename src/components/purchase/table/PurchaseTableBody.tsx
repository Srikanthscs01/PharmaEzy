
import React from 'react';
import { TableBody } from '@/components/ui/table';
import { PurchaseItem } from '../types';
import PurchaseTableItem from './PurchaseTableItem';
import PurchaseTableFooter from './PurchaseTableFooter';
import EmptyTableRow from './EmptyTableRow';

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  onRemoveItem: (index: number) => void;
}

const PurchaseTableBody = ({ items, onRemoveItem }: PurchaseTableBodyProps) => {
  // Calculate totals for all rows
  const totals = items.reduce(
    (acc, item) => {
      return {
        qty: acc.qty + item.qty,
        free: acc.free + item.free,
        value: acc.value + item.value,
      };
    },
    { qty: 0, free: 0, value: 0 }
  );

  return (
    <TableBody>
      {items.length === 0 ? (
        <EmptyTableRow />
      ) : (
        <>
          {items.map((item, index) => (
            <PurchaseTableItem 
              key={index} 
              item={item} 
              index={index} 
              onRemoveItem={onRemoveItem} 
            />
          ))}
          
          {/* Totals row */}
          <PurchaseTableFooter totals={totals} />
        </>
      )}
    </TableBody>
  );
};

export default PurchaseTableBody;
