
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { BillItem } from './types';
import ReceiptTableHeader from './table/ReceiptTableHeader';
import EmptyTableRow from './table/EmptyTableRow';
import ReceiptTableItem from './table/ReceiptTableItem';
import AddBillDialog from './table/AddBillDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ReceiptTableProps {
  items: BillItem[];
  onAddBill: (bill: BillItem) => void;
  onRemoveBill: (index: number) => void;
}

const ReceiptTable = ({ items, onAddBill, onRemoveBill }: ReceiptTableProps) => {
  return (
    <div className="bg-white rounded-md border overflow-hidden">
      <div className="p-2 bg-teal-700 text-white flex justify-between items-center">
        <h3 className="font-semibold">Bills</h3>
        <AddBillDialog onAddBill={onAddBill}>
          <Button size="sm" className="gap-1 bg-teal-600 hover:bg-teal-500">
            <Plus size={16} /> Add Bill
          </Button>
        </AddBillDialog>
      </div>
      <div className="overflow-x-auto max-h-[400px]">
        <Table>
          <ReceiptTableHeader />
          <TableBody>
            {items.length === 0 ? (
              <EmptyTableRow />
            ) : (
              items.map((bill, index) => (
                <ReceiptTableItem
                  key={index}
                  bill={bill}
                  index={index}
                  onRemoveBill={onRemoveBill}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReceiptTable;
