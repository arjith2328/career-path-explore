import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'sm',
  variant = 'default',
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
  };

  const variants = {
    default: 'bg-[#111318]',
    info: 'bg-[#2457D6]',
    success: 'bg-[#167A4A]',
    warning: 'bg-[#A86400]',
    danger: 'bg-[#B42318]',
  };

  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-[#EAEBE9]', sizes[size], className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={cn('h-full transition-all duration-300 rounded-full', variants[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
