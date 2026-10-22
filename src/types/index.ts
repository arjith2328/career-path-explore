export type UserRole = 'candidate' | 'employer';

export type TechnicalDomain = 
  | 'Software Engineering'
  | 'AI & Machine Learning'
  | 'Data Engineering & Science'
  | 'Cloud & DevOps'
  | 'Cybersecurity'
  | 'Hardware Engineering'
  | 'Electronics'
  | 'Embedded Systems'
  | 'Robotics'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Management'
  | 'Research'
  | 'Other';

export type SkillProficiency = 'Strong' | 'Developing' | 'Missing';
export type EvidenceType = 'Explicitly Detected' | 'Inferred' | 'Missing / Not Detected';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'N/A';

export interface SkillEvidenceItem {
  id: string;
  name: string;
  category: string;
  domain: TechnicalDomain;
  status: SkillProficiency;
  evidenceType?: EvidenceType;
  confidence?: ConfidenceLevel;
  score: number; // 0 - 100
  yearsOfExperience?: number;
  lastUsed?: string;
  industryBenchmark?: number; // 0 - 100
  sourceQuote?: string; // Exact text quote from resume
  evidence?: string; // Alias for sourceQuote / evidence
  contextSnippet?: string;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  domain: TechnicalDomain;
  skills: SkillEvidenceItem[];
  strongCount: number;
  developingCount: number;
  missingCount: number;
  overallCoverage: number; // 0 - 100
}

