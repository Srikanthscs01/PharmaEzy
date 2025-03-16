
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

interface PurchaseFormProps {
  formData: PurchaseFormData;
  onFormChange: (data: Partial<PurchaseFormData>) => void;
}

const PurchaseForm = ({ formData, onFormChange }: PurchaseFormProps) => {
  const handleChange = (field: keyof PurchaseFormData, value: any) => {
    onFormChange({ [field]: value });
  };

  return (
    <div className="bg-teal-600 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* First column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="supplier" className="text-white w-28">Supplier :</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              className="h-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="remind" className="text-white w-28">Remind :</Label>
            <Checkbox
              id="remind"
              checked={formData.remind}
              onCheckedChange={(checked) => handleChange('remind', checked)}
              className="data-[state=checked]:bg-white data-[state=checked]:text-teal-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="holdStocks" className="text-white w-28">Hold Stocks :</Label>
            <Checkbox
              id="holdStocks"
              checked={formData.holdStocks}
              onCheckedChange={(checked) => handleChange('holdStocks', checked)}
              className="data-[state=checked]:bg-white data-[state=checked]:text-teal-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="company" className="text-white w-28">Company :</Label>
            <Select
              value={formData.company}
              onValueChange={(value) => handleChange('company', value)}
            >
              <SelectTrigger className="h-8">
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
        
        {/* Second column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="invoiceNo" className="text-white w-28">Inv.No :</Label>
            <Input
              id="invoiceNo"
              value={formData.invoiceNo}
              onChange={(e) => handleChange('invoiceNo', e.target.value)}
              className="h-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="lrNo" className="text-white w-28">L.R.No :</Label>
            <Input
              id="lrNo"
              value={formData.lrNo}
              onChange={(e) => handleChange('lrNo', e.target.value)}
              className="h-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="revCharge" className="text-white w-28">Rev.Charge :</Label>
            <Checkbox
              id="revCharge"
              checked={formData.revCharge}
              onCheckedChange={(checked) => handleChange('revCharge', checked)}
              className="data-[state=checked]:bg-white data-[state=checked]:text-teal-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="taxes" className="text-white w-28">Taxes :</Label>
            <Select
              value={formData.taxType}
              onValueChange={(value) => handleChange('taxType', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select tax type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gst">GST</SelectItem>
                <SelectItem value="igst">IGST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Third column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="type" className="text-white w-28">Type :</Label>
            <Select
              value={formData.purchaseType}
              onValueChange={(value) => handleChange('purchaseType', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="entryNo" className="text-white w-28">Entry No :</Label>
            <Input
              id="entryNo"
              value={formData.entryNo}
              onChange={(e) => handleChange('entryNo', e.target.value)}
              className="h-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="date" className="text-white w-28">Date :</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="h-8"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="dueDate" className="text-white w-28">Due Date :</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
