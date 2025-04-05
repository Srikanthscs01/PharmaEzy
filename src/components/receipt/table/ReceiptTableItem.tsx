
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { BillItem } from '../types';
import { format } from 'date-fns';

interface ReceiptTableItemProps {
  bill: BillItem;
  index: number;
  onRemoveBill: (index: number) => void;
}

const ReceiptTableItem = ({ bill, index, onRemoveBill }: ReceiptTableItemProps) => {
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDateForDisplay = (dateString: string) => {
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <TableRow className="border-b">
      <TableCell className="py-2">{index + 1}</TableCell>
      <TableCell className="py-2">{bill.billNo}</TableCell>
      <TableCell className="py-2">{formatDateForDisplay(bill.billDate)}</TableCell>
      <TableCell className="py-2">{bill.billDisAmtAndPercent}</TableCell>
      <TableCell className="py-2 text-right">{bill.billAmount.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.dueAmount.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.nowReceived.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.discountAmount.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.adjustment.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.balance.toFixed(2)}</TableCell>
      <TableCell className="py-2 text-right">{bill.days}</TableCell>
      <TableCell className="py-2 text-right">{bill.interest.toFixed(2)}</TableCell>
      <TableCell className="py-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onRemoveBill(index)}
          className="h-8 w-8 text-destructive"
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ReceiptTableItem;
