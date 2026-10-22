import { 
  ResumeExtractedProfile,
  CareerRoleFit,
  CareerPathway,
  JobOpportunity,
  EmployerCandidateRecord,
  EmployerPosition,
  SkillCategoryGroup
} from '../../types';

export const demoSkills: SkillCategoryGroup[] = [
  {
    id: 'prog',
    name: 'Programming & Core Code Craft',
    domain: 'Software Engineering',
    strongCount: 3,
    developingCount: 2,
    missingCount: 1,
    overallCoverage: 84,
    skills: [
      {
        id: 'p1',
        name: 'Python',
        category: 'Programming',
        domain: 'Software Engineering',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 92,
        yearsOfExperience: 4,
        lastUsed: 'Current',
        industryBenchmark: 88,
        sourceQuote: 'Developed streaming LLM inference backend and asynchronous PyTorch evaluation pipelines in Python (FastAPI/AsyncIO).',
        contextSnippet: 'Aetheria Systems Corp — Experience Section'
      },
      {
        id: 'p2',
        name: 'C / C++',
        category: 'Programming',
        domain: 'Embedded Systems',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 85,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 80,
        sourceQuote: 'Authored bare-metal C device drivers and memory-safe quantization kernels for ARM Cortex-M microcontrollers.',
        contextSnippet: 'Nexis Tech Labs — Experience Section'
      },
      {
        id: 'p3',
        name: 'TypeScript & React',
        category: 'Programming',
        domain: 'Software Engineering',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 88,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 85,
        sourceQuote: 'Built telemetry dashboards and design token architecture using TypeScript, React 19, and Tailwind CSS.',
        contextSnippet: 'Aetheria Systems Corp — Experience Section'
      },
      {
        id: 'p4',
        name: 'SQL & PostgreSQL',
        category: 'Programming',
        domain: 'Data Engineering & Science',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 67,
        yearsOfExperience: 3,
        lastUsed: '3 mos ago',
        industryBenchmark: 78,
        sourceQuote: 'Designed relational PostgreSQL schema and analytical aggregation queries for ingestion events.',
        contextSnippet: 'Nexis Tech Labs — Experience Section'
      },
      {
        id: 'p5',
        name: 'Go (Golang)',
        category: 'Programming',
        domain: 'Cloud & DevOps',
        status: 'Developing',
        evidenceType: 'Inferred',
        confidence: 'Medium',
        score: 55,
        yearsOfExperience: 1,
        lastUsed: '6 mos ago',
        industryBenchmark: 74,
        sourceQuote: 'Contributed to microservice RPC gateway maintenance (Inferred from backend repository commits cited in GitHub portfolio).',
        contextSnippet: 'Portfolio & Secondary Signal'
      },
      {
        id: 'p6',
        name: 'Rust',
        category: 'Programming',
        domain: 'Software Engineering',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 20,
        yearsOfExperience: 0,
        industryBenchmark: 70,
        sourceQuote: 'Not detected in resume. Identified as emerging skill for low-latency networking engines.'
      }
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    domain: 'AI & Machine Learning',
    strongCount: 3,
    developingCount: 1,
    missingCount: 2,
    overallCoverage: 88,
    skills: [
      {
        id: 'ai1',
        name: 'Machine Learning',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 88,
        yearsOfExperience: 4,
        lastUsed: 'Current',
        industryBenchmark: 84,
        sourceQuote: 'Implemented supervised classifier pipelines, cross-validation suites, and feature engineering for sensor telemetry.',
        contextSnippet: 'Academic Research & Aetheria Systems'
      },
      {
        id: 'ai2',
        name: 'Deep Learning & PyTorch',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 84,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 80,
        sourceQuote: 'Fine-tuned vision transformers and convolutional neural networks in PyTorch for real-time edge anomaly detection.',
        contextSnippet: 'Aetheria Systems Corp — Experience Section'
      },
      {
        id: 'ai3',
        name: 'Computer Vision & OpenCV',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 82,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 76,
        sourceQuote: 'Architected image preprocessing and object bounding box estimation pipeline with OpenCV.',
        contextSnippet: 'Master Thesis Project & Nexis Tech Labs'
      },
      {
        id: 'ai4',
        name: 'Model Optimization & ONNX',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 68,
        yearsOfExperience: 1,
        lastUsed: '1 mo ago',
        industryBenchmark: 75,
        sourceQuote: 'Exported PyTorch weights to ONNX Runtime and benchmarked INT8 quantization speedups on x86 and ARM.',
        contextSnippet: 'Aetheria Systems Corp — Projects'
      },
      {
        id: 'ai5',
        name: 'MLOps & Automation',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 28,
        yearsOfExperience: 0,
        industryBenchmark: 80,
        sourceQuote: 'Not detected in resume. Identified as primary bridge competency for AI/ML Engineer role qualification.'
      },
      {
        id: 'ai6',
        name: 'Distributed Training (DeepSpeed)',
        category: 'AI / ML',
        domain: 'AI & Machine Learning',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 20,
        yearsOfExperience: 0,
        industryBenchmark: 82,
        sourceQuote: 'Not detected in resume. Gap for multi-node LLM scaling.'
      }
    ]
  },
  {
    id: 'cloud-infra',
    name: 'Cloud & Infrastructure',
    domain: 'Cloud & DevOps',
    strongCount: 2,
    developingCount: 2,
    missingCount: 2,
    overallCoverage: 72,
    skills: [
      {
        id: 'c1',
        name: 'AWS Cloud Services',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 84,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 80,
        sourceQuote: 'Architected multi-region AWS infrastructure utilizing EC2, S3, RDS, Lambda, and IAM security groups.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'c2',
        name: 'CI/CD Pipelines (GitHub Actions)',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 86,
        yearsOfExperience: 4,
        lastUsed: 'Current',
        industryBenchmark: 82,
        sourceQuote: 'Built end-to-end GitHub Actions matrix workflow for unit tests, lint enforcement, and staging deploys.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'c3',
        name: 'Kubernetes',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'Medium',
        score: 65,
        yearsOfExperience: 2,
        lastUsed: '2 mos ago',
        industryBenchmark: 78,
        sourceQuote: 'Managed Helm charts and pod resource limits on staging EKS Kubernetes clusters.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'c4',
        name: 'Docker Containerization',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'Medium',
        score: 42,
        yearsOfExperience: 1,
        lastUsed: '6 mos ago',
        industryBenchmark: 85,
        sourceQuote: 'Containerized local development dependencies and test workers using Docker.',
        contextSnippet: 'Nexis Tech Labs'
      },
      {
        id: 'c5',
        name: 'Terraform / IaC',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 25,
        yearsOfExperience: 0,
        industryBenchmark: 72,
        sourceQuote: 'Not detected in resume.'
      },
      {
        id: 'c6',
        name: 'Production Cloud Deployment SLOs',
        category: 'Cloud',
        domain: 'Cloud & DevOps',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 30,
        yearsOfExperience: 0,
        industryBenchmark: 80,
        sourceQuote: 'Not detected in resume.'
      }
    ]
  },
  {
    id: 'embedded-hw',
    name: 'Embedded Systems & Hardware',
    domain: 'Embedded Systems',
    strongCount: 2,
    developingCount: 2,
    missingCount: 2,
    overallCoverage: 70,
    skills: [
      {
        id: 'emb1',
        name: 'ARM Cortex-M Microcontrollers',
        category: 'Embedded Systems',
        domain: 'Embedded Systems',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 84,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 78,
        sourceQuote: 'Programmed STM32 Cortex-M4 boards with hardware timers, DMA buffers, and SPI sensor communication.',
        contextSnippet: 'Nexis Tech Labs'
      },
      {
        id: 'emb2',
        name: 'FreeRTOS & RTOS Scheduling',
        category: 'Embedded Systems',
        domain: 'Embedded Systems',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 80,
        yearsOfExperience: 2,
        lastUsed: 'Current',
        industryBenchmark: 76,
        sourceQuote: 'Configured FreeRTOS task priorities and semaphore synchronization for real-time sensor loops.',
        contextSnippet: 'Nexis Tech Labs'
      },
      {
        id: 'emb3',
        name: 'Edge AI & TFLite Micro',
        category: 'Embedded Systems',
        domain: 'Embedded Systems',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 65,
        yearsOfExperience: 1,
        lastUsed: '3 mos ago',
        industryBenchmark: 72,
        sourceQuote: 'Compiled TensorFlow Lite for Microcontrollers model for keyword detection with 180KB RAM footprint.',
        contextSnippet: 'Academic Research'
      },
      {
        id: 'emb4',
        name: 'Hardware Oscilloscope Debugging',
        category: 'Hardware',
        domain: 'Hardware Engineering',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 62,
        yearsOfExperience: 2,
        lastUsed: '4 mos ago',
        industryBenchmark: 70,
        sourceQuote: 'Triaged I2C bus collision errors using digital oscilloscopes and Saleae logic analyzers.',
        contextSnippet: 'Nexis Tech Labs'
      },
      {
        id: 'emb5',
        name: 'High-Speed PCB Design (Altium / KiCad)',
        category: 'Electronics',
        domain: 'Electronics',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 20,
        yearsOfExperience: 0,
        industryBenchmark: 68,
        sourceQuote: 'Not detected in resume.'
      },
      {
        id: 'emb6',
        name: 'FPGA & Verilog RTL',
        category: 'Hardware',
        domain: 'Hardware Engineering',
        status: 'Missing',
        evidenceType: 'Missing / Not Detected',
        confidence: 'N/A',
        score: 15,
        yearsOfExperience: 0,
        industryBenchmark: 70,
        sourceQuote: 'Not detected in resume.'
      }
    ]
  },
  {
    id: 'leadership-comm',
    name: 'Technical Leadership & Communication',
    domain: 'Software Engineering',
    strongCount: 3,
    developingCount: 1,
    missingCount: 0,
    overallCoverage: 88,
    skills: [
      {
        id: 'l1',
        name: 'Technical System Architecture Design',
        category: 'Leadership',
        domain: 'Software Engineering',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 88,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 82,
        sourceQuote: 'Authored technical RFC specifications for multi-tenant inference broker adopted across 3 backend squads.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'l2',
        name: 'Cross-functional Collaboration',
        category: 'Communication',
        domain: 'Software Engineering',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 90,
        yearsOfExperience: 4,
        lastUsed: 'Current',
        industryBenchmark: 85,
        sourceQuote: 'Partnered with Product Managers, Data Scientists, and Embedded firmware engineers on quarterly delivery goals.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'l3',
        name: 'Code Review & Mentorship',
        category: 'Leadership',
        domain: 'Software Engineering',
        status: 'Strong',
        evidenceType: 'Explicitly Detected',
        confidence: 'High',
        score: 86,
        yearsOfExperience: 3,
        lastUsed: 'Current',
        industryBenchmark: 80,
        sourceQuote: 'Mentored 3 junior software engineers and standardized asynchronous Python code review guidelines.',
        contextSnippet: 'Aetheria Systems Corp'
      },
      {
        id: 'l4',
        name: 'Project Scoping & Delivery Planning',
        category: 'Leadership',
        domain: 'Software Engineering',
        status: 'Developing',
        evidenceType: 'Explicitly Detected',
        confidence: 'Medium',
        score: 68,
        yearsOfExperience: 2,
        lastUsed: 'Current',
        industryBenchmark: 75,
        sourceQuote: 'Assisted engineering managers in sprint planning and capacity forecasting for ML deployment milestones.',
        contextSnippet: 'Aetheria Systems Corp'
      }
    ]
  }
];

export const demoCareerFits: CareerRoleFit[] = [
  {
    id: 'ai-ml-engineer',
    roleTitle: 'AI / ML Engineer',
    domain: 'AI & Machine Learning',
    fitPercentage: 91,
    marketDemand: 'Very High',
    salaryRange: { min: '$165k', median: '$195k', max: '$235k' },
    experienceAlignment: 'Direct Alignment',
    alignedSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'PyTorch'],
    developingSkills: ['Model Optimization & ONNX', 'SQL'],
    missingSkills: ['MLOps Fundamentals', 'Docker Container Deployment'],
    whyThisMatch: 'Strong mathematical foundation in deep learning and 4+ years of Python pipelines give 91% alignment. Closing MLOps and container deployment provides immediate senior qualification.',
    estimatedTimeToReadyMonths: 2,
    transitionComplexity: 'Low',
    keyMilestones: [
      'Master MLOps fundamentals and experiment tracking',
      'Containerize ML inference service with Docker and deploy to AWS',
      'Deliver an end-to-end production ML project with latency SLOs'
    ],
    explainableBreakdown: {
      technicalSkillsScore: 92,
      experienceAlignmentScore: 81,
      projectAlignmentScore: 87,
      educationAlignmentScore: 94,
      skillGapScore: 18,
      whyYouMatch: [
        {
          point: 'Detected production Python & PyTorch pipelines in current role at Aetheria Systems Corp',
          sourceEvidence: '"Developed streaming LLM inference backend and asynchronous PyTorch evaluation pipelines in Python."'
        },
        {
          point: 'Relevant Computer Vision & Deep Learning project experience with documented latency benchmarks',
          sourceEvidence: '"Fine-tuned vision transformers in PyTorch for real-time edge anomaly detection."'
        },
        {
          point: 'Relevant academic background: M.S. in Computer Science with Distributed Systems & Machine Learning focus',
          sourceEvidence: '"University of Washington — M.S. Computer Science (2021)"'
        }
      ],
      whatIsMissing: [
        { point: 'MLOps Pipeline Automation (Experiment tracking and drift telemetry)', impact: 'High' },
        { point: 'Production Multi-stage Docker Containerization for GPU workloads', impact: 'High' },
        { point: 'Production Cloud Deployment with canary release rollback automation', impact: 'Medium' }
      ]
    }
  },
  {
    id: 'machine-learning-engineer',
    roleTitle: 'Machine Learning Engineer',
    domain: 'AI & Machine Learning',
    fitPercentage: 87,
    marketDemand: 'Very High',
    salaryRange: { min: '$150k', median: '$180k', max: '$215k' },
    experienceAlignment: 'Direct Alignment',
    alignedSkills: ['Python', 'Machine Learning', 'Data Pipelines', 'Deep Learning'],
    developingSkills: ['SQL', 'Kubernetes'],
    missingSkills: ['MLOps Fundamentals', 'Production ML CI/CD'],
    whyThisMatch: 'Exceptional feature engineering and model training foundation. 87% baseline ready for production ML engineering teams.',
    estimatedTimeToReadyMonths: 3,
    transitionComplexity: 'Low',
    keyMilestones: [
      'Build automated training pipeline with dataset versioning',
      'Integrate model evaluation metrics into CI/CD regression tests',
      'Deploy REST endpoint serving model predictions'
    ],
    explainableBreakdown: {
      technicalSkillsScore: 88,
      experienceAlignmentScore: 84,
      projectAlignmentScore: 86,
      educationAlignmentScore: 90,
      skillGapScore: 22,
      whyYouMatch: [
        {
          point: 'Extensive dataset transformation and scikit-learn/PyTorch model training in professional experience',
          sourceEvidence: '"Implemented supervised classifier pipelines and cross-validation suites."'
        },
        {
          point: 'Relational data querying and feature store preparation in PostgreSQL',
          sourceEvidence: '"Designed relational PostgreSQL schema and analytical aggregation queries."'
        }
      ],
      whatIsMissing: [
        { point: 'Automated Model CI/CD regression validation', impact: 'High' },
        { point: 'Dataset versioning using DVC or Feast feature store', impact: 'Medium' }
      ]
    }
  },
  {
    id: 'data-scientist',
    roleTitle: 'Data Scientist',
    domain: 'Data Engineering & Science',
    fitPercentage: 79,
    marketDemand: 'High',
    salaryRange: { min: '$140k', median: '$170k', max: '$200k' },
    experienceAlignment: 'Adjacent Transition',
    alignedSkills: ['Python', 'Machine Learning', 'Data Pipeline Design', 'Pandas & NumPy'],
    developingSkills: ['SQL', 'Statistical Modeling'],
    missingSkills: ['A/B Testing Frameworks', 'Business Metric Attribution'],
    whyThisMatch: 'Strong analytical Python and data transformation skills provide rapid transition into enterprise data science and predictive modeling roles.',
    estimatedTimeToReadyMonths: 4,
    transitionComplexity: 'Moderate',
    keyMilestones: [
      'Design rigorous hypothesis testing and power analysis framework',
      'Build multi-variate statistical attribution model in SQL and Python',
      'Present executive insights dashboard to stakeholders'
    ],
    explainableBreakdown: {
      technicalSkillsScore: 80,
      experienceAlignmentScore: 74,
      projectAlignmentScore: 78,
      educationAlignmentScore: 88,
      skillGapScore: 28,
      whyYouMatch: [
        {
          point: 'Strong mathematical baseline and statistical evaluation methodology',
          sourceEvidence: '"Implemented supervised classifier pipelines, cross-validation suites, and feature engineering."'
        }
      ],
      whatIsMissing: [
        { point: 'A/B Testing Frameworks & statistical significance gating', impact: 'High' },
        { point: 'Business attribution modeling and conversion telemetry', impact: 'Medium' }
      ]
    }
  },
  {
    id: 'mlops-engineer',
    roleTitle: 'MLOps Engineer',
    domain: 'Cloud & DevOps',
    fitPercentage: 74,
    marketDemand: 'Very High',
    salaryRange: { min: '$160k', median: '$190k', max: '$230k' },
    experienceAlignment: 'Growth Target',
    alignedSkills: ['AWS Cloud Services', 'CI/CD Pipelines', 'Python', 'Machine Learning'],
    developingSkills: ['Kubernetes', 'Docker'],
    missingSkills: ['MLOps Monitoring', 'Terraform / IaC', 'Feature Store Architecture'],
    whyThisMatch: 'Solid infrastructure foundations coupled with ML model familiarity make this a high-leverage 74% growth target.',
    estimatedTimeToReadyMonths: 5,
    transitionComplexity: 'Moderate',
    keyMilestones: [
      'Implement Kubernetes-based model inference cluster',
      'Configure real-time model drift telemetry alert rules',
      'Deploy Feast feature store for online low-latency lookups'
    ],
    explainableBreakdown: {
      technicalSkillsScore: 75,
      experienceAlignmentScore: 72,
      projectAlignmentScore: 74,
      educationAlignmentScore: 82,
      skillGapScore: 32,
      whyYouMatch: [
        {
          point: 'AWS Cloud Services and GitHub Actions CI/CD automation in current production stack',
          sourceEvidence: '"Architected multi-region AWS infrastructure... Built end-to-end GitHub Actions matrix workflow."'
        }
      ],
      whatIsMissing: [
        { point: 'Real-time Model Drift & Performance Telemetry monitoring', impact: 'High' },
        { point: 'Terraform Infrastructure-as-Code for reproducible GPU cluster provisioning', impact: 'High' }
      ]
    }
  }
];

