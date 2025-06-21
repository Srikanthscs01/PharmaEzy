
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';
import { Search, AlertTriangle } from 'lucide-react';
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Code Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700 flex items-center">
                  Product Code
                  <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!isEditing} 
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all" 
                    onKeyDown={handleCodeKeyDown}
                    placeholder="Enter product code"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* UniCode Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="uniCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-slate-700">UniCode</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!isEditing} 
                    className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all" 
                    placeholder="Enter unique code"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Action Buttons & Status */}
        <div className="flex flex-col justify-between space-y-4">
          <Button 
            type="button" 
            variant="outline" 
            className="h-11 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-200 text-blue-700 font-medium"
            onClick={handleCheckOnline}
            size="default"
          >
            <Search size={16} className="mr-2" />
            Check Online
          </Button>
          
          <div className="flex items-center space-x-3 bg-red-50 p-3 rounded-lg border border-red-100">
            <FormField
              control={form.control}
              name="discontinued"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 m-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      disabled={!isEditing}
                      className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-red-700 m-0 flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    Discontinued
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
      
      {/* Product Name - Full Width */}
      <div className="mt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center">
                Product Name
                <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={!isEditing} 
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all text-lg font-medium" 
                  placeholder="Enter complete product name"
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
