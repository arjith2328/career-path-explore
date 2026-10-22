import React from 'react';
import { SkillCategoryGroup } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { getProficiencyBadge } from '../../lib/utils';
import { CheckCircle2, Clock, AlertTriangle, Layers, Quote, ShieldCheck } from 'lucide-react';

interface SkillMatrixCardProps {
  category: SkillCategoryGroup;
  filterStatus?: string;
}

export const SkillMatrixCard: React.FC<SkillMatrixCardProps> = ({ category, filterStatus }) => {
  const filteredSkills = category.skills.filter((skill) => {
    if (!filterStatus || filterStatus === 'all') return true;
    return skill.status.toLowerCase() === filterStatus.toLowerCase();
  });

  if (filteredSkills.length === 0) return null;

  return (
    <Card className="flex flex-col h-full border-slate-800 bg-slate-900/80">
      <CardHeader className="pb-3 mb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-slate-800 text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-slate-100">
                {category.name}
              </CardTitle>
              <span className="text-[11px] text-slate-400 font-mono">{category.domain}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-bold font-mono text-white">
              {category.overallCoverage}%
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">Coverage</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1 text-emerald-400 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            <span>{category.strongCount} Strong</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-mono">
            <Clock className="w-3 h-3" />
            <span>{category.developingCount} Developing</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-mono">
            <AlertTriangle className="w-3 h-3" />
            <span>{category.missingCount} Missing</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1">
        {filteredSkills.map((skill) => {
          const prof = getProficiencyBadge(skill.status);
          return (
            <div
              key={skill.id}
              className="p-3.5 rounded-md bg-slate-950/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-100">{skill.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${prof.badge}`}>
                      {prof.label}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                      skill.evidenceType === 'Explicitly Detected'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : skill.evidenceType === 'Inferred'
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                    }`}>
                      {skill.evidenceType}
                    </span>
                  </div>

                  {skill.sourceQuote && (
                    <div className="flex items-start gap-1.5 text-[11px] text-slate-400 italic">
                      <Quote className="w-3 h-3 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">&quot;{skill.sourceQuote}&quot;</span>
                    </div>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {skill.score}%
                  </span>
                  {skill.confidence !== 'N/A' && (
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Conf: {skill.confidence}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress & Benchmark */}
              <div className="space-y-1">
                <Progress
                  value={skill.score}
                  size="sm"
                  variant={skill.status === 'Strong' ? 'success' : skill.status === 'Developing' ? 'warning' : 'default'}
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>
                    {skill.yearsOfExperience ? `${skill.yearsOfExperience} yrs exp` : 'No direct exp detected'}
                  </span>
                  {skill.industryBenchmark && (
                    <span>Benchmark: {skill.industryBenchmark}%</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
