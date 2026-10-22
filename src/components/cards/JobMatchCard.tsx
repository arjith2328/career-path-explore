import React, { useState } from 'react';
import { JobOpportunity } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Building, Check, Sparkles } from 'lucide-react';

interface JobMatchCardProps {
  job: JobOpportunity;
}

export const JobMatchCard: React.FC<JobMatchCardProps> = ({ job }) => {
  const [applied, setApplied] = useState(false);

  return (
    <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 hover:border-[#C8CAC5] transition-all flex flex-col justify-between shadow-xs">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-[#8E98A8]">{job.domain}</span>
            <h3 className="text-base font-bold text-[#111318]">{job.title}</h3>
            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <span className="font-medium text-[#111318]">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#8E98A8]">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-xl font-bold text-[#167A4A]">{job.matchScore}%</span>
            <span className="text-[10px] text-[#8E98A8] block uppercase">Match</span>
          </div>
        </div>

        <p className="text-xs text-[#667085] line-clamp-2">
          {job.matchExplanation}
        </p>

        {/* Competencies */}
        <div className="space-y-1.5 text-xs">
          <div className="flex flex-wrap gap-1">
            {job.candidateMatchedSkills.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]"
              >
                {s}
              </span>
            ))}
            {job.candidateMissingSkills.map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF6EE] text-[#A86400] border border-[#F9DBAF]"
              >
                {s} (Gap)
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#F0F1EF] flex items-center justify-between text-xs font-mono">
        <span className="text-[#667085]">{job.salary}</span>
        <Button
          variant={applied ? 'secondary' : 'primary'}
          size="sm"
          onClick={() => setApplied(true)}
          className="text-xs"
        >
          {applied ? 'Applied' : 'Express Interest'}
        </Button>
      </div>
    </div>
  );
};