export interface ExplainableMatchBreakdown {
  technicalSkillsScore: number; // e.g. 92%
  experienceAlignmentScore: number; // e.g. 81%
  projectAlignmentScore: number; // e.g. 87%
  educationAlignmentScore: number; // e.g. 94%
  semanticMatchScore?: number; // e.g. 85%
  domainMatchScore?: number; // e.g. 95%
  skillGapScore: number; // e.g. 18%
  whyYouMatch: {
    point: string;
    sourceEvidence?: string;
  }[];
  whatIsMissing: {
    point: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
}

export interface CareerRoleFit {
  id: string;
  roleTitle: string;
  domain: TechnicalDomain;
  fitPercentage: number;
  marketDemand: 'Very High' | 'High' | 'Moderate' | 'Emerging';
  salaryRange: {
    min: string;
    max: string;
    median: string;
  };
  experienceAlignment: 'Direct Alignment' | 'Adjacent Transition' | 'Growth Target' | 'Stretch Target';
  alignedSkills: string[];
  missingSkills: string[];
  developingSkills: string[];
  whyThisMatch: string;
  estimatedTimeToReadyMonths: number;
  transitionComplexity: 'Low' | 'Moderate' | 'High';
  keyMilestones: string[];
  explainableBreakdown?: ExplainableMatchBreakdown;
}

export interface CareerProgressionStep {
  id: string;
  level: string;
  title: string;
  yearsOfExperienceRange: string;
  focusArea: string;
  keyResponsibilities: string[];
  coreCompetencies: string[];
  typicalCompensation: string;
  status: 'Current Level' | 'Next Target' | 'Future Horizon' | 'Completed';
  readinessScore?: number;
}

export interface CareerPathway {
  id: string;
  domain: TechnicalDomain;
  title: string;
  description: string;
  currentRole: string;
  targetRole: string;
  steps: CareerProgressionStep[];
  bridgeSkills: string[];
  timeframe: string;
}

export interface RoadmapMilestone {
  id: string;
  phase: 'Current State' | 'Skill Development' | 'Projects' | 'Experience' | 'Target Role';
  title: string;
  actionType: 'Learn' | 'Improve' | 'Build' | 'Verify' | 'Target';
  targetSkillOrOutput: string;
  description: string;
  estimatedWeeks: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  resourceHint?: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  domain: TechnicalDomain;
  experienceLevel: string;
  matchScore: number;
  salary: string;
  postedDate: string;
  requiredSkills: string[];
  candidateMatchedSkills: string[];
  candidateMissingSkills: string[];
  matchExplanation: string;
  department: string;
  urgency: 'Immediate' | 'Active' | 'Pipeline';
}

export interface CandidateProfileData {
  id: string;
  name: string;
  domain: TechnicalDomain;
  currentTitle: string;
  experienceYears: number;
  readinessScore: number;
  careerFitPercentage: number;
  skillCoverageScore: number;
  skillGapsCount: number;
  topMatchRole: string;
  targetRoles: string[];
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface ResumeExtractedProfile {
  id: string;
  candidateName: string;
  detectedDomain: TechnicalDomain;
  secondaryDomains: TechnicalDomain[];
  documentName: string;
  fileSizeBytes: number;
  parsedDate: string;
  yearsOfExperience: number;
  readinessScore: number;
  overallFitScore: number;
  skillCoverageScore: number;
  skillGapsCount: number;
  summary: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  currentEmployer: string;
  targetRoles: string[];
  skills: SkillEvidenceItem[];
  skillCategories: SkillCategoryGroup[];
  recentMatches: CareerRoleFit[];
  roadmap: RoadmapMilestone[];
  education: {
    degree: string;
    institution: string;
    year: string;
    evidenceSnippet: string;
    isDetected: boolean;
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    domain: TechnicalDomain;
    highlights: string[];
    extractedSkills: string[];
    evidenceSnippet: string;
  }[];
  projects: {
    title: string;
    role: string;
    description: string;
    technologies: string[];
    evidenceSnippet: string;
    impactOutcome?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
    status: 'Verified from Resume' | 'Not Detected';
  }[];
  achievements?: string[];
  publications?: string[];
}

export interface AnalyzeResumeResponse {
  success: boolean;
  message: string;
  candidateProfile: ResumeExtractedProfile;
  domains: Record<string, number>;
  skills: SkillEvidenceItem[];
  experience: ResumeExtractedProfile['experience'];
  education: ResumeExtractedProfile['education'];
  careerMatches: CareerRoleFit[];
  skillGaps: {
    skill: string;
    priority: 'High' | 'Medium' | 'Low';
    targetRole: string;
    gapDeficit: string;
  }[];
  careerPath: CareerPathway;
  transitions: {
    targetRole: string;
    targetDomain: TechnicalDomain;
    transitionScore: number;
    transferableSkills: string[];
    missingSkills: string[];
    recommendedAction: string;
  }[];
  roadmap: RoadmapMilestone[];
  explanations: string[];
}

export type CandidateStatus = 'New' | 'Shortlisted' | 'Interview' | 'Review' | 'Rejected';

export interface EmployerCandidateRecord {
  id: string;
  name: string;
  avatarFallback: string;
  currentTitle: string;
  domain: TechnicalDomain;
  experienceYears: number;
  location: string;
  topSkills: string[];
  targetRoleMatch: {
    roleTitle: string;
    percentage: number;
  };
  status: CandidateStatus;
  skillCoverage: number;
  appliedDate: string;
  availability: 'Immediate' | '2 Weeks' | '1 Month' | 'Passive';
  projectsCount?: number;
  educationSummary?: string;
}

export interface EmployerPosition {
  id: string;
  title: string;
  department: string;
  domain: TechnicalDomain;
  location: string;
  type: string;
  applicantsCount: number;
  shortlistedCount: number;
  matchQuality: 'High' | 'Very High' | 'Optimal' | 'Medium';
  avgMatchScore: number;
  status: 'Open' | 'Closed';
  createdDate: string;
  priority: 'Urgent' | 'High' | 'Normal';
  requiredSkills: string[];
}

export interface EmployerAnalyticsData {
  totalCandidates: number;
  shortlistedCandidates: number;
  interviewReadyCandidates: number;
  openPositionsCount: number;
  overallSkillCoverage: number;
  domainDistribution: {
    domain: TechnicalDomain;
    count: number;
    percentage?: number;
    avgMatch?: number;
  }[];
  experienceDistribution: {
    range: string;
    count: number;
  }[];
  topSkillsDistribution: {
    skill: string;
    candidateCount: number;
    avgProficiency: number;
  }[];
  hiringVelocity: {
    month: string;
    sourced: number;
    interviewed: number;
    hired: number;
  }[];
  skillDemandVsSupply: {
    skill: string;
    demandPercent: number;
    supplyPercent: number;
    shortageRisk: 'High' | 'Moderate' | 'Low';
  }[];
}
