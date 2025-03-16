
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface ReceiptFormProps {
  customer: string;
  onCustomerChange: (value: string) => void;
  bankOrCash: string;
  onBankOrCashChange: (value: string) => void;
  receiptNumber: string;
  onReceiptNumberChange: (value: string) => void;
}

const ReceiptForm = ({
  customer,
  onCustomerChange,
  bankOrCash,
  onBankOrCashChange,
  receiptNumber,
  onReceiptNumberChange
}: ReceiptFormProps) => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <div className="bg-teal-700 text-white rounded-md p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left side - Customer */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <Label htmlFor="customer" className="w-28 font-medium">Customer:</Label>
            <Input 
              id="customer" 
              value={customer} 
              onChange={(e) => onCustomerChange(e.target.value)}
              className="bg-teal-600 border-teal-500 text-white flex-1"
            />
          </div>
        </div>
        
        {/* Middle - Bank/Cash */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="bankOrCash" className="w-28 font-medium">Bank / Cash:</Label>
            <Input 
              id="bankOrCash" 
              value={bankOrCash} 
              onChange={(e) => onBankOrCashChange(e.target.value)}
              className="bg-teal-600 border-teal-500 text-white w-32"
            />
            <span className="text-sm ml-2">CASH ON HAND ACCOUNT</span>
          </div>
        </div>
        
        {/* Right side - Receipt # and Date */}
        <div className="md:col-span-3 space-y-2">
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="receiptNo" className="font-medium text-right">Receipt #:</Label>
            <Input 
              id="receiptNo" 
              value={receiptNumber} 
              onChange={(e) => onReceiptNumberChange(e.target.value)}
              className="w-32 bg-teal-600 border-teal-500 text-white"
            />
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="date" className="font-medium text-right">Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-32 justify-start text-left font-normal bg-teal-600 border-teal-500 text-white"
                >
                  {date ? format(date, "dd/MM/yyyy") : "Select date"}
                  <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* Total Due Amount */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="totalDue" className="font-medium">Total Due Amt:</Label>
          <span className="text-xl font-semibold">0.00</span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptForm;
