import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface DomainDistributionChartProps {
  data: {
    domain: string;
    count: number;
    avgMatch?: number;
    percentage?: number;
  }[];
}

const COLORS = [
  '#38bdf8', // sky
  '#10b981', // emerald
  '#f59e0b', // amber
  '#a855f7', // purple
  '#ec4899', // pink
  '#6366f1', // indigo
];

export const DomainDistributionChart: React.FC<DomainDistributionChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
          <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="domain"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            width={140}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#f8fafc',
            }}
            formatter={(value: any) => [`${value} Candidates`, 'Volume']}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
