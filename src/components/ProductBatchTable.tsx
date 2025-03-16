
import { useState, useEffect } from 'react';
import { ProductBatch } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ChevronRight, Calendar, DollarSign } from 'lucide-react';

interface ProductBatchTableProps {
  batches: ProductBatch[];
  onSelectBatch: (batch: ProductBatch) => void;
  selectedBatchNo?: string;
}

const ProductBatchTable = ({ batches, onSelectBatch, selectedBatchNo }: ProductBatchTableProps) => {
  const [animatedBatches, setAnimatedBatches] = useState<ProductBatch[]>([]);

  useEffect(() => {
    // Staggered animation effect for table rows
    setAnimatedBatches([]);
    const timeout = setTimeout(() => {
      setAnimatedBatches(batches);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [batches]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-white/60 backdrop-blur-sm dark:bg-gray-900/50 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/70 dark:bg-gray-800/70">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Batch No
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center justify-end gap-1">
                  <DollarSign size={12} />
                  Bill Price
                </span>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center justify-end gap-1">
                  <DollarSign size={12} />
                  M.R.P
                </span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center justify-center gap-1">
                  <Calendar size={12} />
                  Expiry
                </span>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Qty
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Qit
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pur.No
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center justify-center gap-1">
                  <Calendar size={12} />
                  Pur.Date
                </span>
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center justify-center gap-1">
                  <Calendar size={12} />
                  Rcvd.Date
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                From
              </th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="stagger-animation divide-y divide-border bg-transparent">
            {animatedBatches.length === 0 ? (
              // Skeleton loading rows
              Array.from({ length: 3 }).map((_, index) => (
                <tr key={`skeleton-${index}`} className="animate-pulse">
                  {Array.from({ length: 10 }).map((_, cellIndex) => (
                    <td key={`skeleton-cell-${index}-${cellIndex}`} className="px-4 py-3">
                      <div className="h-4 bg-muted rounded"></div>
                    </td>
                  ))}
                  <td className="w-10"></td>
                </tr>
              ))
            ) : animatedBatches.length > 0 ? (
              animatedBatches.map((batch, index) => {
                const isExpired = new Date(batch.expiry.split('/').reverse().join('-')) < new Date();
                return (
                  <tr 
                    key={batch.batchNo}
                    onClick={() => onSelectBatch(batch)}
                    className={cn(
                      "fade-up transition-colors cursor-pointer hover:bg-primary/5",
                      selectedBatchNo === batch.batchNo ? "bg-primary/10 hover:bg-primary/15" : "",
                      index % 2 === 0 ? "bg-white/40 dark:bg-gray-800/30" : "bg-white/20 dark:bg-transparent"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{batch.batchNo}</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">{batch.billPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">{batch.mrp.toFixed(2)}</td>
                    <td className={cn(
                      "px-4 py-3 text-sm text-center",
                      isExpired ? "text-destructive font-medium" : ""
                    )}>
                      {batch.expiry}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-mono">{batch.qty.toFixed(1)}</td>
                    <td className="px-4 py-3 text-sm text-right font-mono">{batch.qit.toFixed(1)}</td>
                    <td className="px-4 py-3 text-sm">{batch.purNo}</td>
                    <td className="px-4 py-3 text-sm text-center">{batch.purDate}</td>
                    <td className="px-4 py-3 text-sm text-center">{batch.rcvdDate}</td>
                    <td className="px-4 py-3 text-sm">{batch.from}</td>
                    <td className="w-10 px-2">
                      <ChevronRight size={16} className={cn(
                        "text-muted-foreground transition-transform duration-200",
                        selectedBatchNo === batch.batchNo ? "text-primary transform rotate-90" : ""
                      )} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-muted-foreground">
                  No batches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductBatchTable;
