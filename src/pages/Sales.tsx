
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductSidebar from '@/components/product/ProductSidebar';
import { useToast } from '@/components/ui/use-toast';
import SalesHeader from '@/components/sales/SalesHeader';
import SalesForm from '@/components/sales/SalesForm';
import SalesTable from '@/components/sales/SalesTable';
import SalesSummary from '@/components/sales/SalesSummary';
import SalesFooter from '@/components/sales/SalesFooter';

const Sales = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [salesItems, setSalesItems] = useState<SalesItem[]>([]);

  // Function to add a new sales item
  const handleAddItem = (item: SalesItem) => {
    setSalesItems([...salesItems, item]);
    toast({
      title: "Item Added",
      description: `${item.productName} added to the sale.`,
    });
  };

  // Function to remove a sales item
  const handleRemoveItem = (index: number) => {
    const newItems = [...salesItems];
    const removedItem = newItems[index];
    newItems.splice(index, 1);
    setSalesItems(newItems);
    
    toast({
      title: "Item Removed",
      description: `${removedItem.productName} removed from the sale.`,
      variant: "destructive",
    });
  };

  // Function to save the sale
  const handleSaveSale = () => {
    // In a real app, this would connect to your backend
    console.log("Saving sale:", {
      customer: selectedCustomer,
      items: salesItems,
      total: calculateTotal(salesItems)
    });
    
    toast({
      title: "Sale Saved",
      description: `Sale for ${selectedCustomer || 'customer'} has been saved.`,
    });
    
    // Reset form after save
    setSelectedCustomer('');
    setSalesItems([]);
  };

  // Calculate the total value of all items
  const calculateTotal = (items: SalesItem[]) => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          <SalesHeader />
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-4 px-6">
              <div className="container max-w-7xl mx-auto flex flex-col h-full">
                {/* Sales Form */}
                <SalesForm 
                  customer={selectedCustomer}
                  onCustomerChange={setSelectedCustomer}
                />
                
                {/* Sales Items Table */}
                <div className="mt-4 bg-white rounded-md shadow-md flex-grow overflow-hidden">
                  <SalesTable 
                    items={salesItems} 
                    onRemoveItem={handleRemoveItem}
                    onAddItem={handleAddItem}
                  />
                </div>
                
                {/* Sales Summary */}
                <SalesSummary items={salesItems} />
                
                {/* Sales Actions */}
                <SalesFooter onSave={handleSaveSale} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sales;
