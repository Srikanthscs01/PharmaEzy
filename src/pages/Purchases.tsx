
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductSidebar from '@/components/product/ProductSidebar';
import { useToast } from '@/components/ui/use-toast';
import PurchaseHeader from '@/components/purchase/PurchaseHeader';
import PurchaseForm from '@/components/purchase/PurchaseForm';
import PurchaseTable from '@/components/purchase/PurchaseTable';
import PurchaseSummary from '@/components/purchase/PurchaseSummary';
import PurchaseFooter from '@/components/purchase/PurchaseFooter';
import { PurchaseItem, PurchaseFormData } from '@/components/purchase/types';

const Purchases = () => {
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<PurchaseFormData>({
    supplier: '',
    remind: false,
    invoiceNo: '',
    holdStocks: false,
    company: 'none',
    lrNo: '',
    revCharge: false,
    entryNo: '25P0958',
    date: new Date().toISOString().split('T')[0],
    lrDate: new Date().toISOString().split('T')[0],
    entryDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    taxType: 'gst',
    purchaseType: 'credit',
  });
  
  // Items state
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);

  // Update form data
  const handleFormChange = (data: Partial<PurchaseFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Function to add a new purchase item
  const handleAddItem = (item: PurchaseItem) => {
    setPurchaseItems([...purchaseItems, item]);
    toast({
      title: "Item Added",
      description: `${item.productName} added to the purchase.`,
    });
  };

  // Function to remove a purchase item
  const handleRemoveItem = (index: number) => {
    const newItems = [...purchaseItems];
    const removedItem = newItems[index];
    newItems.splice(index, 1);
    setPurchaseItems(newItems);
    
    toast({
      title: "Item Removed",
      description: `${removedItem.productName} removed from the purchase.`,
      variant: "destructive",
    });
  };

  // Function to save the purchase
  const handleSavePurchase = () => {
    // In a real app, this would connect to your backend
    console.log("Saving purchase:", {
      formData,
      items: purchaseItems,
    });
    
    toast({
      title: "Purchase Saved",
      description: `Purchase for ${formData.supplier || 'supplier'} has been saved.`,
    });
    
    // Reset form after save
    setPurchaseItems([]);
    setFormData({
      ...formData,
      supplier: '',
      invoiceNo: '',
      remind: false,
      holdStocks: false,
    });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          <PurchaseHeader />
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-4 px-6">
              <div className="container max-w-7xl mx-auto flex flex-col h-full">
                {/* Purchase Form */}
                <PurchaseForm 
                  formData={formData}
                  onFormChange={handleFormChange}
                />
                
                {/* Purchase Items Table */}
                <div className="mt-4 bg-white rounded-md shadow-md flex-grow overflow-hidden">
                  <PurchaseTable 
                    items={purchaseItems} 
                    onRemoveItem={handleRemoveItem}
                    onAddItem={handleAddItem}
                  />
                </div>
                
                {/* Purchase Summary */}
                <PurchaseSummary items={purchaseItems} />
                
                {/* Purchase Actions */}
                <PurchaseFooter onSave={handleSavePurchase} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Purchases;
