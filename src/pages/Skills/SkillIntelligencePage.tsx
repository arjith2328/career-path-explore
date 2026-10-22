import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getProficiencyBadge } from '../../lib/utils';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  Quote,
  Cpu,
  UploadCloud
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SkillIntelligencePage: React.FC = () => {
  const { candidateProfile, analyzeSampleResume, isAnalyzing } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const allSkills = useMemo(() => {
    if (!candidateProfile || !candidateProfile.skills) return [];
    return candidateProfile.skills.map((s) => ({
      ...s,
      categoryName: s.category,
    }));
  }, [candidateProfile]);

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase()) ||
        (skill.sourceQuote && skill.sourceQuote.toLowerCase().includes(search.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' || skill.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesCategory =
        categoryFilter === 'all' || skill.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [allSkills, search, statusFilter, categoryFilter]);

  if (!candidateProfile || allSkills.length === 0) {
    return (
      <div className="space-y-8 max-w-4xl py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              No Skills Extracted Yet
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Upload your resume to extract verified competencies, quote citations, and classification confidence ratings across 10 engineering domains.
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

  const strongCount = allSkills.filter((s) => s.status === 'Strong').length;
  const developingCount = allSkills.filter((s) => s.status === 'Developing').length;
  const missingCount = allSkills.filter((s) => s.status === 'Missing').length;

  // Extract unique categories
  const categories = Array.from(new Set(allSkills.map((s) => s.category)));

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              Skill Intelligence Matrix
            </h1>
            <Badge variant="info">{candidateProfile.detectedDomain}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#667085]">
            Verified competencies extracted directly from {candidateProfile.documentName} with exact source evidence traceability
          </p>
        </div>

        {/* Inline Metric Counters */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <Badge variant="success">{strongCount} Strong</Badge>
          <Badge variant="warning">{developingCount} Developing</Badge>
          {missingCount > 0 && <Badge variant="danger">{missingCount} Missing</Badge>}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          placeholder="Filter skills by name or citation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5" />}
          className="text-xs"
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs"
        >
          <option value="all">All Statuses (Strong, Developing)</option>
          <option value="strong">Strong (Production Proven)</option>
          <option value="developing">Developing (Growth Signals)</option>
        </Select>

        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {/* Elegant Skill Matrix Table */}
      <div className="rounded-xl border border-[#E6E7E5] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111318]">
            <thead className="bg-[#FAFAF9] text-[11px] font-mono text-[#667085] uppercase border-b border-[#E6E7E5]">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Skill</th>
                <th className="px-5 py-3.5 font-semibold">Category</th>
                <th className="px-5 py-3.5 font-semibold">Proficiency</th>
                <th className="px-5 py-3.5 font-semibold">Source Evidence Citation</th>
                <th className="px-5 py-3.5 font-semibold">Confidence</th>
                <th className="px-5 py-3.5 font-semibold text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EF]">
              {filteredSkills.map((skill) => {
                const prof = getProficiencyBadge(skill.status);

                return (
                  <tr key={skill.id} className="hover:bg-[#FAFAF9] transition-colors">
                    {/* Skill Name */}
                    <td className="px-5 py-3.5 font-semibold text-[#111318]">
                      <div className="flex items-center gap-2">
                        <span>{skill.name}</span>
                        {skill.yearsOfExperience ? (
                          <span className="text-[10px] font-mono text-[#8E98A8]">
                            (~{skill.yearsOfExperience}y)
                          </span>
                        ) : null}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5 text-[#667085] font-mono text-[11px]">
                      {skill.category}
                    </td>

                    {/* Proficiency */}
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${prof.badge}`}>
                        {prof.label}
                      </span>
                    </td>

                    {/* Evidence Quote */}
                    <td className="px-5 py-3.5">
                      {skill.sourceQuote ? (
                        <div className="max-w-xs truncate text-[11px] text-[#667085] italic font-mono" title={skill.sourceQuote}>
                          &quot;{skill.sourceQuote}&quot;
                        </div>
                      ) : (
                        <span className="text-[#8E98A8] font-mono text-[11px]">—</span>
                      )}
                    </td>

                    {/* Confidence */}
                    <td className="px-5 py-3.5 font-mono text-[#111318]">
                      {skill.confidence || 'High'}
                    </td>

                    {/* Score */}
                    <td className="px-5 py-3.5 font-mono text-right font-bold text-[#167A4A]">
                      {skill.score} / 100
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
