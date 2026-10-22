import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  BookOpen,
  Cloud,
  Code2,
  Sparkles,
  UploadCloud,
  FileText,
  Compass,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const { candidateProfile, analysisResult } = useApp();

  // If no resume uploaded yet, show clear upload CTA
  if (!candidateProfile) {
    return (
      <div className="space-y-8 max-w-4xl py-6">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              Upload Your Resume To Begin
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Every skill verification, domain confidence rating, career match calculation, and roadmap milestone is computed exclusively from your resume evidence with zero hallucinations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/upload">
              <Button variant="primary" size="md" className="gap-2 text-xs font-semibold px-6">
                <UploadCloud className="w-4 h-4" />
                Upload Resume (PDF / DOCX)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const profile = candidateProfile;
  const topCareerFits = profile.recentMatches || [];
  const topMatch = topCareerFits[0];
  const pathway = analysisResult?.careerPath;
  const roadmap = profile.roadmap || [];

  return (
    <div className="space-y-10 max-w-5xl">
      {/* 1. Page Heading & Status Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              {profile.candidateName}
            </h1>
            <Badge variant="info">{profile.detectedDomain}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#667085]">
            Calculated <span className="font-semibold text-[#111318]">{profile.readinessScore}% career readiness</span> across {profile.skills.length} verified competencies extracted from {profile.documentName}.
          </p>
        </div>

        <Link to="/upload">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 self-start">
            <FileText className="w-3.5 h-3.5" />
            Upload New Resume
          </Button>
        </Link>
      </div>

      {/* 2. Compact Inline Metrics with Vertical Dividers */}
      <div className="p-5 rounded-xl bg-white border border-[#E6E7E5] flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Career Readiness</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111318]">{profile.readinessScore}</span>
            <span className="text-[#8E98A8]">/ 100</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Top Career Fit</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#167A4A]">{topMatch ? `${topMatch.fitPercentage}%` : 'N/A'}</span>
            <span className="text-[#667085] font-sans text-xs">{topMatch?.roleTitle || 'Insufficient evidence'}</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Verified Skills</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#111318]">{profile.skills.length}</span>
            <span className="text-[#8E98A8]">across {profile.skillCategories.length} categories</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-[#E6E7E5]" />

        <div className="space-y-0.5">
          <span className="text-[10px] text-[#8E98A8] uppercase tracking-wider block">Actionable Gaps</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-[#A86400]">{profile.skillGapsCount}</span>
            <span className="text-[#8E98A8]">competencies</span>
          </div>
        </div>
      </div>

      {/* 3. Visual Centerpiece: CAREER POSITION Progress Tree */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E6E7E5] space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#8E98A8]">
              Career Position & Advancement Map
            </h2>
            <p className="text-xs text-[#667085]">
              Sequential progression and high-compatibility lateral transitions grounded in verified skills
            </p>
          </div>
          <Link to="/candidate/path">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Explore Full Map
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          {/* Current */}
          <div className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#8E98A8]">CURRENT</span>
              <span className="w-2 h-2 rounded-full bg-[#111318]" />
            </div>
            <span className="text-sm font-bold text-[#111318] block font-sans">
              {profile.currentTitle || 'Not detected in resume'}
            </span>
            <p className="text-[11px] text-[#667085] font-sans">
              {profile.currentEmployer !== 'Not detected in resume' ? `${profile.currentEmployer} • ` : ''}{profile.yearsOfExperience} yrs verified.
            </p>
          </div>

          {/* Next */}
          <div className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#8E98A8]">TARGET ROLE</span>
              <span className="text-[10px] text-[#167A4A] font-bold">{topMatch ? `${topMatch.fitPercentage}% Ready` : 'N/A'}</span>
            </div>
            <span className="text-sm font-bold text-[#111318] block font-sans">
              {topMatch?.roleTitle || 'Insufficient evidence for target role'}
            </span>
            <p className="text-[11px] text-[#667085] font-sans">
              {topMatch && topMatch.alignedSkills.length > 0 ? `${topMatch.alignedSkills.slice(0, 2).join(', ')} execution.` : 'Based on extracted resume signals.'}
            </p>
          </div>

          {/* Potential Transition */}
          <div className="p-4 rounded-lg bg-[#EDF7F2] border border-[#CDE9DA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#167A4A] font-bold">POTENTIAL TRANSITION</span>
              <span className="text-xs font-bold text-[#167A4A]">{topCareerFits[1] ? `${topCareerFits[1].fitPercentage}% Fit` : 'N/A'}</span>
            </div>
            <span className="text-sm font-bold text-[#111318] block font-sans">
              {topCareerFits[1]?.roleTitle || 'No adjacent match'}
            </span>
            <p className="text-[11px] text-[#667085] font-sans">
              {topCareerFits[1]?.domain || 'Adjacent Engineering'}
            </p>
          </div>

          {/* Long Term */}
          <div className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-[#8E98A8]">LONG TERM</span>
              <span className="text-[10px] text-[#8E98A8]">Horizon</span>
            </div>
            <span className="text-sm font-bold text-[#111318] block font-sans">
              {pathway?.steps[pathway.steps.length - 1]?.title || 'Advanced Specialization'}
            </span>
            <p className="text-[11px] text-[#667085] font-sans">
              Multi-system technical vision & strategy.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Career Matches Table / List */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
          <div>
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Calculated Career Matches
            </h2>
            <p className="text-xs text-[#667085]">
              Deterministic 6-pillar score evaluated directly against verified resume competencies
            </p>
          </div>
          <Link to="/candidate/career">
            <Button variant="ghost" size="sm" className="text-xs text-[#2457D6]">
              View all roles
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-[#F0F1EF]">
          {topCareerFits.map((career) => (
            <div
              key={career.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFAF9] -mx-3 px-3 rounded-lg transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-bold text-[#111318]">{career.roleTitle}</h3>
                  <Badge variant="neutral">{career.domain}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#667085] font-mono">
                  <span>Median: {career.salaryRange.median}</span>
                  <span>•</span>
                  <span>Demand: {career.marketDemand}</span>
                  <span>•</span>
                  <span>Aligned Skills: {career.alignedSkills.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <span className="text-base font-bold text-[#167A4A]">{career.fitPercentage}%</span>
                  <span className="text-[10px] text-[#8E98A8] block">Match Fit</span>
                </div>
                <Link to={`/candidate/career/${career.id}`}>
                  <Button variant="secondary" size="sm" className="text-xs gap-1">
                    Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Actionable Next Steps Driven By Actual Gaps */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
          <div>
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Personalized Milestone Roadmap
            </h2>
            <p className="text-xs text-[#667085]">
              High-leverage targets generated dynamically to bridge your actual missing competencies
            </p>
          </div>
          <Link to="/candidate/roadmap">
            <Button variant="ghost" size="sm" className="text-xs text-[#2457D6]">
              View Full Roadmap
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {roadmap.slice(1, 4).map((m, idx) => (
            <div key={m.id || idx} className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-[#2457D6] flex items-center gap-1">
                  {idx === 0 ? <BookOpen className="w-3 h-3" /> : idx === 1 ? <Cloud className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
                  {m.actionType}
                </span>
                <span className="text-[10px] font-mono text-[#8E98A8]">~{m.estimatedWeeks} Wks</span>
              </div>
              <h4 className="font-bold text-[#111318]">{m.title}</h4>
              <p className="text-[#667085] leading-relaxed line-clamp-3">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
