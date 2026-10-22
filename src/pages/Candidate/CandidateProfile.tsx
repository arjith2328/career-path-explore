import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Download,
  Code2,
  Award,
  FileText,
  ArrowRight,
  UploadCloud,
  CheckCircle,
  Quote,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidateProfile: React.FC = () => {
  const { candidateProfile } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'explicit' | 'strong' | 'developing'>('all');

  if (!candidateProfile) {
    return (
      <div className="space-y-8 max-w-4xl py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#E6E7E5] text-center space-y-6 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#F0F4FE] text-[#2457D6] flex items-center justify-center mx-auto shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111318]">
              No Profile Dossier Generated
            </h1>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
              Upload your resume to extract verified skills, job history, and exact quote citations with zero hallucinations.
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

  const profile = candidateProfile;

  const initials = profile.candidateName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const filteredSkills = profile.skills.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'explicit') return s.evidenceType === 'Explicitly Detected';
    if (activeFilter === 'strong') return s.status === 'Strong';
    if (activeFilter === 'developing') return s.status === 'Developing';
    return true;
  });

  return (
    <div className="space-y-10 max-w-5xl">
      {/* 1. Executive Top Profile Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-[#E6E7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#111318] text-white font-mono font-semibold flex items-center justify-center text-sm flex-shrink-0">
            {initials || 'CP'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111318]">
                {profile.candidateName}
              </h1>
              <Badge variant="info">{profile.detectedDomain}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#667085]">
              {profile.currentTitle} • {profile.currentEmployer}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8E98A8] font-mono pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {profile.documentName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/upload">
            <Button variant="secondary" size="sm" className="text-xs gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Upload New
            </Button>
          </Link>
          <Link to="/candidate">
            <Button variant="primary" size="sm" className="text-xs gap-1.5">
              Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Professional Summary Section */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-3 shadow-xs">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8E98A8]">
          Executive Technical Summary
        </h2>
        <p className="text-xs sm:text-sm text-[#111318] leading-relaxed">
          {profile.summary}
        </p>
      </div>

      {/* 3. Verified Experience Section */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0F1EF] pb-3">
          <div>
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Verified Experience
            </h2>
            <p className="text-xs text-[#667085]">Positions detected from uploaded resume text</p>
          </div>
          <span className="text-xs font-mono text-[#8E98A8]">{profile.yearsOfExperience} Yrs Verified</span>
        </div>

        {profile.experience && profile.experience.length > 0 ? (
          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-[#111318] text-sm">{exp.title}</h3>
                    <span className="text-[#667085]">{exp.company}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8E98A8]">{exp.period}</span>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1 text-[#667085] list-disc list-inside">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="leading-relaxed">
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.extractedSkills && exp.extractedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.extractedSkills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAF9] text-[#111318] border border-[#E6E7E5]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#8E98A8] italic font-mono">
            No structured work experience blocks detected in document.
          </p>
        )}
      </div>

      {/* 4. Skills with Genuine Evidence Citations */}
      <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0F1EF] pb-3 gap-3">
          <div>
            <h2 className="text-base font-semibold text-[#111318] tracking-tight">
              Extracted Competencies & Evidence Traceability
            </h2>
            <p className="text-xs text-[#667085]">Exact text quotes and confidence ratings verified from source text</p>
          </div>
          <Badge variant="default">{profile.skills.length} Detected Skills</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-3.5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111318]">{skill.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-white border border-[#E6E7E5] text-[#167A4A] font-semibold">
                  {skill.status} (Score {skill.score})
                </span>
              </div>

              {skill.sourceQuote && (
                <div className="p-2 rounded bg-white border border-[#E6E7E5]/60 text-[11px] text-[#667085] italic font-mono flex items-start gap-1.5">
                  <Quote className="w-3 h-3 text-[#8E98A8] flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">&quot;{skill.sourceQuote}&quot;</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-[#8E98A8] pt-1 border-t border-[#E6E7E5]/60">
                <span>Confidence: {skill.confidence || 'High'}</span>
                <span>Category: {skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Projects & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <h2 className="text-base font-semibold text-[#111318] tracking-tight flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#2457D6]" />
            Engineering Projects ({profile.projects ? profile.projects.length : 0})
          </h2>

          {profile.projects && profile.projects.length > 0 ? (
            <div className="space-y-4 text-xs">
              {profile.projects.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111318]">{proj.title}</h3>
                    <span className="text-[10px] font-mono text-[#8E98A8]">{proj.role}</span>
                  </div>
                  <p className="text-[#667085] text-[11px]">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {proj.technologies.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E6E7E5] text-[#111318]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {proj.impactOutcome && (
                    <span className="text-[10px] font-mono text-[#167A4A] block">
                      Outcome: {proj.impactOutcome}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#8E98A8] italic font-mono">Projects: Not detected in resume</p>
          )}
        </div>

        {/* Education & Certifications */}
        <div className="p-6 rounded-xl bg-white border border-[#E6E7E5] space-y-4 shadow-xs">
          <h2 className="text-base font-semibold text-[#111318] tracking-tight flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#6941C6]" />
            Education & Certifications
          </h2>

          <div className="space-y-3 text-xs">
            {profile.education && profile.education.length > 0 ? (
              profile.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#FAFAF9] border border-[#E6E7E5] space-y-0.5">
                  <span className="font-bold text-[#111318] block">{edu.degree}</span>
                  <span className="text-[#667085] block">{edu.institution} · {edu.year}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8E98A8] italic font-mono">Education: Not detected in resume</p>
            )}

            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#8E98A8] block">Certifications</span>
              {profile.certifications && profile.certifications.length > 0 ? (
                profile.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between py-1 text-[11px]">
                    <span className="text-[#111318] font-medium">{cert.name}</span>
                    <Badge variant={cert.status === 'Verified from Resume' ? 'success' : 'neutral'} size="sm">
                      {cert.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8E98A8] italic font-mono">Certifications: Not detected in resume</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
