import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  CheckCircle2,
  BookOpen,
  Cloud,
  Code2,
  Target,
  Download,
  ArrowRight,
  UploadCloud,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateRoadmapPage: React.FC = () => {
  const { candidateProfile, analyzeSampleResume, isAnalyzing } = useApp();

  if (!candidateProfile) {
    return (
      <div className="space-y-8 max-w-4xl py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              No Roadmap Generated
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Upload your resume to calculate personalized milestones specifically bridging your missing competencies.
            </p>
          </div>

          <Link to="/upload">
            <Button variant="primary" size="md" className="gap-2 text-xs font-semibold px-6">
              <UploadCloud className="w-4 h-4" />
              Upload Resume
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const profile = candidateProfile;
  const roadmap = profile.roadmap || [];
  const topMatch = profile.recentMatches?.[0];
  const totalWeeks = roadmap.reduce((acc, curr) => acc + (curr.estimatedWeeks || 0), 0);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Learn':
        return <BookOpen className="w-3.5 h-3.5 text-[#2457D6]" />;
      case 'Improve':
        return <Cloud className="w-3.5 h-3.5 text-[#2457D6]" />;
      case 'Build':
        return <Code2 className="w-3.5 h-3.5 text-[#167A4A]" />;
      case 'Target':
        return <Target className="w-3.5 h-3.5 text-[#A86400]" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#167A4A]" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Personalized Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            Actionable bridging milestones generated from verified resume gaps for {profile.candidateName}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/candidate">
            <Button variant="primary" size="sm" className="text-xs gap-1.5">
              Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Target Role Status Summary */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="info">Active Transition Track</Badge>
            <span className="text-xs text-[#8E98A8] font-mono">Horizon: ~{totalWeeks} Weeks</span>
          </div>
          <h2 className="text-lg font-bold text-[#111318]">
            {profile.currentTitle} → {topMatch?.roleTitle || 'Target Role'} Transition
          </h2>
          <p className="text-xs text-[#667085]">
            {topMatch?.missingSkills && topMatch.missingSkills.length > 0
              ? `Bridging ${topMatch.missingSkills.slice(0, 2).join(' & ')} elevates role match from ${topMatch.fitPercentage}% to 95%+.`
              : `Strong baseline qualification verified for ${topMatch?.roleTitle || 'target positions'}.`}
          </p>
        </div>

        <div className="flex items-center gap-6 p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] flex-shrink-0 font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#8E98A8] block">Milestones</span>
            <span className="text-xl font-bold text-[#111318]">
              {roadmap.length} <span className="text-xs text-[#8E98A8] font-normal">Phases</span>
            </span>
          </div>
          <div className="w-px h-8 bg-[#E6E7E5]" />
          <div>
            <span className="text-[10px] uppercase text-[#8E98A8] block">Top Match Fit</span>
            <span className="text-xl font-bold text-[#167A4A]">{topMatch?.fitPercentage || 85}%</span>
          </div>
        </div>
      </div>

      {/* Sequential Roadmap Timeline */}
      <div className="space-y-3">
        {roadmap.map((step, idx) => (
          <div
            key={step.id || idx}
            className={`p-5 rounded-xl border transition-all ${
              step.status === 'In Progress'
                ? 'bg-white border-[#2457D6] shadow-xs'
                : 'bg-white border-[#E6E7E5]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] flex-shrink-0 mt-0.5">
                  {getActionIcon(step.actionType)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="uppercase text-[#2457D6] font-semibold bg-[#EDF2FE] px-2 py-0.2 rounded">
                      {step.phase}
                    </span>
                    <span className="text-[#8E98A8]">
                      {step.estimatedWeeks > 0 ? `~${step.estimatedWeeks} Wks` : 'Baseline'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#111318]">{step.title}</h3>
                  <p className="text-xs text-[#667085] leading-relaxed">{step.description}</p>

                  <div className="pt-1.5 flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-[#8E98A8] text-[11px]">Target Competency / Output:</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]">
                      {step.targetSkillOrOutput}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between gap-2 flex-shrink-0">
                <Badge
                  variant={
                    step.status === 'Completed'
                      ? 'success'
                      : step.status === 'In Progress'
                      ? 'info'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {step.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
