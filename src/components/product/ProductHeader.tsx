
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const ProductHeader = () => {
  return (
    <header className="py-4 px-6 border-b border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60 shadow-sm sticky top-0 z-10">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-xl font-bold">Product Master</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings size={18} className="text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
