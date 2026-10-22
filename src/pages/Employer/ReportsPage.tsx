import React from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Download, FileText } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const reports = [
    {
      id: 'rep-1',
      title: 'Q3 Enterprise Skill Shortage & Deficit Matrix',
      description: 'Comprehensive analysis of requisition skill demands vs verified candidate pool supply.',
      date: 'Generated Sep 2026',
      size: '2.4 MB',
      format: 'PDF Dossier',
    },
    {
      id: 'rep-2',
      title: 'Monthly Candidate Conversion & Sourcing Velocity Audit',
      description: 'Time-to-interview metrics and pipeline conversion across 10 technical domains.',
      date: 'Generated Aug 2026',
      size: '1.8 MB',
      format: 'PDF Dossier',
    },
    {
      id: 'rep-3',
      title: 'Engineering Domain Competency Benchmark',
      description: 'Standardized skill proficiency distributions across Software, AI/ML, and Embedded Systems.',
      date: 'Generated Aug 2026',
      size: '3.1 MB',
      format: 'PDF Dossier',
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
          Executive Talent Reports
        </h1>
        <p className="text-xs sm:text-sm text-[#667085]">
          Curated analytical reports for engineering directors and talent leaders
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="p-6 rounded-xl bg-white border border-[#E6E7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#C8CAC5] transition-all shadow-xs"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] text-[#2457D6] flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#111318]">{rep.title}</h3>
                <p className="text-xs text-[#667085] leading-relaxed">{rep.description}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#8E98A8] pt-1">
                  <span>{rep.date}</span>
                  <span>•</span>
                  <span>{rep.size}</span>
                  <span>•</span>
                  <span>{rep.format}</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="sm" className="text-xs gap-1.5 flex-shrink-0">
              <Download className="w-3.5 h-3.5" />
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
