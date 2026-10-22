import { 
  CandidateProfileData, 
  CareerRoleFit, 
  CareerPathway, 
  SkillCategoryGroup, 
  JobOpportunity, 
  EmployerCandidateRecord, 
  EmployerPosition, 
  EmployerAnalyticsData 
} from '../types';

import {
  demoCandidateProfile,
  demoCareerFits,
  demoSkills
} from './demo/demoData';

export const mockCandidateProfile = {
  id: demoCandidateProfile.id,
  name: demoCandidateProfile.candidateName,
  domain: demoCandidateProfile.detectedDomain,
  currentTitle: demoCandidateProfile.currentTitle,
  experienceYears: demoCandidateProfile.yearsOfExperience,
  readinessScore: demoCandidateProfile.readinessScore,
  careerFitPercentage: demoCandidateProfile.overallFitScore,
  skillCoverageScore: demoCandidateProfile.skillCoverageScore,
  skillGapsCount: demoCandidateProfile.skillGapsCount,
  topMatchRole: 'AI/ML Engineer',
  targetRoles: demoCandidateProfile.targetRoles,
  email: demoCandidateProfile.email,
  phone: demoCandidateProfile.phone,
  location: demoCandidateProfile.location,
  summary: demoCandidateProfile.summary
};

export const mockSkillCategories: SkillCategoryGroup[] = demoSkills;
export const mockCareerFits: CareerRoleFit[] = demoCareerFits;

export const mockCareerPathways: CareerPathway[] = [
  {
    id: 'ai-ml-progression',
    domain: 'AI & Machine Learning',
    title: 'AI / ML Track',
    description: 'Progression from software development to specialized production AI and model architecture.',
    currentRole: 'Software Engineer',
    targetRole: 'AI Architect',
    timeframe: '3 - 4 Years',
    bridgeSkills: ['MLOps Fundamentals', 'PyTorch Deep Learning', 'Production ML Deployment', 'Distributed Model Training'],
    steps: [
      {
        id: 's1',
        level: 'L3 / Mid',
        title: 'Software Engineer',
        yearsOfExperienceRange: '2-4 Years',
        focusArea: 'Feature Delivery & Python Craft',
        keyResponsibilities: ['Develop microservices', 'Write unit and integration tests', 'Maintain documentation'],
        coreCompetencies: ['Python', 'SQL', 'Git', 'REST APIs'],
        typicalCompensation: '$120k - $150k',
        status: 'Completed',
        readinessScore: 100
      },
      {
        id: 's2',
        level: 'L4 / Senior',
        title: 'Senior Software Engineer',
        yearsOfExperienceRange: '4-6 Years',
        focusArea: 'Subsystem Ownership & ML Integration',
        keyResponsibilities: ['Own architecture for data ingestion', 'Mentor teammates', 'Drive latency and uptime SLOs'],
        coreCompetencies: ['System Design', 'CI/CD', 'PostgreSQL', 'AWS', 'Python'],
        typicalCompensation: '$155k - $185k',
        status: 'Current Level',
        readinessScore: 92
      },
      {
        id: 's3',
        level: 'L5 / Lead',
        title: 'AI/ML Engineer',
        yearsOfExperienceRange: '5-8 Years',
        focusArea: 'Production Deep Learning & Model Serving',
        keyResponsibilities: ['Develop and fine-tune PyTorch models', 'Establish reproducible MLOps pipelines', 'Optimize model latency with ONNX and TensorRT'],
        coreCompetencies: ['PyTorch', 'MLOps', 'Docker', 'Computer Vision', 'Deep Learning'],
        typicalCompensation: '$180k - $225k',
        status: 'Next Target',
        readinessScore: 91
      },
      {
        id: 's4',
        level: 'L6 / Principal',
        title: 'AI Architect',
        yearsOfExperienceRange: '8+ Years',
        focusArea: 'Enterprise AI Strategy & Distributed Infrastructure',
        keyResponsibilities: ['Define company-wide AI platform architecture', 'Architect multi-node distributed training clusters', 'Align technical roadmap with business ROI'],
        coreCompetencies: ['Distributed Training', 'Enterprise Governance', 'Cloud Strategy', 'High-Scale AI'],
        typicalCompensation: '$240k - $320k+',
        status: 'Future Horizon',
        readinessScore: 64
      }
    ]
  }
];

