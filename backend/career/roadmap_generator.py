from typing import List
from backend.schemas.models import RoadmapMilestone, CareerRoleMatch

class RoadmapGenerator:
    def generate_roadmap(self, top_match: CareerRoleMatch, years_exp: float) -> List[RoadmapMilestone]:
        missing = top_match.missingSkills
        aligned = top_match.alignedSkills
        developing = top_match.developingSkills
        milestones: List[RoadmapMilestone] = []

        # Phase 1: Baseline Verification
        milestones.append(
            RoadmapMilestone(
                id="ms-1",
                phase="Phase 1: Current State",
                title=f"Verified Competency Baseline ({', '.join(aligned[:2]) if aligned else 'Core Competencies'})",
                actionType="Verify",
                targetSkillOrOutput=f"Active in {aligned[0] if aligned else top_match.domain}",
                description=f"Audited {len(aligned)} verified technical competencies from resume citations with strong baseline performance.",
                estimatedWeeks=0,
                status="Completed",
                resourceHint="Resume Evidence Audit & Codebase Artifacts"
            )
        )

        if missing:
            # Phase 2: First Priority Gap
            first_gap = missing[0]
            milestones.append(
                RoadmapMilestone(
                    id="ms-2",
                    phase="Phase 2: Core Skill Gap",
                    title=f"Master & Implement {first_gap}",
                    actionType="Learn",
                    targetSkillOrOutput=f"{first_gap} Proficiency",
                    description=f"Complete hands-on implementation and system configurations using {first_gap} to bridge primary eligibility deficit.",
                    estimatedWeeks=3,
                    status="In Progress",
                    resourceHint=f"Hands-on {first_gap} Lab & System Exercises"
                )
            )

            # Phase 3: Second Gap or Developing Skill
            if len(missing) > 1:
                second_gap = missing[1]
                milestones.append(
                    RoadmapMilestone(
                        id="ms-3",
                        phase="Phase 3: Secondary Gap & Tooling",
                        title=f"Integrate {second_gap} Into Architecture",
                        actionType="Improve",
                        targetSkillOrOutput=f"{second_gap} Workflows",
                        description=f"Incorporate {second_gap} with automated test pipelines and standard development workflows.",
                        estimatedWeeks=3,
                        status="Planned",
                        resourceHint=f"Production {second_gap} Pipeline Guides"
                    )
                )
            elif developing:
                dev_skill = developing[0]
                milestones.append(
                    RoadmapMilestone(
                        id="ms-3",
                        phase="Phase 3: Deepen Proficiency",
                        title=f"Elevate {dev_skill} to Production Standard",
                        actionType="Improve",
                        targetSkillOrOutput=f"Advanced {dev_skill}",
                        description=f"Upgrade {dev_skill} execution from foundational to enterprise production readiness with performance optimizations.",
                        estimatedWeeks=2,
                        status="Planned",
                        resourceHint=f"Advanced {dev_skill} Architecture Patterns"
                    )
                )

            # Phase 4: Capstone Integration
            gaps_summary = f"{first_gap}" + (f" and {missing[1]}" if len(missing) > 1 else "")
            milestones.append(
                RoadmapMilestone(
                    id="ms-4",
                    phase="Phase 4: Capstone Deliverable",
                    title=f"Build End-to-End {top_match.roleTitle} Capstone Project",
                    actionType="Build",
                    targetSkillOrOutput="Production-Ready Artifact",
                    description=f"Architect and publish an open-source reference project integrating {gaps_summary} alongside {aligned[0] if aligned else 'core stack'}.",
                    estimatedWeeks=4,
                    status="Planned",
                    resourceHint="GitHub Repository & Architectural RFC"
                )
            )
        else:
            # Candidate has all required skills -> Growth & Specialization track
            milestones.append(
                RoadmapMilestone(
                    id="ms-2",
                    phase="Phase 2: Advanced Architecture",
                    title=f"System Scale & Resiliency for {top_match.roleTitle}",
                    actionType="Improve",
                    targetSkillOrOutput="High-Throughput / High-Reliability Design",
                    description=f"Lead fault-tolerant system designs and SLA optimization initiatives across {top_match.domain}.",
                    estimatedWeeks=3,
                    status="In Progress",
                    resourceHint="Enterprise Architecture RFCs"
                )
            )

            milestones.append(
                RoadmapMilestone(
                    id="ms-3",
                    phase="Phase 3: Cross-Functional Leadership",
                    title="Technical Governance & Mentorship",
                    actionType="Improve",
                    targetSkillOrOutput="Team-Wide Technical Standards",
                    description="Conduct architecture reviews, establish engineering best practices, and mentor junior engineers.",
                    estimatedWeeks=3,
                    status="Planned",
                    resourceHint="Engineering Strategy Playbook"
                )
            )

            milestones.append(
                RoadmapMilestone(
                    id="ms-4",
                    phase="Phase 4: High-Impact Innovation",
                    title=f"Architect Core {top_match.roleTitle} Subsystem",
                    actionType="Build",
                    targetSkillOrOutput="Platform Infrastructure",
                    description=f"Deliver a marquee subsystem delivering 10x scalability and latency improvements.",
                    estimatedWeeks=4,
                    status="Planned",
                    resourceHint="Enterprise Whitepaper & Benchmarking"
                )
            )

        # Final Phase: Role Transition
        milestones.append(
            RoadmapMilestone(
                id=f"ms-{len(milestones) + 1}",
                phase=f"Phase {len(milestones) + 1}: Target Role",
                title=f"Transition to {top_match.roleTitle}",
                actionType="Target",
                targetSkillOrOutput=f"{top_match.roleTitle} Requisition Alignment",
                description=f"Conduct technical deep-dive portfolio reviews and transition into active {top_match.roleTitle} roles.",
                estimatedWeeks=2,
                status="Planned",
                resourceHint="Enterprise System Review Loop"
            )
        )

        return milestones
