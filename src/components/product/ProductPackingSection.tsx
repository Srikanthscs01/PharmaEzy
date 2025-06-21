
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FormField
        control={form.control}
        name="packing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-semibold text-slate-700">Packing</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all" 
                placeholder="Pack size"
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
            <FormLabel className="text-sm font-semibold text-slate-700">Box Pack</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all" 
                placeholder="Box quantity"
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
            <FormLabel className="text-sm font-semibold text-slate-700">Case Pack</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all" 
                placeholder="Case quantity"
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
            <FormLabel className="text-sm font-semibold text-slate-700">Print Mark</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                disabled={!isEditing} 
                className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500/20 transition-all" 
                placeholder="Print marking"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductPackingSection;
