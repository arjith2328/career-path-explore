import React from 'react';
import { 
  mockEmployerAnalytics, 
  mockEmployerCandidates, 
  mockEmployerPositions 
} from '../../data/mockData';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DomainDistributionChart } from '../../components/charts/DomainDistributionChart';
import {
  Users,
  Building,
  Target,
  Download,
  Plus,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmployerDashboard: React.FC = () => {
  const analytics = mockEmployerAnalytics;
  const candidates = mockEmployerCandidates.slice(0, 5);
  const openPositions = mockEmployerPositions.filter((p) => p.status === 'Open').slice(0, 4);

  return (
    <div className="space-y-10 max-w-5xl">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Talent Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            Real-time candidate telemetry across 10 engineering disciplines
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/employer/reports">
            <Button variant="secondary" size="sm" className="text-xs gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </Button>
          </Link>
          <Link to="/employer/positions">
            <Button variant="primary" size="sm" className="text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              New Requisition
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Compact Inline Metrics with Vertical Dividers */}
      <div className="p-5 rounded-xl bg-white border border-[#E6E7E5] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Total Candidates</span>
          <span className="text-2xl font-bold text-[#111318]">248</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Shortlisted</span>
          <span className="text-2xl font-bold text-[#A86400]">32</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Interview Ready</span>
          <span className="text-2xl font-bold text-[#167A4A]">14</span>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Open Positions</span>
          <span className="text-2xl font-bold text-[#111318]">12</span>
        </div>
      </div>

      {/* 3. Talent Distribution Chart & Open Requisitions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Distribution */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <div>
              <h2 className="text-base font-semibold text-[#111318] tracking-tight">
                Talent Pool Distribution
              </h2>
              <p className="text-xs text-[#667085]">Candidate volume by technical domain</p>
            </div>
            <Link to="/employer/analytics">
              <Button variant="ghost" size="sm" className="text-xs text-[#2457D6]">
                Analytics
              </Button>
            </Link>
          </div>
          <DomainDistributionChart data={analytics.domainDistribution} />
        </div>

        {/* Open Positions List */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Active Requisitions
            </h2>
            <Link to="/employer/positions">
              <Button variant="ghost" size="sm" className="text-xs text-[#2457D6]">
                All ({openPositions.length})
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {openPositions.map((pos) => (
              <div key={pos.id} className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#111318]">{pos.title}</h3>
                  <span className="font-mono text-[11px] text-[#167A4A] font-semibold">{pos.applicantsCount} App</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#667085]">
                  <span>{pos.department}</span>
                  <span className="font-mono">{pos.matchQuality} Fit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Candidate Movement Table */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
          <div>
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Candidate Movement & Recent Profiles
            </h2>
            <p className="text-xs text-[#667085]">Verified competencies evaluated for open roles</p>
          </div>
          <Link to="/employer/candidates">
            <Button variant="ghost" size="sm" className="text-xs text-[#2457D6]">
              View all candidates
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111318]">
            <thead className="bg-[#FAFAF9] text-[11px] font-mono text-[#667085] uppercase border-b border-[#E6E7E5]">
              <tr>
                <th className="px-4 py-3">Candidate</th>
                <th className="px-4 py-3">Domain</th>
                <th className="px-4 py-3">Top Skills</th>
                <th className="px-4 py-3">Role Match</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EF]">
              {candidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-[#FAFAF9] transition-colors">
                  <td className="px-4 py-3.5 font-semibold text-[#111318]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#111318] text-white font-mono text-[10px] flex items-center justify-center">
                        {cand.avatarFallback}
                      </div>
                      <div>
                        <span>{cand.name}</span>
                        <span className="text-[11px] text-[#8E98A8] block font-normal">{cand.experienceYears}y exp</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#667085] font-mono text-[11px]">
                    {cand.domain}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {cand.topSkills.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono">
                    <span className="font-bold text-[#167A4A]">{cand.targetRoleMatch.percentage}%</span>
                    <span className="text-[10px] text-[#8E98A8] block font-sans">{cand.targetRoleMatch.roleTitle}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Badge variant={cand.status === 'Interview' ? 'success' : cand.status === 'Shortlisted' ? 'warning' : 'neutral'} size="sm">
                      {cand.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
