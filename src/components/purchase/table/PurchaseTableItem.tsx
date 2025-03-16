
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { PurchaseItem } from '../types';

interface PurchaseTableItemProps {
  item: PurchaseItem;
  index: number;
  onRemoveItem: (index: number) => void;
}

const PurchaseTableItem = ({ item, index, onRemoveItem }: PurchaseTableItemProps) => {
  return (
    <TableRow className="border-b">
      <TableCell className="py-2">{item.code}</TableCell>
      <TableCell className="py-2">{item.productName}</TableCell>
      <TableCell className="py-2">{item.packing}</TableCell>
      <TableCell className="py-2">{item.batchNo}</TableCell>
      <TableCell className="py-2 text-right">{item.rate.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{item.qty}</TableCell>
      <TableCell className="py-2 text-right">{item.free}</TableCell>
      <TableCell className="py-2 text-right">{item.value.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{item.month}</TableCell>
      <TableCell className="py-2 text-right">{item.year}</TableCell>
      <TableCell className="py-2 text-right">{item.marginPercentage}%</TableCell>
      <TableCell className="py-2 text-right">{item.retailMarginPercentage}%</TableCell>
      <TableCell className="py-2 text-right">{item.gstPercentage}%</TableCell>
      <TableCell className="py-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onRemoveItem(index)}
          className="h-8 w-8 text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PurchaseTableItem;
