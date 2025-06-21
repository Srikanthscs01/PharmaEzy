
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductFooter from '@/components/product/ProductFooter';
import ProductForm from '@/components/product/ProductForm';
import ProductSearchDialog from '@/components/product/ProductSearchDialog';
import { ProductFormValues } from '@/components/product/types';
import Header from '@/components/layout/Header';

const Products = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      code: '',
      uniCode: '',
      name: '',
      packing: '',
      boxPack: '',
      casePack: '',
      printMark: '',
      hsn: '',
      company: '',
      rackNo: '',
      mark: '',
      sch: '',
      aiodCode: '',
      marketedBy: '',
      category: '',
      saleQtyMin: '',
      max: '',
      orderLevel: '',
      orderQty: '',
      boxQtyRates: '',
      boxPurPrice: '',
      comment: '',
      discontinued: false,
      purchaseQty: '',
      saleQty: '',
      purchaseFree: '',
      saleFree: '',
      drugFormula: '',
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Product Saved",
      description: `${data.name} has been saved successfully.`,
    });
    setIsEditing(false);
  };

  const handleNew = () => {
    form.reset();
    setIsEditing(true);
    toast({
      title: "New Product",
      description: "Enter details for the new product",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    toast({
      description: "You can now edit the product details",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset();
    toast({
      variant: "destructive",
      description: "Changes have been discarded",
    });
  };

  const handleSelectProduct = (productData: Partial<ProductFormValues>) => {
    setIsEditing(true);
    
    Object.entries(productData).forEach(([key, value]) => {
      form.setValue(key as keyof ProductFormValues, value);
    });
    
    toast({
      title: "Product Loaded",
      description: `${productData.name} details loaded into form`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      
      <div className="relative flex-1">
        <AnimatedBackground />
        <main className="relative z-10 flex-1 py-8 px-6">
          <div className="container max-w-7xl mx-auto animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">Product Master</h1>
                  <p className="text-slate-600">Manage product information and inventory details with ease</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-11 px-6 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-700 border-amber-200 font-medium shadow-sm" 
                    onClick={() => setSearchDialogOpen(true)}
                  >
                    <Search size={18} className="mr-2" />
                    Search Product
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-11 px-6 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border-green-200 font-medium shadow-sm" 
                    onClick={handleNew}
                  >
                    <Plus size={18} className="mr-2" />
                    New Product
                  </Button>
                  
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <div className="text-white text-2xl font-bold">P</div>
                  </div>
                </div>
              </div>
            </div>
            
            <ProductForm 
              form={form}
              isEditing={isEditing}
              onSubmit={onSubmit}
              onEdit={handleEdit}
              onCancel={handleCancel}
              onSelectProduct={handleSelectProduct}
            />
          </div>
        </main>
      </div>
      
      <ProductSearchDialog 
        open={searchDialogOpen} 
        onOpenChange={setSearchDialogOpen}
        onSelectProduct={handleSelectProduct}
      />
      
      <ProductFooter />
    </div>
  );
};

export default Products;
