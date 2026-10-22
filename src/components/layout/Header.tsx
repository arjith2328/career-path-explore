import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Search, 
  Bell, 
  User, 
  Building2,
  ChevronDown, 
  LogOut, 
  Settings, 
  Compass,
  FileText
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { candidateProfile, searchQuery, setSearchQuery, notificationsCount, clearNotifications } = useApp();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const candidateName = candidateProfile?.candidateName || 'Candidate';
  const initials = candidateName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b border-[#E6E7E5] bg-white/90 backdrop-blur-xs px-6 sm:px-10 flex items-center justify-between gap-4">
      {/* Active Candidate Status Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#F7F7F5] px-3 py-1 rounded-lg border border-[#E6E7E5] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#167A4A] animate-pulse" />
          <span className="font-semibold text-[#111318]">
            {candidateProfile ? candidateProfile.candidateName : 'No Resume Uploaded'}
          </span>
          {candidateProfile?.detectedDomain && (
            <span className="hidden sm:inline text-[#8E98A8]">
              • {candidateProfile.detectedDomain}
            </span>
          )}
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center max-w-xs w-full">
        <Input
          placeholder="Search skills, roles, telemetry..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5" />}
          className="h-8 text-xs bg-[#F7F7F5] border-[#E6E7E5]"
        />
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        {/* Upload Resume Quick Button */}
        <Link to="/upload" className="hidden sm:inline-flex">
          <Button variant="secondary" size="sm" className="text-xs gap-1.5 h-8">
            <FileText className="w-3.5 h-3.5 text-[#2457D6]" />
            <span>Upload Resume</span>
          </Button>
        </Link>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-transparent hover:border-[#E6E7E5] hover:bg-[#F7F7F5] transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#111318] text-white flex items-center justify-center text-[10px] font-mono font-medium">
              {initials || 'CP'}
            </div>
            <span className="text-xs font-medium text-[#111318] hidden sm:inline">
              {candidateName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8E98A8]" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-[#E6E7E5] shadow-lg py-1 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#F0F1EF]">
                <p className="font-semibold text-[#111318]">
                  {candidateName}
                </p>
                <p className="text-[11px] text-[#8E98A8] truncate">
                  {candidateProfile?.email || 'Resume-driven candidate'}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/candidate/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]"
                >
                  <User className="w-3.5 h-3.5" />
                  My Profile
                </Link>
                <Link
                  to="/candidate/skills"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]"
                >
                  <Compass className="w-3.5 h-3.5" />
                  My Skills
                </Link>
                <Link
                  to="/candidate/roadmap"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]"
                >
                  <Settings className="w-3.5 h-3.5" />
                  My Roadmap
                </Link>
                <Link
                  to="/upload"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Upload New Resume
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
