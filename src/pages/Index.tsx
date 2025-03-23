
import { useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ProductSidebar from '@/components/product/ProductSidebar';

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <ProductSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="py-4 px-6 border-b border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60 shadow-sm sticky top-0 z-10">
            <div className="container max-w-7xl mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <SidebarTrigger className="mr-3" />
                  <h1 className="text-xl font-bold">Product Search</h1>
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
          <div className="relative flex-1">
            <AnimatedBackground />
            <main className="relative z-10 flex-1 py-8 px-6">
              <div className="container max-w-7xl mx-auto">
                <ProductSearch />
              </div>
            </main>
          </div>
          
          {/* Footer */}
          <footer className="py-4 px-6 text-sm text-center text-muted-foreground border-t border-border bg-white/60 backdrop-blur-md dark:bg-gray-900/60">
            <div className="container max-w-7xl mx-auto">
              <p>© {new Date().getFullYear()} Pharma Central. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
