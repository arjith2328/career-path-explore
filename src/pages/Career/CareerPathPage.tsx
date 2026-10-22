import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  GitBranch,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Layers,
  ChevronRight,
  UploadCloud,
  TrendingUp,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CareerPathPage: React.FC = () => {
  const { candidateProfile, analysisResult, analyzeSampleResume, isAnalyzing } = useApp();

  if (!candidateProfile) {
    return (
      <div className="space-y-8 max-w-4xl py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              No Career Pathway Calculated
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Upload your resume to graph your progression track, lateral engineering transitions, and long-term strategic roles.
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
  const pathway = analysisResult?.careerPath;
  const transitions = analysisResult?.transitions || [];
  const topMatches = profile.recentMatches || [];

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              Career Path & Progression Architecture
            </h1>
            <Badge variant="info">{profile.detectedDomain}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#667085]">
            Structured progression pathway grounded in verified {profile.detectedDomain} competencies for {profile.candidateName}
          </p>
        </div>

        <Link to="/candidate/roadmap">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5">
            Personalized Roadmap
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Signature Career Map Component */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E6E7E5] space-y-8 shadow-xs">
        {/* Current Node */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E98A8] block">
            CURRENT BASELINE POSITION
          </span>
          <div className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] flex items-center justify-between gap-4 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111318]" />
              <div>
                <span className="text-sm font-bold text-[#111318] block">{profile.currentTitle}</span>
                <span className="text-xs text-[#667085]">{profile.currentEmployer} • {profile.yearsOfExperience} yrs verified</span>
              </div>
            </div>
            <Badge variant="default">Verified Active</Badge>
          </div>
        </div>

        {/* Tree Progression Section with connecting lines */}
        <div className="pl-5 border-l-2 border-[#E6E7E5] ml-4 space-y-8">
          {/* Near-term Options */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E98A8] block -ml-9 pl-4 bg-white w-fit">
              NEAR-TERM COMPATIBILITY TARGETS (1–2 YEARS)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topMatches.slice(0, 3).map((match, idx) => (
                <div
                  key={match.id}
                  className={`p-4 rounded-lg border space-y-3 text-xs ${
                    idx === 0
                      ? 'bg-[#EDF7F2] border-[#CDE9DA]'
                      : 'bg-white border-[#E6E7E5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111318] text-sm">{match.roleTitle}</span>
                    <span className="font-mono text-[#167A4A] font-bold">{match.fitPercentage}% Fit</span>
                  </div>
                  <div className="space-y-1 text-[#667085]">
                    <span className="text-[11px] block">Domain: {match.domain}</span>
                    <span className="text-[11px] block text-[#167A4A]">
                      Aligned: {match.alignedSkills.slice(0, 2).join(', ')}
                    </span>
                    {match.missingSkills.length > 0 && (
                      <span className="text-[11px] block text-[#A86400]">
                        Bridge: {match.missingSkills[0]}
                      </span>
                    )}
                  </div>
                  <Link to={`/candidate/career/${match.id}`}>
                    <Button variant="secondary" size="sm" className="w-full text-xs mt-1">
                      Explainable Match
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sequential Progression Steps */}
          {pathway && pathway.steps && (
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E98A8] block -ml-9 pl-4 bg-white w-fit">
                SEQUENTIAL ADVANCEMENT LEVELS
              </span>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                {pathway.steps.map((step) => (
                  <div key={step.id} className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-[#2457D6]">{step.level}</span>
                      <span className="text-[10px] text-[#8E98A8]">{step.yearsOfExperienceRange}</span>
                    </div>
                    <span className="text-sm font-bold text-[#111318] block font-sans">{step.title}</span>
                    <p className="text-[11px] text-[#667085] font-sans line-clamp-2">{step.focusArea}</p>
                    <span className="text-[10px] font-mono text-[#167A4A] block pt-1">{step.typicalCompensation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lateral Transitions */}
          {transitions.length > 0 && (
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E98A8] block -ml-9 pl-4 bg-white w-fit">
                LATERAL ENGINEERING TRANSITIONS
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {transitions.map((tr, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-white border border-[#E6E7E5] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#111318] text-sm">{tr.targetRole}</span>
                      <Badge variant="neutral" size="sm">{tr.transitionScore}% Fit</Badge>
                    </div>
                    <p className="text-[11px] text-[#667085]">Domain: {tr.targetDomain}</p>
                    <p className="text-[11px] text-[#2457D6] font-mono">{tr.recommendedAction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
