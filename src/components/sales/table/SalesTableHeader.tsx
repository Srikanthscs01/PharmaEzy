
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SalesTableHeader = () => {
  return (
    <TableHeader className="bg-teal-600">
      <TableRow className="border border-gray-300">
        <TableHead className="h-8 text-white font-medium">#</TableHead>
        <TableHead className="h-8 text-white font-medium">Code</TableHead>
        <TableHead className="h-8 text-white font-medium">Product Name</TableHead>
        <TableHead className="h-8 text-white font-medium">Packing</TableHead>
        <TableHead className="h-8 text-white font-medium">Batch</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Qty</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Free</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Dis %</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Rate</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Value</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">GST%</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">GST Amt</TableHead>
        <TableHead className="h-8 text-white font-medium w-10"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SalesTableHeader;
