import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { 
  User, 
  Sliders, 
  Bell, 
  Moon, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { role, setRole } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications' | 'appearance' | 'security'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#667085]">
            Manage profile information, workspace preferences, and security
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#EDF7F2] text-[#167A4A] border border-[#CDE9DA] text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            Changes saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="p-1 rounded-xl bg-white border border-[#E6E7E5] space-y-0.5 h-fit shadow-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                : 'text-[#667085] hover:text-[#111318] hover:bg-[#FAFAF9]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'preferences'
                ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                : 'text-[#667085] hover:text-[#111318] hover:bg-[#FAFAF9]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'notifications'
                ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                : 'text-[#667085] hover:text-[#111318] hover:bg-[#FAFAF9]'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'security'
                ? 'bg-[#F0F1EF] text-[#111318] font-semibold'
                : 'text-[#667085] hover:text-[#111318] hover:bg-[#FAFAF9]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Security
          </button>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-6 shadow-xs">
              <div className="border-b border-[#F0F1EF] pb-3">
                <h2 className="text-base font-semibold text-[#111318]">Profile Information</h2>
                <p className="text-xs text-[#667085]">Personal details and primary domain</p>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#111318] font-medium">Full Name</label>
                    <Input defaultValue="Marcus Vance" className="text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#111318] font-medium">Email Address</label>
                    <Input defaultValue="marcus.vance@example.com" className="text-xs" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="primary" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-6 shadow-xs">
              <div className="border-b border-[#F0F1EF] pb-3">
                <h2 className="text-base font-semibold text-[#111318]">Role & Workspace Perspective</h2>
                <p className="text-xs text-[#667085]">Select active workspace mode</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                    role === 'candidate'
                      ? 'bg-[#FAFAF9] border-[#2457D6] text-[#111318]'
                      : 'bg-white border-[#E6E7E5] text-[#667085]'
                  }`}
                >
                  <span className="font-bold block text-[#111318]">Candidate Workspace</span>
                  <span className="text-[11px] text-[#667085]">Career fits and skill telemetry.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                    role === 'employer'
                      ? 'bg-[#FAFAF9] border-[#167A4A] text-[#111318]'
                      : 'bg-white border-[#E6E7E5] text-[#667085]'
                  }`}
                >
                  <span className="font-bold block text-[#111318]">Employer Suite</span>
                  <span className="text-[11px] text-[#667085]">Candidate directory and requisitions.</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs text-xs">
              <div className="border-b border-[#F0F1EF] pb-3">
                <h2 className="text-base font-semibold text-[#111318]">Notification Alerts</h2>
                <p className="text-xs text-[#667085]">Control opportunity and match alerts</p>
              </div>

              <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] cursor-pointer">
                <div>
                  <span className="font-semibold text-[#111318] block">High Fit Opportunity Alerts</span>
                  <span className="text-[#667085]">Notify when requisitions match &gt;90%</span>
                </div>
                <input type="checkbox" defaultChecked className="rounded accent-[#2457D6]" />
              </label>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs text-xs">
              <div className="border-b border-[#F0F1EF] pb-3">
                <h2 className="text-base font-semibold text-[#111318]">Security & Sandboxing</h2>
                <p className="text-xs text-[#667085]">Authentication and data isolation</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-1">
                <span className="font-semibold text-[#111318] block">Two-Factor Authentication (2FA)</span>
                <p className="text-[#667085]">Hardware security key or authenticator app.</p>
                <div className="pt-1">
                  <Badge variant="success">Enabled</Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
