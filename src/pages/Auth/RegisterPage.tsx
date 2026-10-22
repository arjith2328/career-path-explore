import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { Compass, Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('AI & Machine Learning');
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer'>('candidate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'candidate') {
      navigate('/candidate/dashboard');
    } else {
      navigate('/employer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-3 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold">
            <Compass className="w-4 h-4 text-slate-950 fill-current" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            CAREER PATH <span className="text-sky-400 font-mono text-xs">EXPLORER</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Create your intelligence account
        </h2>
        <p className="text-xs text-slate-400">
          Begin tracking your career fit and multi-domain engineering competencies.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-6 bg-slate-900/90 border-slate-800 shadow-xl space-y-5">
          {/* Account Role Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Account Type</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-md border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedRole('candidate')}
                className={`py-1.5 rounded transition-all font-medium ${
                  selectedRole === 'candidate'
                    ? 'bg-slate-800 text-sky-400 border border-slate-700 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Candidate / Engineer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('employer')}
                className={`py-1.5 rounded transition-all font-medium ${
                  selectedRole === 'employer'
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Recruiter / Employer
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <Input
                placeholder="e.g. Marcus Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Work Email</label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Primary Technical Domain</label>
              <Select value={domain} onChange={(e) => setDomain(e.target.value)}>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Embedded Systems">Embedded Systems</option>
                <option value="Robotics">Robotics</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Data Engineering & Science">Data Engineering & Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Electronics">Electronics</option>
                <option value="Hardware Engineering">Hardware Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Create Password</label>
              <Input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full text-xs h-10 mt-3">
              Create Enterprise Account
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>

          <div className="pt-3 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
