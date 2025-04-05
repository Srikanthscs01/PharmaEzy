
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
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-primary">Code:</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!isEditing} 
                    className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary" 
                    onKeyDown={handleCodeKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="uniCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-primary">UniCode:</FormLabel>
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
        
        <div className="flex items-center justify-between space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
            onClick={handleCheckOnline}
            size="sm"
          >
            <Search size={16} className="mr-1" />
            Check Online
          </Button>
          
          <div className="flex items-center space-x-2 bg-cyan-50/50 dark:bg-cyan-900/20 p-2 rounded-md">
            <FormField
              control={form.control}
              name="discontinued"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel className="font-medium text-destructive m-0">Discontinued:</FormLabel>
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
              <FormLabel className="font-medium text-primary">Product Name:</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={!isEditing} 
                  className="bg-cyan-50/50 dark:bg-cyan-900/20 focus:border-primary font-medium" 
                />
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
