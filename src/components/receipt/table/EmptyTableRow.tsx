
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

const EmptyTableRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={11} className="h-32 text-center text-muted-foreground bg-teal-50">
        No bills added yet. Select a customer to see their outstanding bills.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