export const demoRoadmapMilestones = [
  {
    id: 'rd-1',
    phase: 'Current State' as const,
    title: 'Software Engineer Baseline Verification',
    actionType: 'Verify' as const,
    targetSkillOrOutput: 'Python, PyTorch, AWS, System Architecture',
    description: 'Current technical telemetry verified at 78/100 readiness with 84% skill coverage for ML engineering tracks.',
    estimatedWeeks: 0,
    status: 'Completed' as const,
    resourceHint: 'Verified from uploaded resume dossier'
  },
  {
    id: 'rd-2',
    phase: 'Skill Development' as const,
    title: 'Learn MLOps Fundamentals & Experiment Tracking',
    actionType: 'Learn' as const,
    targetSkillOrOutput: 'MLOps, MLflow, Weights & Biases, Artifact Registries',
    description: 'Establish reproducible model training pipelines, metric logging, and automated model versioning.',
    estimatedWeeks: 3,
    status: 'In Progress' as const,
    resourceHint: 'Hands-on project with MLflow tracking server'
  },
  {
    id: 'rd-3',
    phase: 'Skill Development' as const,
    title: 'Improve Cloud Deployment & Docker GPU Isolation',
    actionType: 'Improve' as const,
    targetSkillOrOutput: 'Multi-stage Docker, AWS EKS, vLLM / ONNX Runtime',
    description: 'Containerize deep learning inference engine with multi-stage build optimization and latency profiling.',
    estimatedWeeks: 2,
    status: 'Upcoming' as const,
    resourceHint: 'Deploy container to AWS ECR & test endpoint'
  },
  {
    id: 'rd-4',
    phase: 'Projects' as const,
    title: 'Build Production ML Deployment Capstone',
    actionType: 'Build' as const,
    targetSkillOrOutput: 'Production ML API with <50ms Latency SLO',
    description: 'Deliver end-to-end computer vision or NLP API featuring INT8 quantization, automated tests, and Grafana telemetry.',
    estimatedWeeks: 4,
    status: 'Upcoming' as const,
    resourceHint: 'Open-source GitHub repository with architecture documentation'
  },
  {
    id: 'rd-5',
    phase: 'Experience' as const,
    title: 'Integrate ML Inference Subsystem in Current Workloads',
    actionType: 'Verify' as const,
    targetSkillOrOutput: 'Cross-functional ML Project Ownership',
    description: 'Lead technical RFC and production rollout of model inference subsystem at work to solidify on-resume qualification.',
    estimatedWeeks: 6,
    status: 'Upcoming' as const,
    resourceHint: 'Author Architecture Decision Record (ADR)'
  },
  {
    id: 'rd-6',
    phase: 'Target Role' as const,
    title: 'Qualify for AI / ML Engineer Positions',
    actionType: 'Target' as const,
    targetSkillOrOutput: 'AI / ML Engineer (91% Target Compatibility)',
    description: 'Achieve 95%+ verified role compatibility and apply directly to verified enterprise opportunities.',
    estimatedWeeks: 2,
    status: 'Upcoming' as const,
    resourceHint: 'Direct match with verified enterprise requisitions'
  }
];

