import json
import os
from typing import Dict, Any, Optional
from backend.schemas.models import CareerPathway, CareerProgressionStep, CareerRoleMatch

class CareerPathEngine:
    """
    Constructs dynamic progression ladders from career_graph.json matching the candidate's domain and seniority.
    """

    def __init__(self, data_path: Optional[str] = None):
        if not data_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            data_path = os.path.join(base_dir, "data", "career_graph.json")

        self.data_path = data_path
        self.pathways = self._load_data()

    def _load_data(self) -> Dict[str, Any]:
        if os.path.exists(self.data_path):
            with open(self.data_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("pathways", {})
        return {}

    def get_pathway(
        self,
        primary_domain: str,
        top_match: CareerRoleMatch,
        years_exp: float
    ) -> CareerPathway:
        pathway_data = self.pathways.get(primary_domain)
        if not pathway_data:
            # Fallback to general software or first available
            pathway_data = self.pathways.get("Software Engineering") or list(self.pathways.values())[0]

        raw_levels = pathway_data.get("levels", [])
        steps: List[CareerProgressionStep] = []

        # Determine current level index based on years_exp
        curr_idx = 0
        if years_exp >= 8.0:
            curr_idx = 3
        elif years_exp >= 4.0:
            curr_idx = 2
        elif years_exp >= 1.5:
            curr_idx = 1
        else:
            curr_idx = 0

        for idx, lvl in enumerate(raw_levels):
            if idx < curr_idx:
                status = "Completed"
                readiness = 100
            elif idx == curr_idx:
                status = "Current / Target"
                readiness = top_match.fitPercentage
            elif idx == curr_idx + 1:
                status = "Next Milestone"
                readiness = max(35, top_match.fitPercentage - 20)
            else:
                status = "Long-Term Milestone"
                readiness = max(20, top_match.fitPercentage - 40)

            steps.append(
                CareerProgressionStep(
                    id=f"step_{idx+1}",
                    level=lvl["level"],
                    title=lvl["title"],
                    yearsOfExperienceRange=lvl["yearsOfExperienceRange"],
                    focusArea=lvl["focusArea"],
                    keyResponsibilities=lvl["keyResponsibilities"],
                    coreCompetencies=lvl["coreCompetencies"],
                    typicalCompensation=lvl["typicalCompensation"],
                    status=status,
                    readinessScore=readiness
                )
            )

        return CareerPathway(
            id=pathway_data.get("id", "path_1"),
            domain=primary_domain,
            title=pathway_data.get("title", f"{primary_domain} Engineering Progression"),
            description=pathway_data.get("description", "Structured progression graph based on verified resume competencies."),
            currentRole=top_match.roleTitle,
            targetRole=steps[min(curr_idx + 1, len(steps)-1)].title,
            steps=steps,
            bridgeSkills=top_match.missingSkills[:3] if top_match.missingSkills else ["Advanced Architecture", "System Resiliency"],
            timeframe=f"{max(6, len(top_match.missingSkills) * 4)} - 18 Months"
        )
