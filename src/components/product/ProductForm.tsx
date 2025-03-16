
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';
import ProductBasicInfoSection from './ProductBasicInfoSection';
import ProductPackingSection from './ProductPackingSection';
import ProductCompanySection from './ProductCompanySection';
import ProductRackSection from './ProductRackSection';
import ProductMarketingSection from './ProductMarketingSection';
import ProductInventorySection from './ProductInventorySection';
import ProductSchemeSection from './ProductSchemeSection';
import ProductCommentSection from './ProductCommentSection';
import ProductNavigationButtons from './ProductNavigationButtons';
import ProductActions from './ProductActions';

interface ProductFormProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
  onSubmit: (data: ProductFormValues) => void;
  onNew: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSelectProduct: (productData: Partial<ProductFormValues>) => void;
}

const ProductForm = ({ 
  form, 
  isEditing, 
  onSubmit, 
  onNew, 
  onEdit, 
  onCancel,
  onSelectProduct
}: ProductFormProps) => {
  return (
    <div className="form-card p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ProductBasicInfoSection form={form} isEditing={isEditing} />
          <ProductPackingSection form={form} isEditing={isEditing} />
          <ProductCompanySection form={form} isEditing={isEditing} />
          <ProductRackSection form={form} isEditing={isEditing} />
          <ProductMarketingSection form={form} isEditing={isEditing} />
          
          <div className="grid grid-cols-12 gap-6">
            <ProductInventorySection form={form} isEditing={isEditing} />
            <ProductSchemeSection form={form} isEditing={isEditing} />
          </div>
          
          <ProductCommentSection form={form} isEditing={isEditing} />
          <ProductNavigationButtons />
          
          <div className="grid grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>Added Date: N/A</div>
            <div>Modified Date: N/A</div>
          </div>
          
          <ProductActions 
            isEditing={isEditing} 
            onNew={onNew} 
            onEdit={onEdit} 
            onCancel={onCancel}
            onSelectProduct={onSelectProduct}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
