from typing import List
from backend.schemas.models import CareerPathway, CareerProgressionStep, CareerRoleMatch, CareerTransition
from backend.career.role_database import CAREER_ROLES_DB

class CareerPathGraph:
    def generate_pathway(self, matches: List[CareerRoleMatch], primary_domain: str, years_exp: float) -> CareerPathway:
        top_match = matches[0] if matches else None
        target_role = top_match.roleTitle if top_match else "Senior Engineer"
        
        # Determine levels
        l3_title = f"{primary_domain.split()[0]} Engineer"
        l4_title = target_role if "Senior" in target_role else f"Senior {target_role}"
        l5_title = f"Lead {target_role.replace('Senior ', '')}"
        l6_title = f"Staff / Principal {primary_domain.split()[0]} Architect"

        steps = [
            CareerProgressionStep(
                id="step-1",
                level="L3 Mid",
                title=l3_title,
                yearsOfExperienceRange="1 - 3 Yrs",
                focusArea="Core Feature Delivery & Independent Execution",
                keyResponsibilities=["Build robust components", "Write automated tests", "Maintain telemetry"],
                coreCompetencies=["Independent execution", "Code reviews", "Debugging"],
                typicalCompensation="$110k - $140k",
                status="Completed" if years_exp >= 3.0 else "Current",
                readinessScore=96
            ),
            CareerProgressionStep(
                id="step-2",
                level="L4 Senior",
                title=l4_title,
                yearsOfExperienceRange="3 - 6 Yrs",
                focusArea="Subsystem Ownership & Architecture Decisions",
                keyResponsibilities=["Architect modular subsystems", "Optimize latency & throughput", "Design RFCs"],
                coreCompetencies=["System architecture", "Performance tuning", "Mentorship"],
                typicalCompensation="$150k - $195k",
                status="Current" if (years_exp >= 3.0 and years_exp < 6.0) else "Target",
                readinessScore=top_match.fitPercentage if top_match else 88
            ),
            CareerProgressionStep(
                id="step-3",
                level="L5 Lead",
                title=l5_title,
                yearsOfExperienceRange="5 - 8 Yrs",
                focusArea="Team-wide Technical Strategy & Cross-functional Delivery",
                keyResponsibilities=["Lead multi-engineer projects", "Drive technical roadmap", "Unblock cross-team dependencies"],
                coreCompetencies=["Cross-squad leadership", "Technical vision", "Sprint governance"],
                typicalCompensation="$190k - $240k",
                status="Next Level",
                readinessScore=72
            ),
            CareerProgressionStep(
                id="step-4",
                level="L6 Staff / Architect",
                title=l6_title,
                yearsOfExperienceRange="8+ Yrs",
                focusArea="Org-wide Platform Infrastructure & High-Impact Innovation",
                keyResponsibilities=["Define 3-year technical strategy", "Establish architectural standards", "De-risk critical systems"],
                coreCompetencies=["Multi-system design", "Executive alignment", "Distributed reliability"],
                typicalCompensation="$240k - $320k+",
                status="Horizon",
                readinessScore=54
            )
        ]

        return CareerPathway(
            id=f"path-{primary_domain.lower().replace(' ', '-')}",
            domain=primary_domain,
            title=f"{primary_domain} Progression Path",
            description=f"Structured advancement track tailored to verified {primary_domain} competencies.",
            currentRole=l3_title if years_exp < 4.0 else l4_title,
            targetRole=target_role,
            steps=steps,
            bridgeSkills=top_match.missingSkills if top_match else ["Advanced System Architecture"],
            timeframe="12 - 18 Months"
        )

    def generate_transitions(self, matches: List[CareerRoleMatch], primary_domain: str) -> List[CareerTransition]:
        transitions = []
        # Find adjacent matches outside or on the boundary of the primary domain
        for m in matches[1:4]:
            transitions.append(
                CareerTransition(
                    targetRole=m.roleTitle,
                    targetDomain=m.domain,
                    transitionScore=m.fitPercentage,
                    transferableSkills=m.alignedSkills,
                    missingSkills=m.missingSkills,
                    recommendedAction=f"Bridge {len(m.missingSkills)} competencies: {', '.join(m.missingSkills[:2])}"
                )
            )
        return transitions
