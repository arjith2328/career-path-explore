import React, { useState } from 'react';
import { CareerPathway } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Progress } from '../ui/Progress';
import { getDomainColor } from '../../lib/utils';
import { Check, ChevronRight, Target, Award, ArrowDown } from 'lucide-react';

interface CareerPathFlowProps {
  pathway: CareerPathway;
}

export const CareerPathFlow: React.FC<CareerPathFlowProps> = ({ pathway }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);
  const domainColors = getDomainColor(pathway.domain);
  const activeStep = pathway.steps[selectedStepIndex] || pathway.steps[0];

  return (
    <div className="space-y-6">
      {/* Path Header */}
      <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-medium px-2 py-0.5 rounded border ${domainColors.badge}`}>
              {pathway.domain}
            </span>
            <span className="text-xs text-slate-400 font-mono">Horizon: {pathway.timeframe}</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">{pathway.title}</h2>
          <p className="text-xs text-slate-400 max-w-2xl">{pathway.description}</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded border border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Current</span>
            <span className="text-xs font-semibold text-slate-200">{pathway.currentRole}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-mono text-sky-400 block">Target Horizon</span>
            <span className="text-xs font-semibold text-sky-300">{pathway.targetRole}</span>
          </div>
        </div>
      </div>

      {/* Progression Flow Stepper (Linear & Precise Map) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {pathway.steps.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          const isCurrent = step.status === 'Current Level';
          const isCompleted = step.status === 'Completed';
          const isNext = step.status === 'Next Target';

          return (
            <button
              key={step.id}
              onClick={() => setSelectedStepIndex(idx)}
              className={`text-left p-3.5 rounded-lg border transition-all relative flex flex-col justify-between group ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500 ring-1 ring-sky-500 shadow-md'
                  : isCurrent
                  ? 'bg-slate-900/90 border-sky-500/40 hover:border-slate-600'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {step.level}
                  </span>
                  {isCompleted && (
                    <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Current
                    </span>
                  )}
                  {isNext && (
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Target
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-100 group-hover:text-sky-300 line-clamp-2">
                  {step.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">
                  {step.yearsOfExperienceRange}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block truncate">
                  {step.typicalCompensation}
                </span>
              </div>

              {/* Arrow indicator for desktop layout */}
              {idx < pathway.steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Milestone Card for Active Selected Step */}
      <Card className="bg-slate-900/90 border-slate-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                {activeStep.level}
              </span>
              <span className="text-xs text-slate-400 font-mono">{activeStep.yearsOfExperienceRange}</span>
              <Badge variant={activeStep.status === 'Completed' ? 'success' : activeStep.status === 'Current Level' ? 'info' : 'neutral'}>
                {activeStep.status}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-white">{activeStep.title}</h3>
            <p className="text-sm text-slate-400">{activeStep.focusArea}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800/80">
            <div>
              <span className="text-[11px] text-slate-400 font-mono block">Typical Compensation</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {activeStep.typicalCompensation}
              </span>
            </div>
            {activeStep.readinessScore !== undefined && (
              <div className="pl-4 border-l border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Readiness Score</span>
                <span className="text-base font-bold font-mono text-white">
                  {activeStep.readinessScore}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          {/* Key Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              Core Accountabilities & Responsibilities
            </h4>
            <div className="space-y-2">
              {activeStep.keyResponsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Competencies & Bridge Skills */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-300 flex items-center gap-1.5 mb-3">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                Required Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeStep.coreCompetencies.map((comp) => (
                  <span
                    key={comp}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800/90 space-y-2">
              <span className="text-xs font-semibold uppercase font-mono text-sky-400 block">
                Key Strategic Bridge Skills for Next Leap
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pathway.bridgeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
