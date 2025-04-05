
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="shadow-lg border-cyan-100/50 dark:border-cyan-800/30 overflow-hidden">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="space-y-6">
              <ProductBasicInfoSection form={form} isEditing={isEditing} onSelectProduct={onSelectProduct} />
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4">
                <ProductPackingSection form={form} isEditing={isEditing} />
              </div>
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4">
                <ProductCompanySection form={form} isEditing={isEditing} />
              </div>
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4">
                <ProductRackSection form={form} isEditing={isEditing} />
              </div>
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4">
                <ProductMarketingSection form={form} isEditing={isEditing} />
              </div>
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4 grid grid-cols-12 gap-6">
                <ProductInventorySection form={form} isEditing={isEditing} />
                <ProductSchemeSection form={form} isEditing={isEditing} />
              </div>
              
              <div className="border-t border-cyan-100 dark:border-cyan-800/30 pt-4">
                <ProductCommentSection form={form} isEditing={isEditing} />
              </div>
              
              <ProductNavigationButtons />
              
              <div className="grid grid-cols-2 gap-6 text-xs text-muted-foreground bg-cyan-50/50 dark:bg-cyan-900/20 p-3 rounded-md">
                <div>Added Date: N/A</div>
                <div>Modified Date: N/A</div>
              </div>
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
      </CardContent>
    </Card>
  );
};

export default ProductForm;
