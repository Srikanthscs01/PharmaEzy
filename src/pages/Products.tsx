
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          <ProductHeader />
          
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-8 px-6">
              <div className="container max-w-7xl mx-auto">
                <ProductForm 
                  form={form}
                  isEditing={isEditing}
                  onSubmit={onSubmit}
                  onNew={handleNew}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
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
