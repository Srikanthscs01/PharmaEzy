
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface ProductSchemeSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductSchemeSection = ({ form, isEditing }: ProductSchemeSectionProps) => {
  return (
    <div className="col-span-5 space-y-4">
      <div className="border border-border rounded-md p-4 bg-cyan-50/50 dark:bg-cyan-950/30">
        <div className="text-center font-semibold mb-3 underline">Scheme</div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="purchaseQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Purc. Qty:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="input-field" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="saleQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Sale Qty:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="input-field" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="purchaseFree"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Purc. Free:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="input-field" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="saleFree"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Sale Free:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="input-field" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <FormField
        control={form.control}
        name="drugFormula"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Drug Formula (Ingredients):</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                disabled={!isEditing} 
                className="bg-cyan-50 dark:bg-cyan-950/40 min-h-[120px]" 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductSchemeSection;
