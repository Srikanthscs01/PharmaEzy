
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

interface ProductRackSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductRackSection = ({ form, isEditing }: ProductRackSectionProps) => {
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="rackNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Rack No:</FormLabel>
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
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Mark:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div className="col-span-2">
        <FormField
          control={form.control}
          name="sch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Sch:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div className="col-span-5">
        <FormField
          control={form.control}
          name="aiodCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Aiod Code:</FormLabel>
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

export default ProductRackSection;
