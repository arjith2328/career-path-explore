import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457D6]/20 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      primary: 'bg-[#111318] text-white hover:bg-[#252830] active:bg-[#0A0C10] shadow-xs',
      accent: 'bg-[#2457D6] text-white hover:bg-[#1D48B5] active:bg-[#163894] shadow-xs',
      secondary: 'bg-white text-[#111318] border border-[#E6E7E5] hover:bg-[#F7F7F5] active:bg-[#ECEEEB]',
      outline: 'bg-transparent text-[#111318] border border-[#E6E7E5] hover:bg-[#F7F7F5]',
      ghost: 'bg-transparent text-[#667085] hover:text-[#111318] hover:bg-[#ECEEEB]',
      danger: 'bg-[#FEE4E2] text-[#B42318] hover:bg-[#FECDCA] border border-[#FDA29B]/30',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-9 px-4 text-xs sm:text-sm gap-2',
      lg: 'h-10 sm:h-11 px-6 text-sm gap-2',
      icon: 'h-8 w-8 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
