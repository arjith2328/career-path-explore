import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', leftIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-[#8E98A8]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-lg border border-[#E6E7E5] bg-white px-3 py-1 text-xs sm:text-sm text-[#111318] placeholder:text-[#8E98A8] transition-colors focus:border-[#2457D6] focus:outline-none focus:ring-1 focus:ring-[#2457D6] disabled:cursor-not-allowed disabled:opacity-50',
            leftIcon && 'pl-9',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
