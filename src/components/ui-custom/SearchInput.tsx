
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  autoFocus?: boolean;
}

const SearchInput = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  className,
  autoFocus = false,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'relative flex items-center w-full transition-all duration-200',
        isFocused ? 'scale-[1.01]' : 'scale-100',
        className
      )}
    >
      <div className="absolute left-3 text-muted-foreground">
        <Search size={18} className={cn('transition-all', isFocused ? 'text-primary' : '')} />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'w-full h-11 pl-10 pr-10 rounded-xl text-sm',
          'bg-white dark:bg-gray-800/50',
          'border border-border',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50',
          'transition-all duration-200 ease-in-out',
          'placeholder:text-muted-foreground/70',
          isFocused ? 'shadow-md shadow-primary/5' : '',
          className
        )}
      />
      
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
