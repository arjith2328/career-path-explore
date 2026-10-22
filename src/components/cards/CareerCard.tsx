import React from 'react';
import { CareerRoleFit } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CareerCardProps {
  career: CareerRoleFit;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
  return (
    <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 hover:border-[#C8CAC5] transition-all flex flex-col justify-between shadow-xs">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF9] text-[#667085] border border-[#E6E7E5]">
              {career.domain}
            </span>
            <h3 className="text-base font-bold text-[#111318]">{career.roleTitle}</h3>
          </div>
          <div className="text-right font-mono">
            <span className="text-2xl font-bold text-[#167A4A]">{career.fitPercentage}%</span>
            <span className="text-[10px] text-[#8E98A8] block uppercase">Fit Score</span>
          </div>
        </div>

        <p className="text-xs text-[#667085] leading-relaxed line-clamp-2">
          {career.whyThisMatch}
        </p>

        {/* Competencies */}
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] font-mono uppercase text-[#8E98A8]">Strong Skills</span>
          <div className="flex flex-wrap gap-1">
            {career.alignedSkills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]"
              >
                {s}
              </span>
            ))}
            {career.alignedSkills.length > 3 && (
              <span className="text-[10px] font-mono text-[#8E98A8] self-center">
                +{career.alignedSkills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#F0F1EF] flex items-center justify-between text-xs font-mono">
        <span className="text-[#667085]">{career.salaryRange.median} / yr</span>
        <Link to={`/candidate/career/${career.id}`}>
          <Button variant="secondary" size="sm" className="text-xs gap-1">
            Explainable Match
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
