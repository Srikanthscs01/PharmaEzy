
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PurchaseTableHeader = () => {
  return (
    <TableHeader className="bg-teal-600">
      <TableRow className="border border-gray-300">
        <TableHead className="h-8 text-white font-medium">P.Code</TableHead>
        <TableHead className="h-8 text-white font-medium">Product Name</TableHead>
        <TableHead className="h-8 text-white font-medium">Packing</TableHead>
        <TableHead className="h-8 text-white font-medium">Batch No</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Pur.Rate</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Qty</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Free</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Value</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Mon</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Year</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">Mar %</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">RetMar%</TableHead>
        <TableHead className="h-8 text-white font-medium text-right">S.Gst</TableHead>
        <TableHead className="h-8 text-white font-medium w-10"></TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PurchaseTableHeader;
