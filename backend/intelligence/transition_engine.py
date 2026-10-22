from typing import List, Dict, Any
from backend.schemas.models import CareerTransition, CareerRoleMatch, SkillEvidence

class CareerTransitionEngine:
    """
    Identifies adjacent career pathways and computes transition difficulty,
    transferable competencies, and bridge milestones.
    """

    def compute_transitions(
        self,
        top_matches: List[CareerRoleMatch],
        extracted_skills: List[SkillEvidence]
    ) -> List[CareerTransition]:
        transitions: List[CareerTransition] = []
        if len(top_matches) < 2:
            return transitions

        # Primary baseline is match #0
        primary_match = top_matches[0]

        # Evaluate adjacent transitions for match #1, #2, #3
        for alt_role in top_matches[1:5]:
            common_skills = list(set(primary_match.alignedSkills) & set(alt_role.alignedSkills))
            missing = alt_role.missingSkills

            score = int(alt_role.fitPercentage * 0.9)
            if len(missing) <= 1:
                action = f"Direct adjacency from {primary_match.roleTitle}. Bridge {missing[0] if missing else 'advanced concepts'} to qualify."
            else:
                action = f"Requires targeted upskilling in {', '.join(missing[:2])} to complete transition."

            transitions.append(
                CareerTransition(
                    targetRole=alt_role.roleTitle,
                    targetDomain=alt_role.domain,
                    transitionScore=score,
                    transferableSkills=common_skills if common_skills else ["Core Engineering Principles"],
                    missingSkills=missing,
                    recommendedSkills=missing[:3],
                    recommendedAction=action
                )
            )

        return transitions
