
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReceiptTableHeader = () => {
  return (
    <TableHeader className="bg-teal-600 text-white sticky top-0">
      <TableRow>
        <TableHead className="w-24 border-r border-teal-500">Bill No</TableHead>
        <TableHead className="w-32 border-r border-teal-500">Bill Date</TableHead>
        <TableHead className="w-32 border-r border-teal-500">Bill Dis Amt & %</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Bill Amt</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Due Amt</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Now Rcvd</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Dis Amt</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Adjust</TableHead>
        <TableHead className="w-28 border-r border-teal-500">Balance</TableHead>
        <TableHead className="w-20 border-r border-teal-500">Days</TableHead>
        <TableHead className="w-20">Int. %</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ReceiptTableHeader;