export const demoCandidateProfile: ResumeExtractedProfile = {
  id: 'cand-001',
  candidateName: 'Marcus Vance',
  detectedDomain: 'AI & Machine Learning',
  secondaryDomains: ['Software Engineering', 'Embedded Systems'],
  documentName: 'Marcus_Vance_Systems_Resume.pdf',
  fileSizeBytes: 248100,
  parsedDate: '2026-09-03',
  yearsOfExperience: 4.8,
  readinessScore: 78,
  overallFitScore: 91,
  skillCoverageScore: 84,
  skillGapsCount: 6,
  summary: 'Software and AI systems engineer with 4.8 years of verified experience delivering production deep learning pipelines, asynchronous backend microservices, and edge perception models. Documented track record in model optimization and system design.',
  email: 'marcus.vance@example.com',
  phone: '+1 (415) 892-4102',
  location: 'San Francisco, CA (Hybrid / Remote)',
  currentTitle: 'Senior Software Engineer (ML Integration)',
  currentEmployer: 'Aetheria Systems Corp',
  targetRoles: ['AI / ML Engineer', 'Machine Learning Engineer', 'MLOps Engineer', 'Data Scientist'],
  skills: demoSkills.flatMap((cat) => cat.skills),
  skillCategories: demoSkills,
  recentMatches: demoCareerFits,
  roadmap: demoRoadmapMilestones,
  education: [
    {
      degree: 'M.S. in Computer Science (Distributed Systems & Machine Learning)',
      institution: 'University of Washington',
      year: '2021',
      evidenceSnippet: 'Master of Science in Computer Science, Focus: Distributed Systems & Machine Learning, GPA 3.92',
      isDetected: true
    },
    {
      degree: 'B.S. in Computer Engineering',
      institution: 'Purdue University',
      year: '2019',
      evidenceSnippet: 'Bachelor of Science in Computer Engineering, Minor in Mathematics, 2015-2019',
      isDetected: true
    }
  ],
  experience: [
    {
      title: 'Senior Software Engineer (ML Integration)',
      company: 'Aetheria Systems Corp',
      period: '2022 - Present (2.5 yrs)',
      domain: 'AI & Machine Learning',
      highlights: [
        'Architected real-time streaming LLM inference backend handling 30M token requests/day with 99.9% uptime',
        'Implemented INT8 quantization routines in PyTorch and ONNX Runtime reducing inference latency by 38%',
        'Mentored 3 software engineers on asynchronous Python patterns, API contracts, and CI/CD validation'
      ],
      extractedSkills: ['Python', 'PyTorch', 'AWS', 'Docker', 'System Architecture', 'ONNX', 'CI/CD'],
      evidenceSnippet: 'Aetheria Systems Corp — Senior Software Engineer (2022-Present). Led model serving platform and low-latency API architecture.'
    },
    {
      title: 'Software Engineer (Perception Systems)',
      company: 'Nexis Tech Labs',
      period: '2020 - 2022 (2 yrs)',
      domain: 'Embedded Systems',
      highlights: [
        'Developed FreeRTOS firmware and peripheral drivers on ARM Cortex-M4 for industrial telemetry units',
        'Built automated hardware-in-the-loop test runners in Python and PostgreSQL for sensor validation',
        'Integrated TensorFlow Lite Micro model onto embedded MCU with 180KB RAM budget'
      ],
      extractedSkills: ['C / C++', 'ARM Cortex-M', 'FreeRTOS', 'TFLite Micro', 'PostgreSQL', 'Hardware Debugging'],
      evidenceSnippet: 'Nexis Tech Labs — Software Engineer (2020-2022). Developed embedded C drivers and Edge AI perception routines.'
    }
  ],
  projects: [
    {
      title: 'EdgeVision Anomaly Detection Service',
      role: 'Lead Architect & Developer',
      description: 'Built high-throughput real-time video inference service using PyTorch and ONNX with sub-50ms latency.',
      technologies: ['PyTorch', 'ONNX', 'Python', 'Docker', 'FastAPI'],
      evidenceSnippet: 'EdgeVision: Open-source anomaly detection pipeline benchmarked on NVIDIA TensorRT and ARM Cortex.',
      impactOutcome: '38% latency reduction and 99.8% precision'
    },
    {
      title: 'Microcontroller Telemetry Buffer Driver',
      role: 'Firmware Developer',
      description: 'Low-power DMA circular buffer driver for STM32 Cortex-M4 units handling 10kHz sensor stream.',
      technologies: ['C', 'ARM Cortex-M', 'FreeRTOS', 'SPI'],
      evidenceSnippet: 'Implemented DMA double-buffering protocol reducing MCU wake cycles by 45%.',
      impactOutcome: '45% power consumption decrease'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
      status: 'Verified from Resume'
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      year: '2021',
      status: 'Verified from Resume'
    },
    {
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      year: 'Not Detected',
      status: 'Not Detected'
    }
  ]
};
