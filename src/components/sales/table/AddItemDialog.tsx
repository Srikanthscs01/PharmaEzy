
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { SalesItem } from '../types';
import { useToast } from '@/components/ui/use-toast';

interface AddItemDialogProps {
  onAddItem: (item: SalesItem) => void;
}

const AddItemDialog = ({ onAddItem }: AddItemDialogProps) => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState<SalesItem>({
    code: '',
    productName: '',
    packing: '',
    batch: '',
    qty: 1,
    free: 0,
    discount: 0,
    rate: 0,
    value: 0,
    gstPercentage: 12,
    gstAmount: 0
  });

  const handleAddItem = () => {
    // Calculate value and GST amount
    const itemValue = newItem.qty * newItem.rate;
    const netValue = itemValue - (itemValue * newItem.discount / 100);
    const gstAmount = netValue * (newItem.gstPercentage / 100);
    
    const completeItem = {
      ...newItem,
      value: netValue,
      gstAmount: gstAmount
    };
    
    onAddItem(completeItem);
    setShowAddDialog(false);
    
    // Reset form for next item
    setNewItem({
      code: '',
      productName: '',
      packing: '',
      batch: '',
      qty: 1,
      free: 0,
      discount: 0,
      rate: 0,
      value: 0,
      gstPercentage: 12,
      gstAmount: 0
    });
  };

  const handleSearchProduct = () => {
    // Simulate product search - in a real app, this would connect to your database
    if (newItem.code) {
      // Simulate finding a product
      const dummyProduct = {
        code: newItem.code,
        productName: `Product ${newItem.code}`,
        packing: '10x10',
        batch: 'B' + Math.floor(Math.random() * 1000),
        rate: Math.floor(Math.random() * 1000) + 100,
      };
      
      setNewItem({
        ...newItem,
        productName: dummyProduct.productName,
        packing: dummyProduct.packing,
        batch: dummyProduct.batch,
        rate: dummyProduct.rate
      });
      
      toast({
        title: "Product Found",
        description: `${dummyProduct.productName} details loaded.`,
      });
    }
  };

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <Plus size={16} /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Sale Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label htmlFor="code" className="text-sm font-medium">Product Code</label>
              <Input
                id="code"
                value={newItem.code}
                onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                placeholder="Enter product code"
              />
            </div>
            <Button type="button" onClick={handleSearchProduct}>
              <Search size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Product Name</label>
              <Input
                id="name"
                value={newItem.productName}
                onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div>
              <label htmlFor="packing" className="text-sm font-medium">Packing</label>
              <Input
                id="packing"
                value={newItem.packing}
                onChange={(e) => setNewItem({ ...newItem, packing: e.target.value })}
                placeholder="Packing info"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="batch" className="text-sm font-medium">Batch</label>
              <Input
                id="batch"
                value={newItem.batch}
                onChange={(e) => setNewItem({ ...newItem, batch: e.target.value })}
                placeholder="Batch number"
              />
            </div>
            <div>
              <label htmlFor="rate" className="text-sm font-medium">Rate</label>
              <Input
                id="rate"
                type="number"
                value={newItem.rate || ''}
                onChange={(e) => setNewItem({ ...newItem, rate: Number(e.target.value) })}
                placeholder="Rate"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="qty" className="text-sm font-medium">Quantity</label>
              <Input
                id="qty"
                type="number"
                value={newItem.qty || ''}
                onChange={(e) => setNewItem({ ...newItem, qty: Number(e.target.value) })}
                placeholder="Qty"
              />
            </div>
            <div>
              <label htmlFor="free" className="text-sm font-medium">Free</label>
              <Input
                id="free"
                type="number"
                value={newItem.free || ''}
                onChange={(e) => setNewItem({ ...newItem, free: Number(e.target.value) })}
                placeholder="Free qty"
              />
            </div>
            <div>
              <label htmlFor="discount" className="text-sm font-medium">Discount %</label>
              <Input
                id="discount"
                type="number"
                value={newItem.discount || ''}
                onChange={(e) => setNewItem({ ...newItem, discount: Number(e.target.value) })}
                placeholder="Discount %"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gst" className="text-sm font-medium">GST %</label>
              <Input
                id="gst"
                type="number"
                value={newItem.gstPercentage || ''}
                onChange={(e) => setNewItem({ ...newItem, gstPercentage: Number(e.target.value) })}
                placeholder="GST %"
              />
            </div>
            <div className="flex justify-end items-end">
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
