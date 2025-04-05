
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Calendar } from 'lucide-react';
import { BillItem } from '../types';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface AddBillDialogProps {
  onAddBill: (bill: BillItem) => void;
  children: React.ReactNode;
}

const AddBillDialog = ({ onAddBill, children }: AddBillDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [billDate, setBillDate] = useState<Date | undefined>(new Date());
  
  const [billItem, setBillItem] = useState<BillItem>({
    receiptId: '',
    billNo: '',
    billDate: format(new Date(), 'yyyy-MM-dd'),
    billDisAmtAndPercent: '0%',
    billAmount: 0,
    dueAmount: 0,
    nowReceived: 0,
    discountAmount: 0,
    adjustment: 0,
    balance: 0,
    days: 0,
    interest: 0
  });

  const handleChange = (field: keyof BillItem, value: any) => {
    const numericFields = ['billAmount', 'dueAmount', 'nowReceived', 'discountAmount', 'adjustment', 'days', 'interest'];
    const processedValue = numericFields.includes(field) ? Number(value) : value;
    
    const updatedBill = { ...billItem, [field]: processedValue };
    
    // Recalculate balance
    if (['dueAmount', 'nowReceived', 'discountAmount', 'adjustment'].includes(field)) {
      updatedBill.balance = 
        updatedBill.dueAmount - 
        updatedBill.nowReceived - 
        updatedBill.discountAmount - 
        updatedBill.adjustment;
    }
    
    setBillItem(updatedBill);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBillDate(date);
      setBillItem({
        ...billItem,
        billDate: format(date, 'yyyy-MM-dd')
      });
    }
  };

  const handleAddBill = () => {
    if (!billItem.billNo || billItem.billAmount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter bill number and amount",
        variant: "destructive"
      });
      return;
    }
    
    onAddBill(billItem);
    setOpen(false);
    
    // Reset form
    setBillItem({
      receiptId: '',
      billNo: '',
      billDate: format(new Date(), 'yyyy-MM-dd'),
      billDisAmtAndPercent: '0%',
      billAmount: 0,
      dueAmount: 0,
      nowReceived: 0,
      discountAmount: 0,
      adjustment: 0,
      balance: 0,
      days: 0,
      interest: 0
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Bill</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billNo" className="text-sm font-medium">Bill No:</label>
              <Input
                id="billNo"
                value={billItem.billNo}
                onChange={(e) => handleChange('billNo', e.target.value)}
                placeholder="Enter bill number"
              />
            </div>
            
            <div>
              <label htmlFor="billDate" className="text-sm font-medium">Bill Date:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="billDate"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {billDate ? format(billDate, 'dd/MM/yyyy') : "Select date"}
                    <Calendar className="h-4 w-4 ml-auto opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={billDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billAmount" className="text-sm font-medium">Bill Amount:</label>
              <Input
                id="billAmount"
                type="number"
                value={billItem.billAmount || ''}
                onChange={(e) => handleChange('billAmount', e.target.value)}
                placeholder="Enter bill amount"
              />
            </div>
            
            <div>
              <label htmlFor="dueAmount" className="text-sm font-medium">Due Amount:</label>
              <Input
                id="dueAmount"
                type="number"
                value={billItem.dueAmount || ''}
                onChange={(e) => handleChange('dueAmount', e.target.value)}
                placeholder="Enter due amount"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billDisAmt" className="text-sm font-medium">Discount %:</label>
              <Input
                id="billDisAmt"
                value={billItem.billDisAmtAndPercent}
                onChange={(e) => handleChange('billDisAmtAndPercent', e.target.value)}
                placeholder="Discount percentage"
              />
            </div>
            
            <div>
              <label htmlFor="days" className="text-sm font-medium">Days:</label>
              <Input
                id="days"
                type="number"
                value={billItem.days || ''}
                onChange={(e) => handleChange('days', e.target.value)}
                placeholder="Enter days"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nowReceived" className="text-sm font-medium">Now Received:</label>
              <Input
                id="nowReceived"
                type="number"
                value={billItem.nowReceived || ''}
                onChange={(e) => handleChange('nowReceived', e.target.value)}
                placeholder="Amount received"
              />
            </div>
            
            <div>
              <label htmlFor="discountAmount" className="text-sm font-medium">Discount Amount:</label>
              <Input
                id="discountAmount"
                type="number"
                value={billItem.discountAmount || ''}
                onChange={(e) => handleChange('discountAmount', e.target.value)}
                placeholder="Discount amount"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="adjustment" className="text-sm font-medium">Adjustment:</label>
              <Input
                id="adjustment"
                type="number"
                value={billItem.adjustment || ''}
                onChange={(e) => handleChange('adjustment', e.target.value)}
                placeholder="Enter adjustment"
              />
            </div>
            
            <div>
              <label htmlFor="interest" className="text-sm font-medium">Interest:</label>
              <Input
                id="interest"
                type="number"
                value={billItem.interest || ''}
                onChange={(e) => handleChange('interest', e.target.value)}
                placeholder="Enter interest"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="balance" className="text-sm font-medium">Balance:</label>
              <div className="p-2 border rounded-md bg-gray-50">
                {billItem.balance.toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-end items-end">
              <Button onClick={handleAddBill}>Add Bill</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBillDialog;
