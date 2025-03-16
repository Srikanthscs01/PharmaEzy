
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface PurchaseTableFooterProps {
  totals: {
    qty: number;
    free: number;
    value: number;
  };
}

const PurchaseTableFooter = ({ totals }: PurchaseTableFooterProps) => {
  return (
    <TableRow className="bg-muted/50 font-medium">
      <TableCell colSpan={5} className="py-2 text-right">Totals:</TableCell>
      <TableCell className="py-2 text-right">{totals.qty}</TableCell>
      <TableCell className="py-2 text-right">{totals.free}</TableCell>
      <TableCell className="py-2 text-right">{totals.value.toFixed(2)}</TableCell>
      <TableCell colSpan={6}></TableCell>
    </TableRow>
  );
};

export default PurchaseTableFooter;
