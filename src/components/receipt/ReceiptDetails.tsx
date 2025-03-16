
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const ReceiptDetails = () => {
  const [chequeDate, setChequeDate] = React.useState<Date>(new Date());
  const [presentationDate, setPresentationDate] = React.useState<Date>(new Date());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 bg-teal-700 p-4 rounded-md text-white">
      {/* Left column - Amount details */}
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-2">
          <Label htmlFor="amount" className="w-24 text-right">Amount:</Label>
          <Input 
            id="amount" 
            type="number"
            defaultValue="0.00"
            className="w-32 bg-teal-600 border-teal-500 text-white text-right"
          />
        </div>
        
        <div className="flex items-center justify-end gap-2">
          <Label htmlFor="disPercent" className="w-24 text-right">Dis %:</Label>
          <Input 
            id="disPercent" 
            type="number"
            defaultValue="0.00"
            className="w-32 bg-teal-600 border-teal-500 text-white text-right"
          />
        </div>
        
        <div className="flex items-center justify-end gap-2">
          <Label htmlFor="intPercent" className="w-24 text-right">Int %:</Label>
          <Input 
            id="intPercent" 
            type="number"
            defaultValue="0.00"
            className="w-32 bg-teal-600 border-teal-500 text-white text-right"
          />
        </div>
      </div>
      
      {/* Middle column - Cheque details */}
      <div className="space-y-2">
        <h3 className="text-center font-semibold mb-4">Cheque Details...</h3>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="chequeNo" className="w-24 text-right">Chq. No:</Label>
          <Input 
            id="chequeNo" 
            className="flex-1 bg-teal-600 border-teal-500 text-white"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="chequeDate" className="w-24 text-right">Date:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal bg-teal-600 border-teal-500 text-white"
              >
                {chequeDate ? format(chequeDate, "dd/MM/yyyy") : "Select date"}
                <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={chequeDate}
                onSelect={(date) => date && setChequeDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="presentationDate" className="w-24 text-right">Pres.On:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left font-normal bg-teal-600 border-teal-500 text-white"
              >
                {presentationDate ? format(presentationDate, "dd/MM/yyyy") : "Select date"}
                <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={presentationDate}
                onSelect={(date) => date && setPresentationDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="type" className="w-24 text-right">Type:</Label>
          <Select defaultValue="MICR">
            <SelectTrigger className="w-full bg-teal-600 border-teal-500 text-white">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MICR">MICR</SelectItem>
              <SelectItem value="NON-MICR">NON-MICR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Right side - Bank details and summary */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <h3 className="text-center font-semibold mb-2">Drawee Bank Details...</h3>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="bankCode" className="w-16 text-right">Code:</Label>
            <Input 
              id="bankCode" 
              className="flex-1 bg-teal-600 border-teal-500 text-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="bankName" className="w-16 text-right">Name:</Label>
            <Input 
              id="bankName" 
              className="flex-1 bg-teal-600 border-teal-500 text-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="branch" className="w-16 text-right">Branch:</Label>
            <Input 
              id="branch" 
              className="flex-1 bg-teal-600 border-teal-500 text-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="city" className="w-16 text-right">City:</Label>
            <Input 
              id="city" 
              className="flex-1 bg-teal-600 border-teal-500 text-white"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="gross" className="font-medium">Gross:</Label>
            <Input 
              id="gross" 
              type="number"
              defaultValue="0.00"
              className="w-32 bg-teal-600 border-teal-500 text-white text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sumDisAmt" className="font-medium">Dis Amt:</Label>
            <Input 
              id="sumDisAmt" 
              type="number"
              defaultValue="0.00"
              className="w-32 bg-teal-600 border-teal-500 text-white text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="intAmt" className="font-medium">Int. Amt:</Label>
            <Input 
              id="intAmt" 
              type="number"
              defaultValue="0.00"
              className="w-32 bg-teal-600 border-teal-500 text-white text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="sumAdjust" className="font-medium">Adjust:</Label>
            <Input 
              id="sumAdjust" 
              type="number"
              defaultValue="0.00"
              className="w-32 bg-teal-600 border-teal-500 text-white text-right"
              readOnly
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="netAmt" className="font-medium">Net Amt:</Label>
            <Input 
              id="netAmt" 
              type="number"
              defaultValue="0.00"
              className="w-32 bg-teal-600 border-teal-500 text-white text-right"
              readOnly
            />
          </div>
        </div>
      </div>
      
      {/* Note row - spans full width */}
      <div className="col-span-full">
        <div className="flex items-start gap-2">
          <Label htmlFor="note" className="w-24 pt-2">Note:</Label>
          <Textarea 
            id="note" 
            className="flex-1 bg-teal-600 border-teal-500 text-white h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetails;
