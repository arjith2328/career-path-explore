from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SkillEvidence(BaseModel):
    id: str
    name: str
    category: str
    domain: str
    status: str  # "Strong" | "Developing" | "Missing"
    evidenceType: str  # "Explicitly Detected" | "Inferred" | "Missing / Not Detected"
    confidence: str  # "High" | "Medium" | "Low" | "N/A"
    confidenceScore: Optional[float] = 0.92
    score: int
    yearsOfExperience: Optional[float] = 0
    sourceQuote: Optional[str] = None
    evidence: Optional[str] = None
    contextSnippet: Optional[str] = None

class SkillCategoryGroup(BaseModel):
    id: str
    name: str
    domain: str
    skills: List[SkillEvidence]
    strongCount: int
    developingCount: int
    missingCount: int
    overallCoverage: int

class EducationItem(BaseModel):
    degree: str
    institution: str
    year: str
    evidenceSnippet: str
    isDetected: bool = True

class ExperienceItem(BaseModel):
    title: str
    company: str
    period: str
    domain: str
    highlights: List[str]
    extractedSkills: List[str]
    evidenceSnippet: str

class ProjectItem(BaseModel):
    title: str
    role: str
    description: str
    technologies: List[str]
    evidenceSnippet: str
    impactOutcome: Optional[str] = None

class CertificationItem(BaseModel):
    name: str
    issuer: str
    year: str
    status: str  # "Verified from Resume" | "Not Detected"

class ExplainableBreakdown(BaseModel):
    technicalSkillsScore: int
    experienceAlignmentScore: int
    projectAlignmentScore: int
    educationAlignmentScore: int
    semanticMatchScore: int
    domainMatchScore: int
    skillGapScore: int
    whyYouMatch: List[Dict[str, Any]]
    whatIsMissing: List[Dict[str, Any]]

class CareerRoleMatch(BaseModel):
    id: str
    roleTitle: str
    domain: str
    fitPercentage: int
    score: Optional[int] = None
    skillMatch: Optional[int] = None
    experienceMatch: Optional[int] = None
    projectMatch: Optional[int] = None
    educationMatch: Optional[int] = None
    semanticMatch: Optional[int] = None
    domainMatch: Optional[int] = None
    marketDemand: str
    salaryRange: Dict[str, str]
    experienceAlignment: str
    alignedSkills: List[str]
    missingSkills: List[str]
    developingSkills: List[str]
    whyThisMatch: str
    estimatedTimeToReadyMonths: int
    transitionComplexity: str
    keyMilestones: List[str]
    explainableBreakdown: ExplainableBreakdown

class SkillGapItem(BaseModel):
    skill: str
    candidateLevel: str  # "Strong" | "Developing" | "Missing"
    requiredLevel: str  # "Required" | "Preferred"
    gap: str  # "High Deficit" | "Moderate Deficit" | "Verified Match"
    priority: str  # "High" | "Medium" | "Low"
    evidence: str
    targetRole: str

class CareerProgressionStep(BaseModel):
    id: str
    level: str
    title: str
    yearsOfExperienceRange: str
    focusArea: str
    keyResponsibilities: List[str]
    coreCompetencies: List[str]
    typicalCompensation: str
    status: str
    readinessScore: Optional[int] = None

class CareerPathway(BaseModel):
    id: str
    domain: str
    title: str
    description: str
    currentRole: str
    targetRole: str
    steps: List[CareerProgressionStep]
    bridgeSkills: List[str]
    timeframe: str

class RoadmapMilestone(BaseModel):
    id: str
    phase: str
    title: str
    actionType: str
    targetSkillOrOutput: str
    description: str
    estimatedWeeks: int
    status: str
    resourceHint: Optional[str] = None

class CareerTransition(BaseModel):
    targetRole: str
    targetDomain: str
    transitionScore: int
    transferableSkills: List[str]
    missingSkills: List[str]
    recommendedSkills: Optional[List[str]] = []
    recommendedAction: str

class CandidateProfile(BaseModel):
    id: str
    candidateName: str
    detectedDomain: str
    secondaryDomains: List[str]
    domainConfidences: Dict[str, float]
    documentName: str
    fileSizeBytes: int
    parsedDate: str
    yearsOfExperience: float
    readinessScore: int
    overallFitScore: int
    skillCoverageScore: int
    skillGapsCount: int
    summary: str
    email: Optional[str] = "Not detected in resume"
    phone: Optional[str] = "Not detected in resume"
    location: Optional[str] = "Not detected in resume"
    currentTitle: str
    currentEmployer: str
    targetRoles: List[str]
    skills: List[SkillEvidence]
    skillCategories: List[SkillCategoryGroup]
    recentMatches: List[CareerRoleMatch]
    roadmap: List[RoadmapMilestone]
    education: List[EducationItem]
    experience: List[ExperienceItem]
    projects: List[ProjectItem]
    certifications: List[CertificationItem]
    achievements: List[str] = []
    publications: List[str] = []

class CareerDNA(BaseModel):
    primaryDomain: str
    coreStrength: str
    strongSkills: List[str]
    evidenceProjectsCount: int
    yearsOfExperience: float
    careerDirection: str
    confidencePercentage: int

class AnalyzeResumeResponse(BaseModel):
    success: bool
    message: str
    candidateProfile: CandidateProfile
    careerDNA: Optional[CareerDNA] = None
    domains: Dict[str, float]
    skills: List[SkillEvidence]
    experience: List[ExperienceItem]
    education: List[EducationItem]
    projects: List[ProjectItem] = []
    certifications: List[CertificationItem] = []
    careerMatches: List[CareerRoleMatch]
    skillGaps: List[SkillGapItem]
    careerPath: CareerPathway
    careerTransitions: Optional[List[CareerTransition]] = []
    transitions: Optional[List[CareerTransition]] = []
    roadmap: List[RoadmapMilestone]
    evidence: Optional[List[Dict[str, Any]]] = []
    explanations: List[str]
