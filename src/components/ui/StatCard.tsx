import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Card } from './Card';

export interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: ReactNode;
  className?: string;
  badge?: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend,
  icon,
  className,
  badge
}) => {
  return (
    <Card className={cn('relative overflow-hidden p-4 sm:p-5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        {icon && <div className="text-slate-400 p-1.5 rounded-md bg-slate-800/60 border border-slate-700/50">{icon}</div>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">{value}</span>
          {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
        </div>
        {badge}
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              'font-medium font-mono',
              trend.isNeutral
                ? 'text-slate-400'
                : trend.isPositive
                ? 'text-emerald-400'
                : 'text-rose-400'
            )}
          >
            {trend.value}
          </span>
          <span className="text-slate-400">vs benchmark</span>
        </div>
      )}
    </Card>
  );
};
