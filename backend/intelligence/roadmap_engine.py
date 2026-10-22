from typing import List, Dict, Any, Optional
from backend.schemas.models import RoadmapMilestone, ProjectItem, CareerRoleMatch, SkillEvidence

class RoadmapEngine:
    """
    Generates dynamic, fully personalized, non-generic milestone roadmaps.
    ROADMAP = f(candidateSkills, candidateExperience, candidateProjects, targetRole, missingSkills)

    Adapts explicitly to candidate seniority (Junior, Mid, Senior) and
    distinguishes between 'Upgrade Existing Project' and 'Build New Project'.
    """

    def generate_roadmap(
        self,
        candidate_name: str,
        years_exp: float,
        top_match: CareerRoleMatch,
        extracted_skills: List[SkillEvidence],
        projects: List[ProjectItem]
    ) -> List[RoadmapMilestone]:
        milestones: List[RoadmapMilestone] = []
        missing_skills = top_match.missingSkills if top_match else []
        aligned_skills = top_match.alignedSkills if top_match else []
        has_projects = len(projects) > 0
        primary_proj_name = projects[0].title if has_projects else ""
        role_title = top_match.roleTitle if top_match else "Target Engineering Role"

        # -------------------------------------------------------------
        # Scenario A: Student / Early Career (0 - 2 Years)
        # -------------------------------------------------------------
        if years_exp < 2.0:
            # Phase 1: Bridge first critical missing skill
            first_missing = missing_skills[0] if missing_skills else "System Design Fundamentals"
            milestones.append(
                RoadmapMilestone(
                    id="ms_entry_1",
                    phase="Phase 1: Core Fundamentals",
                    title=f"Master {first_missing} Essentials",
                    actionType="Skill Acquisition",
                    targetSkillOrOutput=first_missing,
                    description=f"Gain hands-on proficiency in {first_missing} through practical exercises and structured implementations for {role_title}.",
                    estimatedWeeks=3,
                    status="In Progress",
                    resourceHint=f"Focus on core concepts and practical coding in {first_missing}."
                )
            )

            # Phase 2: Build or Upgrade Portfolio Project
            second_missing = missing_skills[1] if len(missing_skills) > 1 else first_missing
            if has_projects:
                proj_title = f"Upgrade '{primary_proj_name}' with {second_missing}"
                proj_desc = f"Extend your existing project '{primary_proj_name}' by integrating {second_missing} to demonstrate production readiness."
                action_type = "Upgrade Project"
            else:
                proj_title = f"Build Portfolio Project Demonstrating {second_missing}"
                proj_desc = f"Create a new portfolio project from scratch implementing {second_missing} and {aligned_skills[0] if aligned_skills else 'core features'} to provide tangible hiring evidence."
                action_type = "Build New Project"

            milestones.append(
                RoadmapMilestone(
                    id="ms_entry_2",
                    phase="Phase 2: Portfolio Development",
                    title=proj_title,
                    actionType=action_type,
                    targetSkillOrOutput=second_missing,
                    description=proj_desc,
                    estimatedWeeks=4,
                    status="Upcoming",
                    resourceHint="Publish repository with clear README, test coverage, and architecture diagrams."
                )
            )

            # Phase 3: Code Quality & Testing
            milestones.append(
                RoadmapMilestone(
                    id="ms_entry_3",
                    phase="Phase 3: Code Quality & Testing",
                    title=f"Automated Testing & Linting for {role_title}",
                    actionType="Quality & Testing",
                    targetSkillOrOutput="Unit & Integration Testing",
                    description="Implement automated unit test suites and code formatting workflows to meet professional engineering standards.",
                    estimatedWeeks=2,
                    status="Upcoming",
                    resourceHint="Target >80% code coverage across key business logic."
                )
            )

            # Phase 4: Interview & Application Readiness
            milestones.append(
                RoadmapMilestone(
                    id="ms_entry_4",
                    phase="Phase 4: Role Readiness",
                    title=f"Technical Interview & Role Portfolio for {role_title}",
                    actionType="Career Preparation",
                    targetSkillOrOutput=f"{role_title} Readiness",
                    description=f"Prepare domain-specific problem solving and project walkthroughs tailored to {role_title} requirements.",
                    estimatedWeeks=3,
                    status="Upcoming",
                    resourceHint="Conduct mock technical deep-dives on your portfolio implementations."
                )
            )

        # -------------------------------------------------------------
        # Scenario B: Mid-Level Engineer (2 - 5 Years)
        # -------------------------------------------------------------
        elif years_exp <= 5.0:
            # Phase 1: Critical Missing Competency
            first_missing = missing_skills[0] if missing_skills else "Advanced Architecture"
            milestones.append(
                RoadmapMilestone(
                    id="ms_mid_1",
                    phase="Phase 1: Critical Competency Bridge",
                    title=f"Bridge {first_missing} for {role_title}",
                    actionType="Competency Bridge",
                    targetSkillOrOutput=first_missing,
                    description=f"Deepen production expertise in {first_missing} to eliminate the primary gap identified for {role_title}.",
                    estimatedWeeks=3,
                    status="In Progress",
                    resourceHint=f"Implement end-to-end modules leveraging {first_missing}."
                )
            )

            # Phase 2: Project Extension / New Service
            second_missing = missing_skills[1] if len(missing_skills) > 1 else first_missing
            if has_projects:
                proj_title = f"Project Extension: '{primary_proj_name}' + {second_missing}"
                proj_desc = f"Refactor '{primary_proj_name}' to incorporate {second_missing}, integrating benchmark metrics and modular interfaces."
                action_type = "Upgrade Project"
            else:
                proj_title = f"Build Production Service: {second_missing} Architecture"
                proj_desc = f"Design and implement a production-grade service applying {second_missing} alongside {aligned_skills[0] if aligned_skills else 'your core skills'}."
                action_type = "Build New Project"

            milestones.append(
                RoadmapMilestone(
                    id="ms_mid_2",
                    phase="Phase 2: Project Implementation",
                    title=proj_title,
                    actionType=action_type,
                    targetSkillOrOutput=f"{second_missing} Implementation",
                    description=proj_desc,
                    estimatedWeeks=4,
                    status="Upcoming",
                    resourceHint="Include performance benchmarking before and after integration."
                )
            )

            # Phase 3: Production Optimization & Cloud Deployment
            third_missing = missing_skills[2] if len(missing_skills) > 2 else "Containerization & Cloud Infrastructure"
            milestones.append(
                RoadmapMilestone(
                    id="ms_mid_3",
                    phase="Phase 3: Production Deployment",
                    title=f"Production Deployment & CI/CD ({third_missing})",
                    actionType="Deployment & DevOps",
                    targetSkillOrOutput=third_missing,
                    description=f"Package and automate deployments with {third_missing}, setting up reproducible build and release pipelines.",
                    estimatedWeeks=3,
                    status="Upcoming",
                    resourceHint="Implement automated continuous deployment to staging/production clusters."
                )
            )

            # Phase 4: Observability, Metrics & Scaling
            milestones.append(
                RoadmapMilestone(
                    id="ms_mid_4",
                    phase="Phase 4: Reliability & Telemetry",
                    title=f"System Observability & Latency Optimization",
                    actionType="Reliability Engineering",
                    targetSkillOrOutput="Observability & Performance",
                    description=f"Set up real-time telemetry, structured logging, and latency profiling for {role_title} workflows.",
                    estimatedWeeks=3,
                    status="Upcoming",
                    resourceHint="Instrument distributed tracing and health monitoring."
                )
            )

        # -------------------------------------------------------------
        # Scenario C: Senior Engineer (5+ Years)
        # -------------------------------------------------------------
        else:
            first_missing = missing_skills[0] if missing_skills else "Distributed System Design"
            milestones.append(
                RoadmapMilestone(
                    id="ms_sr_1",
                    phase="Phase 1: Advanced Architectural Gaps",
                    title=f"Architectural Mastery in {first_missing}",
                    actionType="System Architecture",
                    targetSkillOrOutput=first_missing,
                    description=f"Address advanced architectural considerations for {first_missing} across multi-node distributed environments.",
                    estimatedWeeks=4,
                    status="In Progress",
                    resourceHint="Focus on high-availability design trade-offs and fault-tolerant topologies."
                )
            )

            second_missing = missing_skills[1] if len(missing_skills) > 1 else first_missing
            milestones.append(
                RoadmapMilestone(
                    id="ms_sr_2",
                    phase="Phase 2: Scale & Resilience",
                    title=f"High-Concurrency Scaling with {second_missing}",
                    actionType="System Scale",
                    targetSkillOrOutput=second_missing,
                    description=f"Architect zero-downtime scaling strategies and bottleneck alleviation utilizing {second_missing}.",
                    estimatedWeeks=4,
                    status="Upcoming",
                    resourceHint="Author formal RFCs and benchmarking reports for design reviews."
                )
            )

            milestones.append(
                RoadmapMilestone(
                    id="ms_sr_3",
                    phase="Phase 3: Technical Governance",
                    title=f"Technical Strategy & Architecture Governance for {role_title}",
                    actionType="Technical Leadership",
                    targetSkillOrOutput="Engineering Governance",
                    description="Lead architectural decision records (ADRs), define domain standards, and guide cross-functional technology evolution.",
                    estimatedWeeks=4,
                    status="Upcoming",
                    resourceHint="Establish technical guardrails and engineering review workflows."
                )
            )

        return milestones
