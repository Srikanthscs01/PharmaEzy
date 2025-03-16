
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface ProductInventorySectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductInventorySection = ({ form, isEditing }: ProductInventorySectionProps) => {
  return (
    <div className="col-span-7 space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="saleQtyMin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Sale Qty Min.:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Max:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="orderLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Order Level:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="orderQty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Order Qty:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="boxQtyRates"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Box. Qty (Rates):</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="boxPurPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Box. Pur.Price:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductInventorySection;
