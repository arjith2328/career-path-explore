import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface SkillRadarMatchProps {
  data: {
    skill: string;
    candidate: number;
    benchmark: number;
  }[];
}

export const SkillRadarMatch: React.FC<SkillRadarMatchProps> = ({ data }) => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Plus Jakarta Sans' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 10 }}
            stroke="#334155"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#f8fafc',
            }}
          />
          <Radar
            name="Candidate"
            dataKey="candidate"
            stroke="#38bdf8"
            fill="#38bdf8"
            fillOpacity={0.25}
          />
          <Radar
            name="Industry Benchmark"
            dataKey="benchmark"
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.08}
            strokeDasharray="4 4"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
