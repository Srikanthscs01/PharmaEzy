
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
            <FormLabel className="font-medium underline">Packing:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="boxPack"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Box Pack:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="casePack"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Case Pack:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="printMark"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Print Mark:</FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductPackingSection;
