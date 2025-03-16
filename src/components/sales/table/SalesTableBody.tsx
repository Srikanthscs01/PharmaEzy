
import React from 'react';
import { TableBody } from '@/components/ui/table';
import { SalesItem } from '../types';
import SalesTableItem from './SalesTableItem';
import SalesTableFooter from './SalesTableFooter';
import EmptyTableRow from './EmptyTableRow';

interface SalesTableBodyProps {
  items: SalesItem[];
  onRemoveItem: (index: number) => void;
}

const SalesTableBody = ({ items, onRemoveItem }: SalesTableBodyProps) => {
  // Calculate totals for all rows
  const totals = items.reduce(
    (acc, item) => {
      return {
        qty: acc.qty + item.qty,
        free: acc.free + item.free,
        value: acc.value + item.value,
        gstAmount: acc.gstAmount + item.gstAmount,
      };
    },
    { qty: 0, free: 0, value: 0, gstAmount: 0 }
  );

  return (
    <TableBody>
      {items.length === 0 ? (
        <EmptyTableRow />
      ) : (
        <>
          {items.map((item, index) => (
            <SalesTableItem 
              key={index} 
              item={item} 
              index={index} 
              onRemoveItem={onRemoveItem} 
            />
          ))}
          
          {/* Totals row */}
          <SalesTableFooter totals={totals} />
        </>
      )}
    </TableBody>
  );
};

export default SalesTableBody;
