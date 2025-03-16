
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';

interface ProductCommentSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
}

const ProductCommentSection = ({ form, isEditing }: ProductCommentSectionProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium underline">Comment:</FormLabel>
            <FormControl>
              <Textarea {...field} disabled={!isEditing} className="input-field" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductCommentSection;
