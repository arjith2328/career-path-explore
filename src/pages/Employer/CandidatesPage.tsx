import React, { useState, useMemo } from 'react';
import { mockEmployerCandidates } from '../../data/mockData';
import { EmployerCandidateRecord, CandidateStatus } from '../../types';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { CandidateComparisonModal } from '../../components/tables/CandidateComparisonModal';
import {
  Search,
  Download,
  Eye,
  Users,
  CheckSquare,
  Square
} from 'lucide-react';

export const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<EmployerCandidateRecord[]>(mockEmployerCandidates);
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'match' | 'exp' | 'name'>('match');
  const [selectedCandidate, setSelectedCandidate] = useState<EmployerCandidateRecord | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.currentTitle.toLowerCase().includes(search.toLowerCase()) ||
          c.topSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

        const matchesDomain = domainFilter === 'All' || c.domain === domainFilter;
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

        return matchesSearch && matchesDomain && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.targetRoleMatch.percentage - a.targetRoleMatch.percentage;
        if (sortBy === 'exp') return b.experienceYears - a.experienceYears;
        return a.name.localeCompare(b.name);
      });
  }, [candidates, search, domainFilter, statusFilter, sortBy]);

  const toggleSelectForCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const selectedForCompare = candidates.filter((c) => compareIds.includes(c.id));

  const handleStatusUpdate = (id: string, newStatus: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Candidate Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            {filteredCandidates.length} evaluated candidate profiles matching current criteria
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {compareIds.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsCompareOpen(true)}
              className="text-xs gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              Compare ({compareIds.length}/3)
            </Button>
          )}
          <Button variant="secondary" size="sm" className="text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Input
          placeholder="Search candidates, skills..."
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
          <option value="Data Engineering & Science">Data Engineering & Science</option>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interview">Interview</option>
          <option value="Review">Review</option>
          <option value="Rejected">Rejected</option>
        </Select>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="text-xs"
        >
          <option value="match">Sort by: Role Fit %</option>
          <option value="exp">Sort by: Experience (Yrs)</option>
          <option value="name">Sort by: Name (A-Z)</option>
        </Select>
      </div>

      {/* High-quality Enterprise Table */}
      <div className="rounded-xl border border-[#E6E7E5] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111318]">
            <thead className="bg-[#FAFAF9] text-[11px] font-mono text-[#667085] uppercase border-b border-[#E6E7E5]">
              <tr>
                <th className="px-4 py-3.5 w-10 text-center">Select</th>
                <th className="px-4 py-3.5">Candidate</th>
                <th className="px-4 py-3.5">Domain</th>
                <th className="px-4 py-3.5">Experience</th>
                <th className="px-4 py-3.5">Top Skills</th>
                <th className="px-4 py-3.5">Role Fit</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F1EF]">
              {filteredCandidates.map((cand) => {
                const isSelected = compareIds.includes(cand.id);

                return (
                  <tr key={cand.id} className="hover:bg-[#FAFAF9] transition-colors">
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => toggleSelectForCompare(cand.id)}
                        className="text-[#8E98A8] hover:text-[#111318] cursor-pointer"
                        title="Select for comparison"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#2457D6]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3.5 font-semibold text-[#111318]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#111318] text-white font-mono text-[10px] flex items-center justify-center flex-shrink-0">
                          {cand.avatarFallback}
                        </div>
                        <div>
                          <span>{cand.name}</span>
                          <span className="text-[11px] text-[#8E98A8] block font-normal">{cand.currentTitle}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-[#667085] font-mono text-[11px]">
                      {cand.domain}
                    </td>

                    <td className="px-4 py-3.5 font-mono">
                      {cand.experienceYears} Years
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {cand.topSkills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono">
                      <span className="font-bold text-[#167A4A]">{cand.targetRoleMatch.percentage}%</span>
                      <span className="text-[10px] text-[#8E98A8] block font-sans truncate max-w-[100px]">
                        {cand.targetRoleMatch.roleTitle}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge
                        variant={
                          cand.status === 'Interview'
                            ? 'success'
                            : cand.status === 'Shortlisted'
                            ? 'warning'
                            : cand.status === 'New'
                            ? 'info'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {cand.status}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedCandidate(cand)}
                        className="text-xs h-7 px-2.5"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Dossier
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Comparison Modal */}
      <CandidateComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        candidates={selectedForCompare}
      />

      {/* Dossier Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={`${selectedCandidate.name} — Candidate Dossier`}
          subtitle={`${selectedCandidate.currentTitle} · ${selectedCandidate.location}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#667085] font-mono">Status:</span>
                <Select
                  value={selectedCandidate.status}
                  onChange={(e) => handleStatusUpdate(selectedCandidate.id, e.target.value as CandidateStatus)}
                  className="text-xs h-8 py-1"
                >
                  <option value="New">New</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Review">Review</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedCandidate(null)}
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5]">
                <span className="text-[#8E98A8] block">Role Fit</span>
                <span className="text-base font-mono font-bold text-[#167A4A]">
                  {selectedCandidate.targetRoleMatch.percentage}%
                </span>
                <span className="text-[10px] text-[#8E98A8] block truncate">
                  {selectedCandidate.targetRoleMatch.roleTitle}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5]">
                <span className="text-[#8E98A8] block">Experience</span>
                <span className="text-base font-mono font-bold text-[#111318]">
                  {selectedCandidate.experienceYears} Years
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5]">
                <span className="text-[#8E98A8] block">Availability</span>
                <span className="text-base font-mono font-bold text-[#167A4A]">
                  {selectedCandidate.availability}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-1.5">
              <span className="text-xs font-semibold text-[#111318] block">
                Evaluated Competencies
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedCandidate.topSkills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-white text-[#111318] border border-[#E6E7E5]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