export const mockJobs: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Machine Learning Engineer',
    company: 'TechNova',
    location: 'Chennai / Hybrid',
    workplaceType: 'Hybrid',
    domain: 'AI & Machine Learning',
    experienceLevel: '0 - 2 Years',
    matchScore: 92,
    salary: '₹14L - ₹22L / yr',
    postedDate: '2 days ago',
    requiredSkills: ['Python', 'PyTorch', 'Computer Vision', 'REST APIs', 'Docker'],
    candidateMatchedSkills: ['Python', 'PyTorch', 'Computer Vision', 'REST APIs'],
    candidateMissingSkills: ['Docker Containerization'],
    matchExplanation: 'Exceptional match with candidate verified Python and PyTorch model building projects.',
    department: 'Vision AI Platform',
    urgency: 'Immediate'
  },
  {
    id: 'job-2',
    title: 'AI/ML Systems Engineer',
    company: 'Anthropic Dynamics',
    location: 'Bengaluru / Remote',
    workplaceType: 'Remote',
    domain: 'AI & Machine Learning',
    experienceLevel: '3 - 5 Years',
    matchScore: 89,
    salary: '₹28L - ₹42L / yr',
    postedDate: '1 day ago',
    requiredSkills: ['Python', 'Deep Learning', 'PyTorch', 'ONNX', 'MLOps', 'AWS'],
    candidateMatchedSkills: ['Python', 'Deep Learning', 'PyTorch', 'ONNX', 'AWS'],
    candidateMissingSkills: ['MLOps'],
    matchExplanation: 'Direct alignment with model quantization and low-latency API architecture.',
    department: 'Inference Infrastructure',
    urgency: 'Immediate'
  },
  {
    id: 'job-3',
    title: 'Senior Embedded Firmware Engineer',
    company: 'Veloce Robotics',
    location: 'Hyderabad / On-site',
    workplaceType: 'On-site',
    domain: 'Embedded Systems',
    experienceLevel: '4 - 7 Years',
    matchScore: 85,
    salary: '₹22L - ₹34L / yr',
    postedDate: '3 days ago',
    requiredSkills: ['C / C++', 'ARM Cortex-M', 'FreeRTOS', 'SPI / I2C', 'Hardware Debugging'],
    candidateMatchedSkills: ['C / C++', 'ARM Cortex-M', 'FreeRTOS', 'Hardware Debugging'],
    candidateMissingSkills: ['Altium PCB Design'],
    matchExplanation: 'Strong bare-metal C and RTOS firmware experience matches autonomous robot controller team.',
    department: 'Robotics Hardware',
    urgency: 'Active'
  },
  {
    id: 'job-4',
    title: 'Cloud Infrastructure & DevOps Engineer',
    company: 'CloudScale Global',
    location: 'Pune / Hybrid',
    workplaceType: 'Hybrid',
    domain: 'Cloud & DevOps',
    experienceLevel: '3 - 6 Years',
    matchScore: 81,
    salary: '₹20L - ₹32L / yr',
    postedDate: '4 days ago',
    requiredSkills: ['AWS Cloud Services', 'Kubernetes', 'CI/CD Pipelines', 'Terraform', 'Docker'],
    candidateMatchedSkills: ['AWS Cloud Services', 'CI/CD Pipelines', 'Docker'],
    candidateMissingSkills: ['Terraform / IaC', 'Kubernetes Helm'],
    matchExplanation: 'Multi-region AWS and GitHub Actions workflows provide solid foundation.',
    department: 'Core Infrastructure',
    urgency: 'Active'
  },
  {
    id: 'job-5',
    title: 'Data & Feature Platform Engineer',
    company: 'Quantis Insights',
    location: 'Bengaluru / Hybrid',
    workplaceType: 'Hybrid',
    domain: 'Data Engineering & Science',
    experienceLevel: '2 - 5 Years',
    matchScore: 78,
    salary: '₹18L - ₹28L / yr',
    postedDate: '5 days ago',
    requiredSkills: ['Python', 'PostgreSQL', 'SQL Optimization', 'Kafka', 'Data Pipeline Design'],
    candidateMatchedSkills: ['Python', 'PostgreSQL', 'Data Pipeline Design'],
    candidateMissingSkills: ['Kafka Streaming'],
    matchExplanation: 'Relational data query modeling and ingestion backend experience.',
    department: 'Analytics Engineering',
    urgency: 'Pipeline'
  }
];

