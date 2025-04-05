
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/components/ui/use-toast';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductSidebar from '@/components/product/ProductSidebar';
import ReceiptHeader from '@/components/receipt/ReceiptHeader';
import ReceiptForm from '@/components/receipt/ReceiptForm';
import ReceiptTable from '@/components/receipt/ReceiptTable';
import ReceiptDetails from '@/components/receipt/ReceiptDetails';
import ReceiptFooter from '@/components/receipt/ReceiptFooter';
import { BillItem } from '@/components/receipt/types';
import { format } from 'date-fns';

const Receipts = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [bankOrCash, setBankOrCash] = useState('CASH');
  const [receiptNumber, setReceiptNumber] = useState('3281');
  const [date, setDate] = useState<Date>(new Date());
  const [bills, setBills] = useState<BillItem[]>([]);
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  
  // Add a bill to the receipt
  const handleAddBill = (bill: BillItem) => {
    setBills([...bills, bill]);
    
    // Update total due amount
    setTotalDueAmount(prevTotal => prevTotal + bill.dueAmount);
    
    toast({
      title: "Bill Added",
      description: `Bill #${bill.billNo} added to the receipt.`
    });
  };
  
  // Remove a bill from the receipt
  const handleRemoveBill = (index: number) => {
    const billToRemove = bills[index];
    
    setBills(bills.filter((_, i) => i !== index));
    
    // Update total due amount
    setTotalDueAmount(prevTotal => prevTotal - billToRemove.dueAmount);
    
    toast({
      title: "Bill Removed",
      description: `Bill #${billToRemove.billNo} removed from the receipt.`
    });
  };

  // Function to save the receipt
  const handleSaveReceipt = () => {
    if (!selectedCustomer) {
      toast({
        title: "Error",
        description: "Please select a customer before saving.",
        variant: "destructive",
      });
      return;
    }
    
    if (bills.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one bill before saving.",
        variant: "destructive",
      });
      return;
    }

    // Calculate totals
    const totalReceived = bills.reduce((sum, bill) => sum + bill.nowReceived, 0);
    const totalDiscount = bills.reduce((sum, bill) => sum + bill.discountAmount, 0);
    const totalInterest = bills.reduce((sum, bill) => sum + bill.interest, 0);
    const totalAdjustment = bills.reduce((sum, bill) => sum + bill.adjustment, 0);
    const netAmount = totalReceived - totalDiscount + totalInterest - totalAdjustment;
    
    // In a real app, this would connect to your backend
    console.log("Saving receipt:", {
      customer: selectedCustomer,
      bankOrCash,
      receiptNumber,
      date: format(date, 'yyyy-MM-dd'),
      totalDueAmount,
      bills,
      gross: totalReceived,
      discountAmount: totalDiscount,
      interestAmount: totalInterest,
      adjustment: totalAdjustment,
      netAmount
    });
    
    toast({
      title: "Receipt Saved",
      description: `Receipt for ${selectedCustomer} has been saved.`,
    });
    
    // Generate a new receipt number (increment)
    const newReceiptNumber = String(parseInt(receiptNumber) + 1);
    setReceiptNumber(newReceiptNumber);
    setBills([]);
    setTotalDueAmount(0);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          <ReceiptHeader />
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-4 px-6">
              <div className="container max-w-7xl mx-auto flex flex-col h-full">
                {/* Receipt Form */}
                <ReceiptForm 
                  customer={selectedCustomer}
                  onCustomerChange={setSelectedCustomer}
                  bankOrCash={bankOrCash}
                  onBankOrCashChange={setBankOrCash}
                  receiptNumber={receiptNumber}
                  onReceiptNumberChange={setReceiptNumber}
                  date={date}
                  onDateChange={setDate}
                  totalDueAmount={totalDueAmount}
                />
                
                {/* Bills Table */}
                <div className="mt-4">
                  <ReceiptTable 
                    items={bills} 
                    onAddBill={handleAddBill}
                    onRemoveBill={handleRemoveBill}
                  />
                </div>
                
                {/* Receipt Details */}
                <ReceiptDetails />
                
                {/* Receipt Actions */}
                <ReceiptFooter onSave={handleSaveReceipt} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Receipts;
