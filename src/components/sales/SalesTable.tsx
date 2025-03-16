
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Trash2 } from 'lucide-react';
import { SalesItem } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface SalesTableProps {
  items: SalesItem[];
  onRemoveItem: (index: number) => void;
  onAddItem: (item: SalesItem) => void;
}

const SalesTable = ({ items, onRemoveItem, onAddItem }: SalesTableProps) => {
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

  // Calculate totals for all rows
  const totals = items.reduce(
    (acc, item) => {
      return {
        qty: acc.qty + item.qty,
        free: acc.free + item.free,
        value: acc.value + item.value,
        gstAmount: acc.gstAmount + item.gstAmount,
      };
    },
    { qty: 0, free: 0, value: 0, gstAmount: 0 }
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex justify-between items-center border-b">
        <h3 className="font-medium">Sale Items</h3>
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
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-teal-600">
            <TableRow className="border border-gray-300">
              <TableHead className="h-8 text-white font-medium">#</TableHead>
              <TableHead className="h-8 text-white font-medium">Code</TableHead>
              <TableHead className="h-8 text-white font-medium">Product Name</TableHead>
              <TableHead className="h-8 text-white font-medium">Packing</TableHead>
              <TableHead className="h-8 text-white font-medium">Batch</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">Qty</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">Free</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">Dis %</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">Rate</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">Value</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">GST%</TableHead>
              <TableHead className="h-8 text-white font-medium text-right">GST Amt</TableHead>
              <TableHead className="h-8 text-white font-medium w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center text-muted-foreground">
                  No items added to this sale yet.
                </TableCell>
              </TableRow>
            ) : (
              <>
                {items.map((item, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="py-2">{index + 1}</TableCell>
                    <TableCell className="py-2">{item.code}</TableCell>
                    <TableCell className="py-2">{item.productName}</TableCell>
                    <TableCell className="py-2">{item.packing}</TableCell>
                    <TableCell className="py-2">{item.batch}</TableCell>
                    <TableCell className="py-2 text-right">{item.qty}</TableCell>
                    <TableCell className="py-2 text-right">{item.free}</TableCell>
                    <TableCell className="py-2 text-right">{item.discount}%</TableCell>
                    <TableCell className="py-2 text-right">{item.rate.toFixed(2)}</TableCell>
                    <TableCell className="py-2 text-right">{item.value.toFixed(2)}</TableCell>
                    <TableCell className="py-2 text-right">{item.gstPercentage}%</TableCell>
                    <TableCell className="py-2 text-right">{item.gstAmount.toFixed(2)}</TableCell>
                    <TableCell className="py-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onRemoveItem(index)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {/* Totals row */}
                <TableRow className="bg-muted/50 font-medium">
                  <TableCell colSpan={5} className="py-2 text-right">Totals:</TableCell>
                  <TableCell className="py-2 text-right">{totals.qty}</TableCell>
                  <TableCell className="py-2 text-right">{totals.free}</TableCell>
                  <TableCell className="py-2"></TableCell>
                  <TableCell className="py-2"></TableCell>
                  <TableCell className="py-2 text-right">{totals.value.toFixed(2)}</TableCell>
                  <TableCell className="py-2"></TableCell>
                  <TableCell className="py-2 text-right">{totals.gstAmount.toFixed(2)}</TableCell>
                  <TableCell className="py-2"></TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;
