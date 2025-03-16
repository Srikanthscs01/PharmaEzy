
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

interface ProductCompanySectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductCompanySection = ({ form, isEditing }: ProductCompanySectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="hsn"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">HSN:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Company:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductCompanySection;
