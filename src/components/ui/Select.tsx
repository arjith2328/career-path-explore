import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          className={cn(
            'flex h-9 w-full appearance-none rounded-lg border border-[#E6E7E5] bg-white px-3 py-1 pr-8 text-xs sm:text-sm text-[#111318] transition-colors focus:border-[#2457D6] focus:outline-none focus:ring-1 focus:ring-[#2457D6] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-[#8E98A8] pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';
