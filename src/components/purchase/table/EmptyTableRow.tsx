
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

const EmptyTableRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={14} className="h-32 text-center text-muted-foreground">
        No purchase items added yet. Click "Add Item" to add products to this purchase.
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
