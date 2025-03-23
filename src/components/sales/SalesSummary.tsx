
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* GST Breakdown - Left */}
      <Card className="border border-orange-200 shadow-sm bg-gradient-to-b from-orange-50 to-orange-100">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">GST Breakdown</h3>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <div className="text-xs text-gray-500 mb-1">Discount %</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Product Discount</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">0% Value</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(gstBreakdown[0]?.value || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">5% GST</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(gstBreakdown[5]?.gst || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">12% GST</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(gstBreakdown[12]?.gst || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">18% GST</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(gstBreakdown[18]?.gst || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">28% GST</div>
              <div className="bg-white border border-orange-200 rounded p-1.5 text-right text-sm font-mono">
                {(gstBreakdown[28]?.gst || 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">Total GST</div>
              <div className="bg-orange-200 rounded p-1.5 text-right text-sm font-mono font-medium">
                {totalGST.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Note - Middle column */}
      <Card className="border border-orange-200 shadow-sm bg-gradient-to-b from-orange-50 to-orange-100">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Notes</h3>
          <Textarea 
            className="resize-none h-[calc(100%-2rem)] bg-white border-orange-200" 
            placeholder="Add notes about this sale..."
          />
        </CardContent>
      </Card>
      
      {/* Totals - Right column */}
      <Card className="border border-orange-200 shadow-sm bg-gradient-to-b from-orange-50 to-orange-100">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Gross Amount:</span>
              <div className="bg-white border border-orange-200 rounded p-1.5 w-32 text-right text-sm font-mono">
                {totalValue.toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Discount:</span>
              <div className="bg-white border border-orange-200 rounded p-1.5 w-32 text-right text-sm font-mono">
                {(0).toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Adjustment:</span>
              <div className="bg-white border border-orange-200 rounded p-1.5 w-32 text-right text-sm font-mono">
                {(0).toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Round Off:</span>
              <div className="bg-white border border-orange-200 rounded p-1.5 w-32 text-right text-sm font-mono">
                {(0).toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-orange-200">
              <span className="text-sm font-medium">Net Amount:</span>
              <div className="bg-orange-500 text-white rounded p-1.5 w-32 text-right text-sm font-mono font-bold">
                {netAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSummary;
