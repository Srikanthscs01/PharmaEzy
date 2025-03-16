
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { SalesItem } from '../types';

interface SalesTableItemProps {
  item: SalesItem;
  index: number;
  onRemoveItem: (index: number) => void;
}

const SalesTableItem = ({ item, index, onRemoveItem }: SalesTableItemProps) => {
  return (
    <TableRow className="border-b">
      <TableCell className="py-2">{index + 1}</TableCell>
      <TableCell className="py-2">{item.code}</TableCell>
      <TableCell className="py-2">{item.productName}</TableCell>
      <TableCell className="py-2">{item.packing}</TableCell>
      <TableCell className="py-2">{item.batch}</TableCell>
      <TableCell className="py-2 text-right">{item.qty}</TableCell>
      <TableCell className="py-2 text-right">{item.free}</TableCell>
      <TableCell className="py-2 text-right">{item.discount}%</TableCell>
      <TableCell className="py-2 text-right">{item.rate.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{item.value.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{item.gstPercentage}%</TableCell>
      <TableCell className="py-2 text-right">{item.gstAmount.toFixed(2)}</TableCell>
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

export default SalesTableItem;
