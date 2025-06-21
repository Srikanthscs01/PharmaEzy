
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-xl font-semibold">Product Information</h2>
              <p className="text-blue-100 text-sm mt-1">Fill in the details below to manage your product</p>
            </div>

            <div className="p-8 space-y-8">
              {/* Collapsible Sections */}
              <Accordion type="multiple" defaultValue={["basic", "packaging", "company", "storage", "marketing", "inventory", "comments"]} className="space-y-4">
                {/* Basic Information */}
                <AccordionItem value="basic" className="border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductBasicInfoSection form={form} isEditing={isEditing} onSelectProduct={onSelectProduct} />
                  </AccordionContent>
                </AccordionItem>
                
                {/* Packaging Information */}
                <AccordionItem value="packaging" className="border border-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Packaging Details</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductPackingSection form={form} isEditing={isEditing} />
                  </AccordionContent>
                </AccordionItem>
                
                {/* Company Information */}
                <AccordionItem value="company" className="border border-orange-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Company & Classification</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductCompanySection form={form} isEditing={isEditing} />
                  </AccordionContent>
                </AccordionItem>
                
                {/* Storage & Location */}
                <AccordionItem value="storage" className="border border-purple-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Storage & Location</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductRackSection form={form} isEditing={isEditing} />
                  </AccordionContent>
                </AccordionItem>
                
                {/* Marketing Information */}
                <AccordionItem value="marketing" className="border border-cyan-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Marketing Information</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductMarketingSection form={form} isEditing={isEditing} />
                  </AccordionContent>
                </AccordionItem>
                
                {/* Inventory & Schemes */}
                <AccordionItem value="inventory" className="border border-indigo-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Inventory & Schemes</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid grid-cols-12 gap-8">
                      <ProductInventorySection form={form} isEditing={isEditing} />
                      <ProductSchemeSection form={form} isEditing={isEditing} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Comments */}
                <AccordionItem value="comments" className="border border-slate-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-slate-500 to-gray-500 rounded mr-3"></div>
                      <h3 className="text-lg font-semibold text-slate-800">Additional Information</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ProductCommentSection form={form} isEditing={isEditing} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              {/* Navigation & Metadata */}
              <div className="space-y-6">
                <ProductNavigationButtons />
                
                <div className="grid grid-cols-2 gap-6 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Added Date:</span>
                    <span>N/A</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Modified Date:</span>
                    <span>N/A</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="border-t bg-slate-50/50 p-6">
              <ProductActions 
                isEditing={isEditing} 
                onNew={onNew} 
                onEdit={onEdit} 
                onCancel={onCancel}
                onSelectProduct={onSelectProduct}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
