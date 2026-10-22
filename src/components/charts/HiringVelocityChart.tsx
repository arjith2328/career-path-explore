import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface HiringVelocityChartProps {
  data: {
    month: string;
    sourced: number;
    interviewed: number;
    placed: number;
  }[];
}

export const HiringVelocityChart: React.FC<HiringVelocityChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSourced" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInterviewed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#f8fafc',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '10px' }}
          />
          <Area
            type="monotone"
            dataKey="sourced"
            name="Sourced Talent"
            stroke="#38bdf8"
            fillOpacity={1}
            fill="url(#colorSourced)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="interviewed"
            name="Screened / Interviewed"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorInterviewed)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
