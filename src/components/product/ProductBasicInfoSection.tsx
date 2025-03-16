
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';
import { Search } from 'lucide-react';
import ProductSearchDialog from './ProductSearchDialog';

interface ProductBasicInfoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  isEditing: boolean;
  onSelectProduct?: (productData: Partial<ProductFormValues>) => void;
}

const ProductBasicInfoSection = ({ 
  form, 
  isEditing,
  onSelectProduct 
}: ProductBasicInfoSectionProps) => {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleCodeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isEditing && onSelectProduct) {
      e.preventDefault();
      setSearchDialogOpen(true);
    }
  };

  const handleCheckOnline = () => {
    console.log('Check Online clicked');
    // Implement online check functionality
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium underline">Code:</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!isEditing} 
                    className="input-field" 
                    onKeyDown={handleCodeKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="uniCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium underline">UniCode:</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} className="input-field" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            type="button" 
            variant="link" 
            className="text-blue-600 hover:text-blue-800"
            onClick={handleCheckOnline}
          >
            Check Online (F8)
          </Button>
          
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="discontinued"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel className="font-medium underline">Discontinued:</FormLabel>
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      disabled={!isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      
      <div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium underline">Name:</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} className="input-field" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {onSelectProduct && (
        <ProductSearchDialog 
          open={searchDialogOpen} 
          onOpenChange={setSearchDialogOpen}
          onSelectProduct={onSelectProduct}
        />
      )}
    </>
  );
};

export default ProductBasicInfoSection;
