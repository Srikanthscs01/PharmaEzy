
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PurchaseFormData } from './types';
import { Store, Tag, Building, Truck, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PurchaseFormProps {
  formData: PurchaseFormData;
  onFormChange: (data: Partial<PurchaseFormData>) => void;
}

const PurchaseForm = ({ formData, onFormChange }: PurchaseFormProps) => {
  const handleChange = (field: keyof PurchaseFormData, value: any) => {
    onFormChange({ [field]: value });
  };

  return (
    <Card className="border-teal-200 shadow-md bg-gradient-to-b from-teal-50 to-teal-100">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* First column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-200 p-2 rounded text-teal-700">
                <Store size={18} />
              </div>
              <div className="flex-1">
                <Label htmlFor="supplier" className="text-sm text-gray-600 font-medium mb-1 block">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remind"
                  checked={formData.remind}
                  onCheckedChange={(checked) => handleChange('remind', checked)}
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:text-white"
                />
                <Label htmlFor="remind" className="text-sm text-gray-600">Remind</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="holdStocks"
                  checked={formData.holdStocks}
                  onCheckedChange={(checked) => handleChange('holdStocks', checked)}
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:text-white"
                />
                <Label htmlFor="holdStocks" className="text-sm text-gray-600">Hold Stocks</Label>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-teal-200 p-2 rounded text-teal-700">
                <Building size={18} />
              </div>
              <div className="flex-1">
                <Label htmlFor="company" className="text-sm text-gray-600 font-medium mb-1 block">Company</Label>
                <Select
                  value={formData.company}
                  onValueChange={(value) => handleChange('company', value)}
                >
                  <SelectTrigger className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="company1">Company 1</SelectItem>
                    <SelectItem value="company2">Company 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Second column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-teal-200 p-2 rounded text-teal-700">
                <Tag size={18} />
              </div>
              <div className="flex-1">
                <Label htmlFor="invoiceNo" className="text-sm text-gray-600 font-medium mb-1 block">Invoice Number</Label>
                <Input
                  id="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={(e) => handleChange('invoiceNo', e.target.value)}
                  className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                  placeholder="Enter invoice number"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-teal-200 p-2 rounded text-teal-700">
                <Truck size={18} />
              </div>
              <div className="flex-1">
                <Label htmlFor="lrNo" className="text-sm text-gray-600 font-medium mb-1 block">L.R. Number</Label>
                <Input
                  id="lrNo"
                  value={formData.lrNo}
                  onChange={(e) => handleChange('lrNo', e.target.value)}
                  className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                  placeholder="Enter LR number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="revCharge"
                  checked={formData.revCharge}
                  onCheckedChange={(checked) => handleChange('revCharge', checked)}
                  className="data-[state=checked]:bg-teal-500 data-[state=checked]:text-white"
                />
                <Label htmlFor="revCharge" className="text-sm text-gray-600">Rev. Charge</Label>
              </div>
              
              <div>
                <Label htmlFor="taxes" className="text-sm text-gray-600 font-medium mb-1 block">Tax Type</Label>
                <Select
                  value={formData.taxType}
                  onValueChange={(value) => handleChange('taxType', value)}
                >
                  <SelectTrigger className="h-9 bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200">
                    <SelectValue placeholder="Select tax" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gst">GST</SelectItem>
                    <SelectItem value="igst">IGST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Third column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="type" className="text-sm text-gray-600 font-medium mb-1 block">Purchase Type</Label>
                <Select
                  value={formData.purchaseType}
                  onValueChange={(value) => handleChange('purchaseType', value)}
                >
                  <SelectTrigger className="w-40 h-9 bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="entryNo" className="text-sm text-gray-600 font-medium mb-1 block">Entry No</Label>
                <Input
                  id="entryNo"
                  value={formData.entryNo}
                  onChange={(e) => handleChange('entryNo', e.target.value)}
                  className="w-40 h-9 bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-teal-200 p-2 rounded text-teal-700">
                <CalendarDays size={18} />
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div>
                  <Label htmlFor="date" className="text-sm text-gray-600 font-medium mb-1 block">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dueDate" className="text-sm text-gray-600 font-medium mb-1 block">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                    className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <Label htmlFor="lrDate" className="text-sm text-gray-600 font-medium mb-1 block">LR Date</Label>
              <Input
                id="lrDate"
                type="date"
                value={formData.lrDate}
                onChange={(e) => handleChange('lrDate', e.target.value)}
                className="bg-white border-teal-200 focus:border-teal-500 focus:ring-teal-200"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseForm;
