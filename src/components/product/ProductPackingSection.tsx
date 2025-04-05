
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

interface ProductPackingSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductPackingSection = ({ form, isEditing }: ProductPackingSectionProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <FormField
        control={form.control}
        name="packing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-primary">Packing:</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary" 
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="boxPack"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-primary">Box Pack:</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary" 
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="casePack"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-primary">Case Pack:</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary" 
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="printMark"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium text-primary">Print Mark:</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary" 
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductPackingSection;
