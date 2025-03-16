
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

interface SalesTableFooterProps {
  totals: {
    qty: number;
    free: number;
    value: number;
    gstAmount: number;
  };
}

const SalesTableFooter = ({ totals }: SalesTableFooterProps) => {
  return (
    <TableRow className="bg-muted/50 font-medium">
      <TableCell colSpan={5} className="py-2 text-right">Totals:</TableCell>
      <TableCell className="py-2 text-right">{totals.qty}</TableCell>
      <TableCell className="py-2 text-right">{totals.free}</TableCell>
      <TableCell className="py-2"></TableCell>
      <TableCell className="py-2"></TableCell>
      <TableCell className="py-2 text-right">{totals.value.toFixed(2)}</TableCell>
      <TableCell className="py-2"></TableCell>
      <TableCell className="py-2 text-right">{totals.gstAmount.toFixed(2)}</TableCell>
      <TableCell className="py-2"></TableCell>
    </TableRow>
  );
};

export default SalesTableFooter;
