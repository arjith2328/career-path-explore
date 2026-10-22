import React from 'react';
import { mockEmployerAnalytics } from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { DomainDistributionChart } from '../../components/charts/DomainDistributionChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Download } from 'lucide-react';

const EXP_COLORS = ['#111318', '#475467', '#8E98A8', '#C8CAC5'];

export const TalentAnalyticsPage: React.FC = () => {
  const analytics = mockEmployerAnalytics;

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Talent & Competency Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            Real-time telemetry on candidate supply, experience depth, and skill shortages
          </p>
        </div>

        <Button variant="secondary" size="sm" className="text-xs gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Export Brief (PDF)
        </Button>
      </div>

      {/* Inline KPI Metrics with Vertical Dividers */}
      <div className="p-5 rounded-xl bg-white border border-[#E6E7E5] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Total Evaluated</span>
          <span className="text-2xl font-bold text-[#111318]">{analytics.totalCandidates}</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Avg Coverage</span>
          <span className="text-2xl font-bold text-[#167A4A]">{analytics.overallSkillCoverage}%</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Top Supply</span>
          <span className="text-2xl font-bold text-[#111318]">Python <span className="text-xs text-[#8E98A8] font-normal">(198)</span></span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Critical Shortage</span>
          <span className="text-2xl font-bold text-[#B42318]">MLOps <span className="text-xs text-[#8E98A8] font-normal">(34%)</span></span>
        </div>
      </div>

      {/* Grid: Domain Distribution & Experience Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domain Distribution */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <div>
              <h2 className="text-base font-semibold text-[#111318] tracking-tight">
                Domain Distribution
              </h2>
              <p className="text-xs text-[#667085]">Evaluated candidate volume by discipline</p>
            </div>
            <span className="text-xs font-mono text-[#8E98A8]">6 Domains</span>
          </div>
          <DomainDistributionChart data={analytics.domainDistribution} />
        </div>

        {/* Experience Distribution */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <div>
              <h2 className="text-base font-semibold text-[#111318] tracking-tight">
                Experience Tier Distribution
              </h2>
              <p className="text-xs text-[#667085]">Candidate pool breakdown by verified years</p>
            </div>
            <span className="text-xs font-mono text-[#8E98A8]">4 Tiers</span>
          </div>

          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.experienceDistribution}
                margin={{ top: 15, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F1EF" />
                <XAxis dataKey="range" stroke="#8E98A8" tick={{ fill: '#667085', fontSize: 11 }} />
                <YAxis stroke="#8E98A8" tick={{ fill: '#667085', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E6E7E5',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#111318',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                  formatter={(val: any) => [`${val} Candidates`, 'Volume']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                  {analytics.experienceDistribution.map((_, index) => (
                    <Cell key={`cell-exp-${index}`} fill={EXP_COLORS[index % EXP_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Skills & Deficits Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Top Verified Competencies
            </h2>
            <Badge variant="default">Top 6</Badge>
          </div>

          <div className="space-y-3.5">
            {analytics.topSkillsDistribution.map((item) => (
              <div key={item.skill} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111318]">{item.skill}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-[#8E98A8]">{item.candidateCount} Cands</span>
                    <span className="text-[#167A4A] font-bold">{item.avgProficiency}%</span>
                  </div>
                </div>
                <Progress value={item.avgProficiency} size="xs" variant="default" />
              </div>
            ))}
          </div>
        </div>

        {/* Skill Shortages */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Skill Shortages & Deficits
            </h2>
            <Badge variant="warning">Deficit Radar</Badge>
          </div>

          <div className="space-y-3">
            {analytics.skillDemandVsSupply.map((item) => (
              <div key={item.skill} className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-1 text-xs font-mono">
                <div className="flex items-center justify-between font-sans">
                  <span className="font-bold text-[#111318]">{item.skill}</span>
                  <Badge variant={item.shortageRisk === 'High' ? 'danger' : item.shortageRisk === 'Moderate' ? 'warning' : 'success'} size="sm">
                    {item.shortageRisk} Risk
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <span className="text-[#B42318]">Demand: {item.demandPercent}%</span>
                  <span className="text-[#2457D6]">Supply: {item.supplyPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
