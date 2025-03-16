
import { ProductBatch } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  DollarSign, 
  Package, 
  Percent, 
  ShoppingCart, 
  Truck, 
  Hash, 
  Tag,
  AlertTriangle
} from 'lucide-react';

interface ProductBatchDetailProps {
  batch: ProductBatch | null;
}

const DetailField = ({ 
  label, 
  value, 
  icon,
  isHighlighted = false,
  tooltip
}: { 
  label: string; 
  value: string | number | undefined; 
  icon?: React.ReactNode;
  isHighlighted?: boolean;
  tooltip?: string;
}) => (
  <div className="flex flex-col space-y-1" title={tooltip}>
    <span className="text-xs text-muted-foreground flex items-center">
      {icon && <span className="mr-1 text-muted-foreground/70">{icon}</span>}
      {label}
    </span>
    <span className={cn(
      "text-sm font-medium", 
      isHighlighted ? "text-teal-600 dark:text-teal-400" : ""
    )}>
      {value !== undefined ? value : '-'}
    </span>
  </div>
);

const ProductBatchDetail = ({ batch }: ProductBatchDetailProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation on batch change
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(!!batch);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [batch]);

  if (!batch) {
    return (
      <div className="rounded-xl border border-border bg-white/60 dark:bg-gray-900/50 backdrop-blur-sm p-6 h-full flex items-center justify-center shadow-lg">
        <p className="text-muted-foreground text-center">Select a batch to view details</p>
      </div>
    );
  }

  const isExpired = new Date(batch.expiry.split('/').reverse().join('-')) < new Date();

  return (
    <div className={cn(
      "rounded-xl border border-border bg-white/60 dark:bg-gray-900/50 backdrop-blur-sm p-6 h-full",
      "transition-all duration-300 ease-out shadow-lg",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1 flex items-center">
          <span className="teal-gradient inline-block w-2 h-4 mr-2 rounded-sm"></span>
          Batch Details
        </h3>
        <div className="text-sm text-muted-foreground flex items-center justify-between">
          <div>
            Batch <span className="font-medium text-foreground">{batch.batchNo}</span>
          </div>
          {isExpired && (
            <div className="flex items-center text-amber-600 dark:text-amber-500 gap-1 text-xs">
              <AlertTriangle size={14} />
              <span>Expired</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="col-span-2 md:col-span-4 pt-2 pb-4 border-b border-border">
          <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Basic Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <DetailField label="Batch No" value={batch.batchNo} icon={<Hash size={14} />} isHighlighted />
            <DetailField label="Bar Code" value={batch.barCode} icon={<Hash size={14} />} />
            <DetailField 
              label="Expiry" 
              value={batch.expiry} 
              icon={<Calendar size={14} />} 
              isHighlighted={isExpired}
              tooltip={isExpired ? "This batch has expired" : ""}
            />
            <DetailField label="Type" value={batch.type || "Standard"} icon={<Tag size={14} />} />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-4 pt-2 pb-4 border-b border-border">
          <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Pricing Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <DetailField 
              label="Bill Price" 
              value={`₹${batch.billPrice.toFixed(2)}`} 
              icon={<DollarSign size={14} />} 
              isHighlighted
            />
            <DetailField 
              label="M.R.P" 
              value={`₹${batch.mrp.toFixed(2)}`} 
              icon={<DollarSign size={14} />} 
              isHighlighted
            />
            <DetailField 
              label="Purchase Price" 
              value={batch.purPrice ? `₹${batch.purPrice.toFixed(2)}` : '-'} 
              icon={<DollarSign size={14} />} 
            />
            <DetailField 
              label="Cost Price" 
              value={batch.costPrice ? `₹${batch.costPrice.toFixed(2)}` : '-'} 
              icon={<DollarSign size={14} />} 
            />
            <DetailField 
              label="Special Price" 
              value={batch.specialPrice ? `₹${batch.specialPrice.toFixed(2)}` : '-'} 
              icon={<DollarSign size={14} />} 
            />
            <DetailField 
              label="Stockist Price" 
              value={batch.stockistPrice ? `₹${batch.stockistPrice.toFixed(2)}` : '-'} 
              icon={<DollarSign size={14} />} 
            />
            <DetailField 
              label="A.C. Price" 
              value={batch.acPrice ? `₹${batch.acPrice.toFixed(2)}` : '-'} 
              icon={<DollarSign size={14} />} 
            />
            <DetailField 
              label="GST %" 
              value={batch.gstPct ? `${batch.gstPct}%` : '-'} 
              icon={<Percent size={14} />} 
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-4 pt-2 pb-4 border-b border-border">
          <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Quantity & Discounts</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <DetailField 
              label="Quantity" 
              value={batch.qty.toFixed(1)} 
              icon={<Package size={14} />}
              isHighlighted 
            />
            <DetailField 
              label="Qit" 
              value={batch.qit.toFixed(1)} 
              icon={<Package size={14} />} 
            />
            <DetailField 
              label="Free Qty" 
              value={batch.freeQty} 
              icon={<Package size={14} />} 
            />
            <DetailField 
              label="Scheme %" 
              value={batch.schemePct ? `${batch.schemePct}%` : '-'} 
              icon={<Percent size={14} />} 
            />
            <DetailField 
              label="Discount %" 
              value={batch.disPct ? `${batch.disPct}%` : '-'} 
              icon={<Percent size={14} />} 
              isHighlighted={!!batch.disPct && batch.disPct > 0}
            />
            <DetailField 
              label="Add. Discount %" 
              value={batch.addDisPct ? `${batch.addDisPct}%` : '-'} 
              icon={<Percent size={14} />} 
            />
            <DetailField 
              label="Retailer Margin %" 
              value={batch.retailerMarginPct ? `${batch.retailerMarginPct}%` : '-'} 
              icon={<Percent size={14} />} 
              isHighlighted={!!batch.retailerMarginPct && batch.retailerMarginPct > 0}
            />
            <DetailField 
              label="Margin %" 
              value={batch.marginPct ? `${batch.marginPct}%` : '-'} 
              icon={<Percent size={14} />} 
            />
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-4 pt-2">
          <h4 className="text-xs font-medium uppercase text-muted-foreground mb-3">Purchase Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            <DetailField 
              label="Purchase No" 
              value={batch.purNo} 
              icon={<ShoppingCart size={14} />} 
              isHighlighted
            />
            <DetailField 
              label="Invoice No" 
              value={batch.invNo} 
              icon={<ShoppingCart size={14} />} 
            />
            <DetailField 
              label="Purchase Date" 
              value={batch.purDate} 
              icon={<Calendar size={14} />} 
            />
            <DetailField 
              label="Received Date" 
              value={batch.rcvdDate} 
              icon={<Calendar size={14} />} 
            />
            <DetailField 
              label="From" 
              value={batch.from} 
              icon={<Truck size={14} />} 
            />
            <DetailField 
              label="R. No" 
              value={batch.rNo}
              icon={<Hash size={14} />} 
            />
            <DetailField 
              label="Supplier" 
              value={batch.supplier} 
              icon={<Truck size={14} />} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBatchDetail;
