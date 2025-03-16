
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PurchaseItem } from './types';

interface PurchaseSummaryProps {
  items: PurchaseItem[];
}

const PurchaseSummary = ({ items }: PurchaseSummaryProps) => {
  // Calculate values based on items
  const subTotal = items.reduce((sum, item) => sum + item.value, 0);
  const gstBreakdown = items.reduce((acc, item) => {
    const key = item.gstPercentage + '';
    if (!acc[key]) {
      acc[key] = { value: 0, gst: 0 };
    }
    acc[key].value += item.value;
    acc[key].gst += item.gstAmount;
    return acc;
  }, {} as Record<string, { value: number; gst: number }>);
  
  const totalGst = Object.values(gstBreakdown).reduce((sum, item) => sum + item.gst, 0);
  const netAmount = subTotal + totalGst;

  return (
    <div className="bg-teal-600 p-4 rounded-md shadow-md mt-4 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column - Discount section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="discount-percent" className="w-24">Dis % :</Label>
            <Input
              id="discount-percent"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="additional-discount" className="w-24">Addi.Dis :</Label>
            <Input
              id="additional-discount"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="cr-note" className="w-24">Cr.Note :</Label>
            <Input
              id="cr-note"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="dr-note" className="w-24">Dr.Note :</Label>
            <Input
              id="dr-note"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Checkbox id="fixed-footer" />
            <Label htmlFor="fixed-footer" className="font-normal">Fixed footer values</Label>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="freight" className="w-24">Freight :</Label>
            <Input
              id="freight"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="misc" className="w-24">Misc :</Label>
            <Select defaultValue="none">
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* GST Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-0" className="w-28">0% Value :</Label>
            <Input
              id="gst-0"
              type="number"
              value={gstBreakdown['0']?.value.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-5" className="w-28">5% Value :</Label>
            <Input
              id="gst-5"
              type="number"
              value={gstBreakdown['5']?.value.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-12" className="w-28">12% Value :</Label>
            <Input
              id="gst-12"
              type="number"
              value={gstBreakdown['12']?.value.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-18" className="w-28">18% Value :</Label>
            <Input
              id="gst-18"
              type="number"
              value={gstBreakdown['18']?.value.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-28" className="w-28">28% Value :</Label>
            <Input
              id="gst-28"
              type="number"
              value={gstBreakdown['28']?.value.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
        </div>
        
        {/* GST Amounts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-amount-5" className="w-20">5% Gst :</Label>
            <Input
              id="gst-amount-5"
              type="number"
              value={gstBreakdown['5']?.gst.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-amount-12" className="w-20">12% Gst :</Label>
            <Input
              id="gst-amount-12"
              type="number"
              value={gstBreakdown['12']?.gst.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-amount-18" className="w-20">18% Gst :</Label>
            <Input
              id="gst-amount-18"
              type="number"
              value={gstBreakdown['18']?.gst.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="gst-amount-28" className="w-20">28% Gst :</Label>
            <Input
              id="gst-amount-28"
              type="number"
              value={gstBreakdown['28']?.gst.toFixed(2) || '0.00'}
              className="h-8 text-right"
              readOnly
            />
          </div>
        </div>
        
        {/* Totals and Notes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="sub-total" className="w-28">Sub Total :</Label>
            <Input
              id="sub-total"
              type="number"
              value={subTotal.toFixed(2)}
              className="h-8 text-right font-medium"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="dis-amt" className="w-28">Dis.Amt :</Label>
            <Input
              id="dis-amt"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="total-gst" className="w-28">Total GST :</Label>
            <Input
              id="total-gst"
              type="number"
              value={totalGst.toFixed(2)}
              className="h-8 text-right font-medium"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="adjustment" className="w-28">Adjustment :</Label>
            <Input
              id="adjustment"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="rounding" className="w-28">Rounding :</Label>
            <Input
              id="rounding"
              type="number"
              value="0.00"
              className="h-8 text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="net-amount" className="w-28">Net Amount :</Label>
            <Input
              id="net-amount"
              type="number"
              value={netAmount.toFixed(2)}
              className="h-8 text-right font-bold bg-white text-teal-700"
              readOnly
            />
          </div>
        </div>
      </div>
      
      {/* Notes section */}
      <div className="mt-4">
        <Label htmlFor="note" className="mb-2 block">Note :</Label>
        <textarea
          id="note"
          rows={2}
          className="w-full rounded-md resize-none bg-white/90 text-gray-800 p-2"
        />
      </div>
    </div>
  );
};

export default PurchaseSummary;
