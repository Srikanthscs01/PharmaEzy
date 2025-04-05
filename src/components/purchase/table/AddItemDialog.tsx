import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { PurchaseItem } from '../types';

interface AddItemDialogProps {
  onAddItem: (item: PurchaseItem) => void;
  children: React.ReactNode;
}

const AddItemDialog = ({ onAddItem, children }: AddItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [itemData, setItemData] = useState<PurchaseItem>({
    code: '',
    productName: '',
    packing: '',
    batchNo: '',
    rate: 0,
    qty: 1,
    free: 0,
    value: 0,
    month: new Date().getMonth() + 1 + '',
    year: new Date().getFullYear() + '',
    marginPercentage: 20,
    retailMarginPercentage: 10,
    gstPercentage: 12,
    discount: 0,
    gstAmount: 0,
  });

  const handleChange = (field: keyof PurchaseItem, value: any) => {
    const processedValue = 
      ['rate', 'qty', 'free', 'marginPercentage', 'retailMarginPercentage', 'gstPercentage', 'discount'].includes(field) 
        ? Number(value) 
        : value;
        
    const updatedItem = { ...itemData, [field]: processedValue };
    
    if (field === 'rate' || field === 'qty' || field === 'discount') {
      const discountAmount = (updatedItem.rate * updatedItem.qty * updatedItem.discount) / 100;
      updatedItem.value = updatedItem.rate * updatedItem.qty - discountAmount;
      updatedItem.gstAmount = (updatedItem.value * updatedItem.gstPercentage) / 100;
    }
    
    setItemData(updatedItem);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(itemData);
    setOpen(false);
    
    setItemData({
      code: '',
      productName: '',
      packing: '',
      batchNo: '',
      rate: 0,
      qty: 1,
      free: 0,
      value: 0,
      month: new Date().getMonth() + 1 + '',
      year: new Date().getFullYear() + '',
      marginPercentage: 20,
      retailMarginPercentage: 10,
      gstPercentage: 12,
      discount: 0,
      gstAmount: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Purchase Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="code" className="text-right mr-4">Product Code:</Label>
              <Input
                id="code"
                value={itemData.code}
                onChange={(e) => handleChange('code', e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="productName" className="text-right mr-4">Product Name:</Label>
              <Input
                id="productName"
                value={itemData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="packing" className="text-right mr-4">Packing:</Label>
              <Input
                id="packing"
                value={itemData.packing}
                onChange={(e) => handleChange('packing', e.target.value)}
                className="col-span-2"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="batchNo" className="text-right mr-4">Batch No:</Label>
              <Input
                id="batchNo"
                value={itemData.batchNo}
                onChange={(e) => handleChange('batchNo', e.target.value)}
                className="col-span-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="rate" className="text-right mr-4">Rate:</Label>
              <Input
                id="rate"
                type="number"
                value={itemData.rate}
                onChange={(e) => handleChange('rate', e.target.value)}
                className="col-span-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="qty" className="text-right mr-4">Quantity:</Label>
              <Input
                id="qty"
                type="number"
                value={itemData.qty}
                onChange={(e) => handleChange('qty', e.target.value)}
                className="col-span-2"
                required
                min="1"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="free" className="text-right mr-4">Free Items:</Label>
              <Input
                id="free"
                type="number"
                value={itemData.free}
                onChange={(e) => handleChange('free', e.target.value)}
                className="col-span-2"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="month" className="text-right mr-4">Month:</Label>
              <Input
                id="month"
                value={itemData.month}
                onChange={(e) => handleChange('month', e.target.value)}
                className="col-span-2"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="year" className="text-right mr-4">Year:</Label>
              <Input
                id="year"
                value={itemData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="col-span-2"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="marginPercentage" className="text-right mr-4">Margin %:</Label>
              <Input
                id="marginPercentage"
                type="number"
                value={itemData.marginPercentage}
                onChange={(e) => handleChange('marginPercentage', e.target.value)}
                className="col-span-2"
                min="0"
                max="100"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="retailMarginPercentage" className="text-right mr-4">Retail Margin %:</Label>
              <Input
                id="retailMarginPercentage"
                type="number"
                value={itemData.retailMarginPercentage}
                onChange={(e) => handleChange('retailMarginPercentage', e.target.value)}
                className="col-span-2"
                min="0"
                max="100"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="gstPercentage" className="text-right mr-4">GST %:</Label>
              <Input
                id="gstPercentage"
                type="number"
                value={itemData.gstPercentage}
                onChange={(e) => handleChange('gstPercentage', e.target.value)}
                className="col-span-2"
                min="0"
                max="28"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="discount" className="text-right mr-4">Discount %:</Label>
              <Input
                id="discount"
                type="number"
                value={itemData.discount}
                onChange={(e) => handleChange('discount', e.target.value)}
                className="col-span-2"
                min="0"
                max="100"
              />
            </div>
            
            <div className="grid grid-cols-3 items-center">
              <Label htmlFor="value" className="text-right mr-4 font-semibold">Total Value:</Label>
              <div className="col-span-2 text-lg font-medium">
                ₹{itemData.value.toFixed(2)}
              </div>
            </div>
          </div>
          
          <DialogFooter className="col-span-2">
            <Button type="submit" size="sm">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
