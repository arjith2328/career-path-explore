import React, { useState } from 'react';
import { mockEmployerPositions } from '../../data/mockData';
import { EmployerPosition } from '../../types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { 
  Plus, 
  Search, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PositionsPage: React.FC = () => {
  const [positions, setPositions] = useState<EmployerPosition[]>(mockEmployerPositions);
  const [search, setSearch] = useState('');

  const filtered = positions.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.department.toLowerCase().includes(search.toLowerCase()) ||
    p.domain.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setPositions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Open' ? 'Closed' : 'Open' } : p
      )
    );
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Positions & Requisitions
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            {positions.length} open engineering requisitions with automated candidate matching
          </p>
        </div>

        <Button variant="primary" size="sm" className="text-xs gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Create Position
        </Button>
      </div>

      {/* Filter */}
      <div className="max-w-xs">
        <Input
          placeholder="Filter positions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5" />}
          className="text-xs"
        />
      </div>

      {/* Grid of Positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((pos) => (
          <div
            key={pos.id}
            className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 hover:border-[#C8CAC5] transition-all flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF9] text-[#667085] border border-[#E6E7E5]">
                    {pos.domain}
                  </span>
                  <h3 className="text-base font-bold text-[#111318]">{pos.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#667085]">
                    <span>{pos.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#8E98A8]">
                      <MapPin className="w-3 h-3" />
                      {pos.location}
                    </span>
                  </div>
                </div>

                <button onClick={() => toggleStatus(pos.id)} className="cursor-pointer">
                  <Badge variant={pos.status === 'Open' ? 'success' : 'neutral'} size="sm">
                    {pos.status}
                  </Badge>
                </button>
              </div>

              {/* Exact Displays: Applicants, Shortlisted, Match quality */}
              <div className="grid grid-cols-3 gap-2 bg-[#FAFAF9] p-3 rounded-lg border border-[#E6E7E5] text-xs font-mono text-center">
                <div>
                  <span className="text-[10px] text-[#8E98A8] block uppercase">Applicants</span>
                  <span className="font-bold text-[#111318] text-sm">{pos.applicantsCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E98A8] block uppercase">Shortlisted</span>
                  <span className="font-bold text-[#A86400] text-sm">{pos.shortlistedCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8E98A8] block uppercase">Quality</span>
                  <span className="font-bold text-[#167A4A] text-sm">{pos.matchQuality}</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#8E98A8]">Required Skills</span>
                <div className="flex flex-wrap gap-1">
                  {pos.requiredSkills.map((req) => (
                    <span
                      key={req}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0F1EF] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-[#8E98A8]">Created: {pos.createdDate}</span>
              <Link to="/employer/candidates">
                <Button variant="ghost" size="sm" className="text-xs text-[#2457D6] gap-1">
                  Review Candidates
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
