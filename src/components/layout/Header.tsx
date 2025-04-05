
import React from 'react';
import { Settings, Tablets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopNavigation from './TopNavigation';

const Header = () => {
  return (
    <header className="py-4 px-6 border-b border-border bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 shadow-sm sticky top-0 z-10">
      <div className="container max-w-full mx-auto">
        <div className="flex flex-col gap-4">
          {/* App Title and Settings */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Tablets size={16} className="text-white" />
              </div>
              <h1 className="text-lg font-bold">Pharma Central</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings size={18} className="text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <TopNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
