
import React from 'react';
import { DollarSign } from 'lucide-react';

const SalesHeader = () => {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-primary p-1.5 rounded-md shadow">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">Sales</h1>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span>Today: {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
};

export default SalesHeader;
