import React from 'react';
import { EmployerCandidateRecord } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Briefcase, Code2, Users } from 'lucide-react';

interface CandidateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: EmployerCandidateRecord[];
}

export const CandidateComparisonModal: React.FC<CandidateComparisonModalProps> = ({
  isOpen,
  onClose,
  candidates
}) => {
  if (candidates.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Candidate Comparison Matrix"
      subtitle={`Comparing ${candidates.length} candidate profiles side-by-side`}
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full text-xs text-[#667085]">
          <span>Decision support matrix · Resume-verified telemetry</span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Comparison
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Candidates Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((cand) => (
            <div key={cand.id} className="p-4 rounded-xl bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#111318] text-white font-mono font-bold text-xs flex items-center justify-center">
                  {cand.avatarFallback}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#111318]">{cand.name}</h3>
                  <span className="text-[11px] text-[#667085] block">{cand.currentTitle}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6E7E5] flex items-center justify-between text-xs font-mono">
                <span className="text-[#667085]">Role Fit:</span>
                <span className="font-bold text-[#167A4A]">{cand.targetRoleMatch.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Table */}
        <div className="rounded-lg border border-[#E6E7E5] bg-white overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAF9] text-[11px] font-mono text-[#667085] uppercase border-b border-[#E6E7E5]">
              <tr>
                <th className="px-4 py-3 w-36">Dimension</th>
                {candidates.map((cand) => (
                  <th key={cand.id} className="px-4 py-3 font-semibold text-[#111318]">
                    {cand.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EF]">
              <tr>
                <td className="px-4 py-3 text-[#667085] font-medium">Domain</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="px-4 py-3 font-mono text-[11px]">
                    {cand.domain}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#667085] font-medium">Experience</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="px-4 py-3 font-mono font-bold text-[#111318]">
                    {cand.experienceYears} Years
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#667085] font-medium">Key Skills</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {cand.topSkills.map((s) => (
                        <span key={s} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#667085] font-medium">Skill Coverage</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="px-4 py-3 font-mono font-semibold text-[#2457D6]">
                    {cand.skillCoverage}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-[#667085] font-medium">Availability</td>
                {candidates.map((cand) => (
                  <td key={cand.id} className="px-4 py-3 font-mono text-[#167A4A]">
                    {cand.availability}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
