
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProductSidebar from '@/components/product/ProductSidebar';
import ProductHeader from '@/components/product/ProductHeader';
import ProductFooter from '@/components/product/ProductFooter';
import ProductForm from '@/components/product/ProductForm';
import { ProductFormValues } from '@/components/product/types';

const Products = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          <ProductHeader />
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-6 px-4">
              <div className="container max-w-6xl mx-auto animate-fade-in">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-primary">Product Master</h1>
                  <p className="text-muted-foreground text-sm">Manage product information and inventory details</p>
                </div>
                
                <ProductForm 
                  form={form}
                  isEditing={isEditing}
                  onSubmit={onSubmit}
                  onNew={handleNew}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                  onSelectProduct={handleSelectProduct}
                />
              </div>
            </main>
          </div>
          
          <ProductFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Products;
