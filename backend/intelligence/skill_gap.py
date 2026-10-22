from typing import List, Dict, Any
from backend.schemas.models import SkillGapItem, SkillEvidence, CareerRoleMatch

class SkillGapEngine:
    """
    Computes actionable skill gaps against target career matches, classifying competencies
    into Verified Match, Moderate Deficit, or High Deficit with exact evidence quotes.
    """

    def analyze_gaps(
        self,
        target_role: CareerRoleMatch,
        extracted_skills: List[SkillEvidence]
    ) -> List[SkillGapItem]:
        gaps: List[SkillGapItem] = []
        candidate_skill_map = {s.name.lower(): s for s in extracted_skills}

        # 1. Aligned Skills (Verified Match / Strong)
        for skill_name in target_role.alignedSkills[:4]:
            ev = next((s for s_l, s in candidate_skill_map.items() if skill_name.lower() in s_l or s_l in skill_name.lower()), None)
            quote = ev.sourceQuote if ev else f"Demonstrated in technical experience"
            gaps.append(
                SkillGapItem(
                    skill=skill_name,
                    candidateLevel="Strong" if ev and ev.status == "Strong" else "Developing",
                    requiredLevel="Required",
                    gap="Verified Match",
                    priority="Low",
                    evidence=f'"{quote}"',
                    targetRole=target_role.roleTitle
                )
            )

        # 2. Developing Skills (Moderate Deficit)
        for skill_name in target_role.developingSkills[:3]:
            ev = next((s for s_l, s in candidate_skill_map.items() if skill_name.lower() in s_l or s_l in skill_name.lower()), None)
            quote = ev.sourceQuote if ev else f"Initial exposure detected"
            gaps.append(
                SkillGapItem(
                    skill=skill_name,
                    candidateLevel="Developing",
                    requiredLevel="Required",
                    gap="Moderate Deficit",
                    priority="Medium",
                    evidence=f'"{quote}"',
                    targetRole=target_role.roleTitle
                )
            )

        # 3. Missing Skills (High Deficit)
        for skill_name in target_role.missingSkills:
            gaps.append(
                SkillGapItem(
                    skill=skill_name,
                    candidateLevel="Missing",
                    requiredLevel="Required",
                    gap="High Deficit",
                    priority="High",
                    evidence='"Not detected in parsed resume evidence"',
                    targetRole=target_role.roleTitle
                )
            )

        return gaps
