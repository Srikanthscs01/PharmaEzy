
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import AnimatedBackground from '@/components/AnimatedBackground';
import { MoveUpRight, PackageCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="py-4 px-6 border-b border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60 shadow-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <PackageCheck size={18} className="text-white" />
                </div>
                <h1 className="text-xl font-bold">Product Batch Master</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings size={18} className="text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 py-8 px-6">
        <div className="container max-w-7xl mx-auto">
          <ProductSearch />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-sm text-center text-muted-foreground border-t border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60">
        <div className="container max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Product Batch Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
