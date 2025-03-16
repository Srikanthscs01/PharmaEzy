
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

const EmptyTableRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={12} className="h-24 text-center text-muted-foreground">
        No items added to this sale yet.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
