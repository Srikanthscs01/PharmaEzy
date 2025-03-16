
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { TaxType, PaymentType } from './types';

interface SalesFormProps {
  customer: string;
  onCustomerChange: (value: string) => void;
}

const SalesForm = ({ customer, onCustomerChange }: SalesFormProps) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [taxType, setTaxType] = React.useState<TaxType>('GST');
  const [paymentType, setPaymentType] = React.useState<PaymentType>('Credit');
  const [remind, setRemind] = React.useState(false);
  const [invoiceNumber, setInvoiceNumber] = React.useState('SCT6597');
  const [representative, setRepresentative] = React.useState('');

  return (
    <div className="bg-orange-100 rounded-md p-4 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left side - Customer, Remind, Rep */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="customer" className="w-24 font-medium">Customer:</Label>
            <Input 
              id="customer" 
              value={customer} 
              onChange={(e) => onCustomerChange(e.target.value)}
              className="bg-white flex-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="remind" className="w-24 font-medium">Remind:</Label>
            <Checkbox 
              id="remind" 
              checked={remind} 
              onCheckedChange={(checked) => setRemind(checked as boolean)}
              className="bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="rep" className="w-24 font-medium">Rep:</Label>
            <Input 
              id="rep" 
              value={representative} 
              onChange={(e) => setRepresentative(e.target.value)}
              className="bg-white flex-1"
            />
          </div>
        </div>
        
        {/* Middle space */}
        <div className="md:col-span-2"></div>
        
        {/* Right side - Taxes, Type, Inv No, Date */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="taxes" className="font-medium">Taxes:</Label>
            <Select value={taxType} onValueChange={(value) => setTaxType(value as TaxType)}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Select Tax Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GST">GST</SelectItem>
                <SelectItem value="VAT">VAT</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="type" className="font-medium">Type:</Label>
            <Select value={paymentType} onValueChange={(value) => setPaymentType(value as PaymentType)}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Select Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit">Credit</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="invNo" className="font-medium">Inv No:</Label>
            <Input 
              id="invNo" 
              value={invoiceNumber} 
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-36 bg-white"
            />
          </div>
          
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="date" className="font-medium">Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-36 bg-white justify-start text-left font-normal">
                  {date ? format(date, "dd/MM/yyyy") : "Select date"}
                  <CalendarIcon className="h-4 w-4 ml-auto opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