export const mockEmployerCandidates: EmployerCandidateRecord[] = [
  {
    id: 'emp-cand-1',
    name: 'Marcus Vance',
    avatarFallback: 'MV',
    currentTitle: 'Senior Software Engineer (ML Integration)',
    domain: 'AI & Machine Learning',
    experienceYears: 4.8,
    location: 'San Francisco, CA',
    topSkills: ['Python', 'PyTorch', 'AWS', 'Computer Vision'],
    targetRoleMatch: {
      roleTitle: 'AI/ML Engineer',
      percentage: 91
    },
    status: 'Interview',
    skillCoverage: 84,
    appliedDate: '2026-08-28',
    availability: '2 Weeks',
    projectsCount: 2,
    educationSummary: 'M.S. Computer Science'
  },
  {
    id: 'emp-cand-2',
    name: 'Priya Sharma',
    avatarFallback: 'PS',
    currentTitle: 'Embedded Systems Specialist',
    domain: 'Embedded Systems',
    experienceYears: 5.2,
    location: 'Bengaluru, India',
    topSkills: ['C / C++', 'FreeRTOS', 'ARM Cortex-M', 'Edge AI'],
    targetRoleMatch: {
      roleTitle: 'Embedded Systems Engineer',
      percentage: 88
    },
    status: 'Shortlisted',
    skillCoverage: 89,
    appliedDate: '2026-08-30',
    availability: '1 Month',
    projectsCount: 3,
    educationSummary: 'B.E. Electronics & Communication'
  },
  {
    id: 'emp-cand-3',
    name: 'Elena Rostova',
    avatarFallback: 'ER',
    currentTitle: 'Cloud Solutions Architect',
    domain: 'Cloud & DevOps',
    experienceYears: 6.0,
    location: 'Berlin, Germany',
    topSkills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
    targetRoleMatch: {
      roleTitle: 'Cloud Engineer',
      percentage: 94
    },
    status: 'Interview',
    skillCoverage: 92,
    appliedDate: '2026-08-29',
    availability: 'Immediate',
    projectsCount: 4,
    educationSummary: 'M.S. Distributed Systems'
  },
  {
    id: 'emp-cand-4',
    name: 'David Chen',
    avatarFallback: 'DC',
    currentTitle: 'Frontend & UI Architecture Lead',
    domain: 'Software Engineering',
    experienceYears: 4.5,
    location: 'Toronto, Canada',
    topSkills: ['React', 'TypeScript', 'Tailwind CSS', 'System Design'],
    targetRoleMatch: {
      roleTitle: 'Frontend Engineer',
      percentage: 93
    },
    status: 'Review',
    skillCoverage: 86,
    appliedDate: '2026-09-01',
    availability: '2 Weeks',
    projectsCount: 3,
    educationSummary: 'B.S. Software Engineering'
  },
  {
    id: 'emp-cand-5',
    name: 'Sarah Jenkins',
    avatarFallback: 'SJ',
    currentTitle: 'Lead Data Engineer',
    domain: 'Data Engineering & Science',
    experienceYears: 7.0,
    location: 'Austin, TX',
    topSkills: ['PostgreSQL', 'Spark', 'Python', 'Kafka'],
    targetRoleMatch: {
      roleTitle: 'Data Engineer',
      percentage: 90
    },
    status: 'Shortlisted',
    skillCoverage: 91,
    appliedDate: '2026-08-25',
    availability: 'Immediate',
    projectsCount: 5,
    educationSummary: 'M.S. Data Science'
  },
  {
    id: 'emp-cand-6',
    name: 'Kavita Patel',
    avatarFallback: 'KP',
    currentTitle: 'Security Systems Engineer',
    domain: 'Cybersecurity',
    experienceYears: 3.5,
    location: 'London, UK',
    topSkills: ['IAM Security', 'Threat Modeling', 'Python', 'SOC2'],
    targetRoleMatch: {
      roleTitle: 'Security Engineer',
      percentage: 82
    },
    status: 'New',
    skillCoverage: 79,
    appliedDate: '2026-09-02',
    availability: 'Passive',
    projectsCount: 2,
    educationSummary: 'B.S. Cybersecurity'
  },
  {
    id: 'emp-cand-7',
    name: 'Tariq Al-Mansoor',
    avatarFallback: 'TM',
    currentTitle: 'Robotics Control Developer',
    domain: 'Embedded Systems',
    experienceYears: 2.0,
    location: 'Dubai, UAE',
    topSkills: ['ROS2', 'C++', 'Motion Planning', 'Linux'],
    targetRoleMatch: {
      roleTitle: 'Robotics Software Engineer',
      percentage: 71
    },
    status: 'Rejected',
    skillCoverage: 68,
    appliedDate: '2026-08-20',
    availability: 'Immediate',
    projectsCount: 1,
    educationSummary: 'B.S. Mechatronics'
  }
];

