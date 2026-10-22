import React, { useState, useMemo } from 'react';
import { mockJobs } from '../../data/mockData';
import { JobMatchCard } from '../../components/cards/JobMatchCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Search } from 'lucide-react';

export const JobMatchingPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDomain = domainFilter === 'All' || job.domain === domainFilter;

      return matchesSearch && matchesDomain;
    });
  }, [search, domainFilter]);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
          Opportunities & Live Requisitions
        </h1>
        <p className="text-xs sm:text-sm text-[#667085]">
          Verified enterprise requisitions matched against your competencies
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
        <Input
          placeholder="Filter by role, company (TechNova...)"
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
          <option value="All">All Domains</option>
          <option value="AI & Machine Learning">AI & Machine Learning</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Embedded Systems">Embedded Systems</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
        </Select>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => (
          <JobMatchCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
