
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, DollarSign, Receipt } from 'lucide-react';

const TabNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-white/60 backdrop-blur-md dark:bg-gray-900/60 border-b border-border py-2 px-6 sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto flex justify-center">
        <Tabs value={currentPath} className="w-full max-w-md">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="/sales" asChild>
              <Link to="/sales" className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>Sales</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="/purchases" asChild>
              <Link to="/purchases" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                <span>Purchases</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="/receipts" asChild>
              <Link to="/receipts" className="flex items-center gap-2">
                <Receipt size={16} />
                <span>Receipts</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNavigation;
