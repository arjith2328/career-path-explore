import React, { useEffect, useState } from 'react';
import { Progress } from '../ui/Progress';
import { Button } from '../ui/Button';
import { Check, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

interface ProcessingStepsProps {
  fileName: string;
  isCompleted: boolean;
  error?: string | null;
  onRetry?: () => void;
  onProceed?: () => void;
}

const STAGES = [
  { id: 1, title: 'Document Ingestion & Text Extraction', desc: 'Parsing structure, hierarchy, and metadata with zero hallucinations' },
  { id: 2, title: 'Multi-Domain Skill Extraction & Normalization', desc: 'Matching against 10 engineering domain ontologies with quote citations' },
  { id: 3, title: 'Domain Confidence & Multi-Label Classification', desc: 'Computing dynamic relative domain fit distributions' },
  { id: 4, title: 'Deterministic 6-Pillar Career Matching', desc: 'Evaluating skill, experience, project, education, and semantic scores' },
  { id: 5, title: 'Graph Progression & Dynamic Gap Roadmap', desc: 'Generating tailored milestones for candidate missing competencies' },
];

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({
  fileName,
  isCompleted,
  error,
  onRetry,
  onProceed,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    if (error) return;

    if (!isCompleted) {
      const interval = setInterval(() => {
        setCurrentStageIdx((prev) => (prev < STAGES.length - 2 ? prev + 1 : prev));
      }, 700);
      return () => clearInterval(interval);
    } else {
      setCurrentStageIdx(STAGES.length - 1);
    }
  }, [isCompleted, error]);

  const percentage = isCompleted
    ? 100
    : Math.min(92, Math.round(((currentStageIdx + 1) / STAGES.length) * 100));

  return (
    <div className="max-w-md mx-auto space-y-6 py-6 text-left">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#111318]">
          {error
            ? 'Analysis Interrupted'
            : isCompleted
            ? 'Intelligence Pipeline Complete'
            : 'Analyzing Resume Evidence...'}
        </h2>
        <p className="text-xs text-[#8E98A8] font-mono">{fileName}</p>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] text-[#B42318] text-xs space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Engine Encountered An Error</span>
              <p className="mt-1 text-[#667085]">{error}</p>
            </div>
          </div>
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry} className="w-full text-xs">
              Try Again / Choose Another File
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#667085]">
              <span>Pipeline Progress</span>
              <span className="font-bold text-[#111318]">{percentage}%</span>
            </div>
            <Progress value={percentage} size="xs" variant={isCompleted ? 'success' : 'default'} />
          </div>

          {/* Clean Vertical Timeline */}
          <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
            {STAGES.map((stage, idx) => {
              const isDone = isCompleted || idx < currentStageIdx;
              const isCurrent = !isCompleted && idx === currentStageIdx;

              return (
                <div key={stage.id} className="flex items-start gap-3.5 text-xs">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-semibold flex-shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]'
                        : isCurrent
                        ? 'bg-[#111318] text-white'
                        : 'bg-[#F7F7F5] text-[#8E98A8] border border-[#E6E7E5]'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3 h-3" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      stage.id
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-semibold ${
                          isCurrent
                            ? 'text-[#111318]'
                            : isDone
                            ? 'text-[#111318]'
                            : 'text-[#8E98A8]'
                        }`}
                      >
                        {stage.title}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-mono text-[#167A4A]">Verified</span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-[#2457D6]">Processing...</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8E98A8]">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {isCompleted && onProceed && (
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onProceed}
                className="w-full text-xs font-semibold gap-2"
              >
                View Calculated Candidate Dossier
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
