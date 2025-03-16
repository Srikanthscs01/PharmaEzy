
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

interface ProductMarketingSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductMarketingSection = ({ form, isEditing }: ProductMarketingSectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="marketedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Marketed By:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div className="col-span-1">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Category:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductMarketingSection;
