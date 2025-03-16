
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { BillItem } from './types';
import ReceiptTableHeader from './table/ReceiptTableHeader';
import EmptyTableRow from './table/EmptyTableRow';

interface ReceiptTableProps {
  items: BillItem[];
}

const ReceiptTable = ({ items }: ReceiptTableProps) => {
  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <div className="overflow-x-auto max-h-[400px]">
        <Table>
          <ReceiptTableHeader />
          <TableBody>
            {items.length === 0 ? (
              <EmptyTableRow />
            ) : (
              // We'll implement bill items here in a future step
              <EmptyTableRow />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReceiptTable;
