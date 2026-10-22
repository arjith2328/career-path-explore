import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CareerCard } from '../../components/cards/CareerCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CareerExplorerPage: React.FC = () => {
  const { candidateProfile, analysisResult, analyzeSampleResume, isAnalyzing } = useApp();
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');

  const matches = analysisResult?.careerMatches || candidateProfile?.recentMatches || [];

  const filteredRoles = useMemo(() => {
    return matches.filter((career) => {
      const matchesSearch =
        career.roleTitle.toLowerCase().includes(search.toLowerCase()) ||
        career.domain.toLowerCase().includes(search.toLowerCase()) ||
        career.alignedSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDomain =
        domainFilter === 'all' || career.domain.toLowerCase().includes(domainFilter.toLowerCase());

      return matchesSearch && matchesDomain;
    });
  }, [matches, search, domainFilter]);

  if (!candidateProfile || matches.length === 0) {
    return (
      <div className="space-y-8 max-w-4xl py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              No Career Matches Calculated
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Upload a resume to run the deterministic 6-pillar matching engine across engineering disciplines.
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

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
          Career Fit Explorer
        </h1>
        <p className="text-xs sm:text-sm text-[#667085]">
          Deterministic compatibility calculations and explainable transition pathways for {candidateProfile.candidateName}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
        <Input
          placeholder="Filter roles or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5" />}
          className="text-xs"
        />

        <Select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="text-xs"
        >
          <option value="all">All Domains</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Embedded Systems">Embedded Systems</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Data Engineering & Science">Data Engineering & Science</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
          <option value="Robotics">Robotics</option>
          <option value="Hardware Engineering">Hardware Engineering</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </Select>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRoles.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>
    </div>
  );
};
