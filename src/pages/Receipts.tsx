
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

const Receipts = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [bankOrCash, setBankOrCash] = useState('CASH');
  const [receiptNumber, setReceiptNumber] = useState('3281');
  const [bills, setBills] = useState<BillItem[]>([]);
  
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
    
    // In a real app, this would connect to your backend
    console.log("Saving receipt:", {
      customer: selectedCustomer,
      bankOrCash,
      receiptNumber,
      bills
    });
    
    toast({
      title: "Receipt Saved",
      description: `Receipt for ${selectedCustomer} has been saved.`,
    });
    
    // Generate a new receipt number (increment)
    const newReceiptNumber = String(parseInt(receiptNumber) + 1);
    setReceiptNumber(newReceiptNumber);
    setBills([]);
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
                />
                
                {/* Bills Table */}
                <div className="mt-4">
                  <ReceiptTable items={bills} />
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
