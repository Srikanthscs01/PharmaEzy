import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SalesItem } from './types';

interface SalesSummaryProps {
  items: SalesItem[];
}

const SalesSummary = ({ items }: SalesSummaryProps) => {
  // Calculate GST amounts by percentage
  const gstBreakdown = items.reduce((acc, item) => {
    const percentage = item.gstPercentage;
    if (!acc[percentage]) {
      acc[percentage] = {
        value: 0,
        gst: 0
      };
    }
    acc[percentage].value += item.value;
    acc[percentage].gst += item.gstAmount;
    return acc;
  }, {} as Record<number, { value: number, gst: number }>);

  // Total calculation
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const totalGST = items.reduce((sum, item) => sum + item.gstAmount, 0);
  const netAmount = totalValue + totalGST;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-orange-100 p-4 rounded-md shadow-md">
      {/* GST Breakdown - Left */}
      <div className="grid grid-cols-3 gap-2">
        {/* GST % Value column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Dis%:</span>
            <div className="bg-teal-500 text-white text-right rounded w-full px-2 py-1">
              {(0).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Pro.Dis:</span>
            <div className="bg-teal-500 text-white text-right rounded w-full px-2 py-1">
              {(0).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Sch.Dis:</span>
            <div className="bg-teal-500 text-white text-right rounded w-full px-2 py-1">
              {(0).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Margin:</span>
            <div className="bg-teal-500 text-white text-right rounded w-full px-2 py-1">
              {(0).toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Other GST columns */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">0% Value:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[0]?.value || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">5% Value:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[5]?.value || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">12% Value:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[12]?.value || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">18% Value:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[18]?.value || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">28% Value:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[28]?.value || 0).toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium">5% GST:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[5]?.gst || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">12% GST:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[12]?.gst || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">18% GST:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[18]?.gst || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">28% GST:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {(gstBreakdown[28]?.gst || 0).toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Tot. GST:</span>
              <div className="bg-teal-500 text-white text-right rounded px-2 py-1">
                {totalGST.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Note - Middle column */}
      <div className="flex flex-col">
        <label htmlFor="note" className="text-sm font-medium">Note:</label>
        <Textarea 
          id="note" 
          className="flex-1 resize-none bg-white"
          placeholder="Add notes about this sale..."
        />
      </div>
      
      {/* Totals - Right column */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Gross:</span>
          <div className="bg-teal-500 text-white text-right rounded w-32 px-2 py-1">
            {totalValue.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Tot.Dis:</span>
          <div className="bg-teal-500 text-white text-right rounded w-32 px-2 py-1">
            {(0).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Adjust:</span>
          <div className="bg-teal-500 text-white text-right rounded w-32 px-2 py-1">
            {(0).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Round:</span>
          <div className="bg-teal-500 text-white text-right rounded w-32 px-2 py-1">
            {(0).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Net Amt:</span>
          <div className="bg-teal-500 text-white text-right rounded w-32 px-2 py-1">
            {netAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSummary;
