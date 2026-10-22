import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  ArrowRight,
  Check,
  UploadCloud,
  Layers,
  Cpu,
  GitBranch,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Building,
  Target
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = useApp();
  const [activeRoleTab, setActiveRoleTab] = useState<'candidate' | 'employer'>('candidate');

  const domains = [
    'Software Engineering',
    'AI & Machine Learning',
    'Data Engineering & Science',
    'Cloud & DevOps',
    'Cybersecurity',
    'Embedded Systems',
    'Robotics',
    'Hardware Engineering',
    'Electronics',
    'Mechanical Engineering'
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111318] selection:bg-[#2457D6]/10 selection:text-[#2457D6]">
      {/* 1. Top Navigation */}
      <header className="sticky top-0 z-40 h-16 border-b border-[#E6E7E5] bg-[#F7F7F5]/90 backdrop-blur-xs px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#111318] flex items-center justify-center text-white">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#111318] font-mono">
            CAREER PATH EXPLORER
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#667085]">
          <a href="#signals" className="hover:text-[#111318] transition-colors">Product</a>
          <a href="#preview" className="hover:text-[#111318] transition-colors">For Candidates</a>
          <a href="#preview" className="hover:text-[#111318] transition-colors">For Employers</a>
          <a href="#domains" className="hover:text-[#111318] transition-colors">Disciplines</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-xs">
              Sign in
            </Button>
          </Link>
          <Link to="/upload">
            <Button variant="primary" size="sm" className="text-xs">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      {/* 2. Editorial Hero Section */}
      <section className="pt-24 pb-16 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-block">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#667085] bg-white border border-[#E6E7E5] px-3 py-1 rounded-full">
            CAREER INTELLIGENCE
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111318] max-w-4xl mx-auto leading-[1.1]">
          Understand where your career can go next.
        </h1>

        <p className="text-base sm:text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed font-normal">
          Turn experience, skills and ambitions into a clear professional direction.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/upload">
            <Button variant="primary" size="lg" className="w-full sm:w-auto text-xs sm:text-sm font-semibold">
              Analyze your resume
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link to="/employer" onClick={() => setRole('employer')}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-xs sm:text-sm font-medium">
              Explore for employers
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. Refined Product Interface Preview (Screenshot aesthetic) */}
      <section className="px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto pb-24">
        <div className="rounded-xl border border-[#E6E7E5] bg-white shadow-sm overflow-hidden text-left">
          {/* Window Bar */}
          <div className="px-5 py-3 bg-[#FAFAF9] border-b border-[#E6E7E5] flex items-center justify-between text-xs text-[#8E98A8] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6E7E5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6E7E5]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6E7E5]" />
              <span className="ml-2 text-[#667085]">career-path-explorer // preview</span>
            </div>
            <span className="text-[11px] text-[#667085]">DEMONSTRATION REPORT</span>
          </div>

          {/* Interface Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Candidate Header Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F1EF]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#111318]">Marcus Vance</h2>
                  <Badge variant="info">AI & Machine Learning</Badge>
                </div>
                <p className="text-xs text-[#667085]">
                  Software Engineer · 4.8 Years Verified Experience
                </p>
              </div>

              {/* Inline Metrics with vertical dividers */}
              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-[#8E98A8] uppercase block text-[10px]">Readiness</span>
                  <span className="text-base font-bold text-[#111318]">78 / 100</span>
                </div>
                <div className="w-px h-7 bg-[#E6E7E5]" />
                <div>
                  <span className="text-[#8E98A8] uppercase block text-[10px]">Career Fit</span>
                  <span className="text-base font-bold text-[#167A4A]">91%</span>
                </div>
                <div className="w-px h-7 bg-[#E6E7E5]" />
                <div>
                  <span className="text-[#8E98A8] uppercase block text-[10px]">Skills</span>
                  <span className="text-base font-bold text-[#111318]">18</span>
                </div>
                <div className="w-px h-7 bg-[#E6E7E5]" />
                <div>
                  <span className="text-[#8E98A8] uppercase block text-[10px]">Gaps</span>
                  <span className="text-base font-bold text-[#A86400]">6</span>
                </div>
              </div>
            </div>

            {/* Split Grid: Left Career Position Tree | Right Editorial Match Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Career Position Tree */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E98A8]">
                  Career Position & Trajectory
                </h3>

                <div className="p-5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-[#8E98A8] block">Current</span>
                      <span className="font-bold text-[#111318] text-sm">Software Engineer</span>
                    </div>
                    <Badge variant="default">Current Level</Badge>
                  </div>

                  <div className="pl-3 border-l-2 border-[#E6E7E5] ml-2 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase text-[#8E98A8] block">Next</span>
                      <span className="font-semibold text-[#111318]">Senior Software Engineer</span>
                    </div>

                    <div className="p-3 rounded bg-white border border-[#E6E7E5] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase text-[#2457D6] font-bold">Potential Transition</span>
                        <span className="font-bold text-[#167A4A]">91% Match</span>
                      </div>
                      <span className="font-bold text-[#111318] text-sm block font-sans">AI / ML Engineer</span>
                      <p className="text-[11px] text-[#667085] font-sans">
                        Bridge MLOps & Container Deployment to achieve senior qualification.
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-[#8E98A8] block">Long Term</span>
                      <span className="font-semibold text-[#111318]">AI Architect</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Large Editorial Panel: Career Intelligence */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8E98A8]">
                  Explainable Fit Breakdown
                </h3>

                <div className="p-6 rounded-lg bg-white border border-[#E6E7E5] space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-[#8E98A8] uppercase font-mono block">Career Intelligence</span>
                      <h4 className="text-lg font-bold text-[#111318]">AI / ML Engineer</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold font-mono text-[#167A4A] tracking-tight">91%</span>
                      <span className="text-[10px] text-[#8E98A8] block uppercase font-mono">Career Fit</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-medium text-[#111318] block">Strong alignment across:</span>
                    <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]">
                        Python (92%)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]">
                        Machine Learning (88%)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA]">
                        Computer Vision (82%)
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#F0F1EF]" />

                  <div className="space-y-2">
                    <span className="text-xs font-medium text-[#667085] block">Missing target competencies:</span>
                    <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#FEF6EE] text-[#A86400] border border-[#F9DBAF]">
                        MLOps (28%)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#FEF6EE] text-[#A86400] border border-[#F9DBAF]">
                        Docker (42%)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#FEE4E2] text-[#B42318] border border-[#FECDCA]">
                        Cloud Deployment (30%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Career Signals (Horizontal typography flow) */}
      <section id="signals" className="py-20 px-6 sm:px-12 lg:px-16 border-y border-[#E6E7E5] bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-[#667085] tracking-widest">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111318] tracking-tight">
              From raw resume to your next transition.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2457D6] block">01</span>
              <h3 className="text-sm font-bold text-[#111318] uppercase tracking-wider font-mono">
                YOUR EXPERIENCE
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Extracted directly from your resume with zero hallucinations or invented titles.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2457D6] block">02</span>
              <h3 className="text-sm font-bold text-[#111318] uppercase tracking-wider font-mono">
                YOUR SKILLS
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Categorized into Strong, Developing, and Missing with exact source evidence.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2457D6] block">03</span>
              <h3 className="text-sm font-bold text-[#111318] uppercase tracking-wider font-mono">
                YOUR OPTIONS
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Objective role compatibility calculations across 10 engineering disciplines.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-3">
              <span className="text-xs font-mono font-bold text-[#2457D6] block">04</span>
              <h3 className="text-sm font-bold text-[#111318] uppercase tracking-wider font-mono">
                YOUR NEXT MOVE
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Personalized sequential roadmaps bridging target gaps with real milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Universal Technical Disciplines */}
      <section id="domains" className="py-20 px-6 sm:px-12 lg:px-16 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#667085] tracking-wider">Scope</span>
            <h2 className="text-2xl font-bold text-[#111318] mt-1 tracking-tight">
              Supported Across 10 Technical Disciplines
            </h2>
          </div>
          <p className="text-xs text-[#667085] max-w-md">
            Not limited to software. Comprehensive taxonomies for embedded systems, robotics, hardware, and data.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {domains.map((dom) => (
            <div
              key={dom}
              className="p-3.5 rounded-lg bg-white border border-[#E6E7E5] space-y-1 text-left"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#111318] mb-2" />
              <span className="text-xs font-medium text-[#111318] block">{dom}</span>
              <span className="text-[10px] text-[#8E98A8] font-mono">Taxonomy Ready</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-[#E6E7E5] bg-white py-12 px-6 sm:px-12 lg:px-16 text-xs text-[#667085]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111318]">CAREER PATH EXPLORER</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-[#111318]">Taxonomies</a>
            <a href="#" className="hover:text-[#111318]">Privacy</a>
            <a href="#" className="hover:text-[#111318]">Enterprise</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
