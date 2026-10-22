import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded font-mono select-none tracking-tight';

  const variants = {
    default: 'bg-[#F0F1EF] text-[#111318] border border-[#E6E7E5]',
    neutral: 'bg-[#F7F7F5] text-[#667085] border border-[#E6E7E5]',
    success: 'bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]',
    warning: 'bg-[#FEF6EE] text-[#A86400] border border-[#F9DBAF]',
    danger: 'bg-[#FEE4E2] text-[#B42318] border border-[#FECDCA]',
    info: 'bg-[#EDF2FE] text-[#2457D6] border border-[#D0DEFC]',
    outline: 'bg-transparent text-[#667085] border border-[#E6E7E5]',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 leading-none',
    md: 'text-[11px] px-2 py-0.5 leading-tight',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
