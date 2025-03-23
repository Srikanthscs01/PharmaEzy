
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Users, Tag, CreditCard } from 'lucide-react';
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
    <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-md p-6 shadow-md border border-orange-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left side - Customer, Remind, Rep */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-2 rounded text-orange-700">
              <Users size={18} />
            </div>
            <div className="flex-1">
              <Label htmlFor="customer" className="text-sm text-gray-600 font-medium mb-1 block">Customer</Label>
              <Input 
                id="customer" 
                value={customer} 
                onChange={(e) => onCustomerChange(e.target.value)}
                className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                placeholder="Enter customer name"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="remind" className="text-sm text-gray-600">Remind:</Label>
              <Checkbox 
                id="remind" 
                checked={remind} 
                onCheckedChange={(checked) => setRemind(checked as boolean)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="rep" className="text-sm text-gray-600">Rep:</Label>
              <Input 
                id="rep" 
                value={representative} 
                onChange={(e) => setRepresentative(e.target.value)}
                className="bg-white w-32 h-8 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                placeholder="Rep name"
              />
            </div>
          </div>
        </div>
        
        {/* Middle space */}
        <div className="md:col-span-2 flex justify-center items-center">
          <div className="h-full w-px bg-orange-200 hidden md:block"></div>
        </div>
        
        {/* Right side - Taxes, Type, Inv No, Date */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-2 rounded text-orange-700">
              <Tag size={18} />
            </div>
            <div className="flex-1">
              <Label htmlFor="taxes" className="text-sm text-gray-600 font-medium mb-1 block">Tax Type</Label>
              <Select value={taxType} onValueChange={(value) => setTaxType(value as TaxType)}>
                <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-200">
                  <SelectValue placeholder="Select Tax Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="VAT">VAT</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-2 rounded text-orange-700">
              <CreditCard size={18} />
            </div>
            <div className="flex-1">
              <Label htmlFor="type" className="text-sm text-gray-600 font-medium mb-1 block">Payment Type</Label>
              <Select value={paymentType} onValueChange={(value) => setPaymentType(value as PaymentType)}>
                <SelectTrigger className="bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-200">
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
          </div>
          
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="invNo" className="text-sm text-gray-600">Inv No:</Label>
              <Input 
                id="invNo" 
                value={invoiceNumber} 
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-32 h-8 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>
            
            <div>
              <Label htmlFor="date" className="text-sm text-gray-600 mr-2">Date:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 bg-white border-orange-200 hover:bg-orange-100 text-gray-700">
                    {date ? format(date, "dd/MM/yyyy") : "Select date"}
                    <CalendarIcon className="h-4 w-4 ml-2 opacity-70" />
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
    </div>
  );
};

export default SalesForm;