export const mockEmployerPositions: EmployerPosition[] = [
  {
    id: 'pos-1',
    title: 'AI/ML Engineer',
    department: 'Vision AI Platform',
    domain: 'AI & Machine Learning',
    location: 'Remote / US',
    type: 'Full-time',
    applicantsCount: 42,
    shortlistedCount: 8,
    matchQuality: 'Very High',
    avgMatchScore: 89,
    status: 'Open',
    createdDate: '2026-08-15',
    priority: 'Urgent',
    requiredSkills: ['Python', 'PyTorch', 'MLOps', 'Docker', 'Computer Vision']
  },
  {
    id: 'pos-2',
    title: 'Frontend Engineer',
    department: 'Product Experience',
    domain: 'Software Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    applicantsCount: 68,
    shortlistedCount: 11,
    matchQuality: 'Optimal',
    avgMatchScore: 91,
    status: 'Open',
    createdDate: '2026-08-10',
    priority: 'High',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'State Architecture']
  },
  {
    id: 'pos-3',
    title: 'Embedded Systems Engineer',
    department: 'Firmware Core',
    domain: 'Embedded Systems',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    applicantsCount: 31,
    shortlistedCount: 5,
    matchQuality: 'High',
    avgMatchScore: 85,
    status: 'Open',
    createdDate: '2026-08-18',
    priority: 'Normal',
    requiredSkills: ['C / C++', 'ARM Cortex-M', 'FreeRTOS', 'I2C / SPI', 'Hardware Debugging']
  },
  {
    id: 'pos-4',
    title: 'Data Engineer',
    department: 'Analytics Infrastructure',
    domain: 'Data Engineering & Science',
    location: 'Remote / Global',
    type: 'Full-time',
    applicantsCount: 54,
    shortlistedCount: 6,
    matchQuality: 'High',
    avgMatchScore: 87,
    status: 'Open',
    createdDate: '2026-08-12',
    priority: 'High',
    requiredSkills: ['PostgreSQL', 'SQL Optimization', 'Python', 'Kafka', 'Spark']
  },
  {
    id: 'pos-5',
    title: 'Cloud Engineer',
    department: 'Platform Reliability',
    domain: 'Cloud & DevOps',
    location: 'London / Remote',
    type: 'Full-time',
    applicantsCount: 53,
    shortlistedCount: 2,
    matchQuality: 'Very High',
    avgMatchScore: 93,
    status: 'Open',
    createdDate: '2026-08-22',
    priority: 'Urgent',
    requiredSkills: ['AWS Cloud Services', 'Kubernetes', 'Terraform', 'CI/CD Pipelines']
  }
];

export const mockEmployerAnalytics: EmployerAnalyticsData = {
  totalCandidates: 248,
  shortlistedCandidates: 32,
  interviewReadyCandidates: 14,
  openPositionsCount: 12,
  overallSkillCoverage: 87,
  domainDistribution: [
    { domain: 'AI & Machine Learning', count: 72, percentage: 29 },
    { domain: 'Software Engineering', count: 68, percentage: 27 },
    { domain: 'Cloud & DevOps', count: 42, percentage: 17 },
    { domain: 'Data Engineering & Science', count: 34, percentage: 14 },
    { domain: 'Embedded Systems', count: 20, percentage: 8 },
    { domain: 'Cybersecurity', count: 12, percentage: 5 }
  ],
  experienceDistribution: [
    { range: '0 - 2 Yrs', count: 48 },
    { range: '3 - 5 Yrs', count: 112 },
    { range: '6 - 8 Yrs', count: 64 },
    { range: '9+ Yrs', count: 24 }
  ],
  topSkillsDistribution: [
    { skill: 'Python', candidateCount: 198, avgProficiency: 89 },
    { skill: 'TypeScript & React', candidateCount: 145, avgProficiency: 86 },
    { skill: 'AWS Cloud', candidateCount: 132, avgProficiency: 84 },
    { skill: 'Deep Learning', candidateCount: 96, avgProficiency: 82 },
    { skill: 'Embedded C', candidateCount: 48, avgProficiency: 80 },
    { skill: 'Kubernetes', candidateCount: 64, avgProficiency: 74 }
  ],
  hiringVelocity: [
    { month: 'Apr', sourced: 34, interviewed: 8, hired: 2 },
    { month: 'May', sourced: 42, interviewed: 12, hired: 3 },
    { month: 'Jun', sourced: 56, interviewed: 15, hired: 4 },
    { month: 'Jul', sourced: 68, interviewed: 18, hired: 5 },
    { month: 'Aug', sourced: 48, interviewed: 14, hired: 4 }
  ],
  skillDemandVsSupply: [
    { skill: 'MLOps', demandPercent: 88, supplyPercent: 34, shortageRisk: 'High' },
    { skill: 'Terraform IaC', demandPercent: 82, supplyPercent: 44, shortageRisk: 'High' },
    { skill: 'PyTorch / Vision', demandPercent: 78, supplyPercent: 68, shortageRisk: 'Moderate' },
    { skill: 'TypeScript', demandPercent: 85, supplyPercent: 80, shortageRisk: 'Low' },
    { skill: 'Python', demandPercent: 95, supplyPercent: 92, shortageRisk: 'Low' }
  ]
};
