import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Cpu,
  GitBranch,
  Briefcase,
  User,
  Settings,
  Users,
  Building,
  BarChart3,
  FileText,
  UploadCloud,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const candidateLinks = [
    { name: 'My Overview', to: '/candidate', icon: Compass },
    { name: 'My Profile', to: '/candidate/profile', icon: User },
    { name: 'My Skills', to: '/candidate/skills', icon: Cpu },
    { name: 'My Career Fit', to: '/candidate/career', icon: Layers },
    { name: 'My Career Path', to: '/candidate/path', icon: GitBranch },
    { name: 'My Roadmap', to: '/candidate/roadmap', icon: ArrowUpRight },
    { name: 'Opportunities', to: '/candidate/opportunities', icon: Briefcase },
  ];

  const secondaryLinks = [
    { name: 'Settings', to: '/settings', icon: Settings },
  ];

  const links = candidateLinks;

  return (
    <aside className="w-56 border-r border-[#E6E7E5] bg-white flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5">
        {/* Brand Logo & Header */}
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-6 h-6 rounded-md bg-[#111318] flex items-center justify-center text-white">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-tight text-[#111318] leading-none">
              CAREER PATH
            </span>
            <span className="text-[10px] text-[#8E98A8] font-mono tracking-wider">
              EXPLORER
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="space-y-6">
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#8E98A8]">
              Candidate Workspace
            </div>
            <nav className="space-y-0.5">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/candidate'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                          : 'text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2457D6]' : 'text-[#8E98A8]'}`} />
                        <span>{link.name}</span>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Secondary Navigation */}
          <div>
            <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#8E98A8]">
              Account
            </div>
            <nav className="space-y-0.5">
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                          : 'text-[#667085] hover:text-[#111318] hover:bg-[#F7F7F5]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2457D6]' : 'text-[#8E98A8]'}`} />
                        <span>{link.name}</span>
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Resume Staging Action in Sidebar */}
      <div className="p-4 border-t border-[#F0F1EF]">
        <NavLink
          to="/upload"
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#F7F7F5] border border-[#E6E7E5] text-[#111318] text-xs font-medium hover:bg-[#F0F1EF] transition-all"
        >
          <UploadCloud className="w-3.5 h-3.5 text-[#2457D6]" />
          <span>Upload Resume</span>
        </NavLink>
      </div>
    </aside>
  );
};
