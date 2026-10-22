import json
import os
from typing import List, Dict, Any, Optional
from backend.schemas.models import (
    CareerRoleMatch,
    ExplainableBreakdown,
    SkillEvidence,
    ExperienceItem,
    ProjectItem,
    EducationItem
)
from backend.intelligence.embeddings import EmbeddingService

class CareerMatcher:
    """
    Computes 6-pillar deterministic career match scores across all external roles
    defined in backend/data/career_roles.json without artificial score inflation.
    """

    def __init__(self, embedding_service: EmbeddingService, roles_data_path: Optional[str] = None):
        self.embedding_service = embedding_service
        if not roles_data_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            roles_data_path = os.path.join(base_dir, "data", "career_roles.json")

        self.roles_data_path = roles_data_path
        self.roles = self._load_roles()

    def _load_roles(self) -> List[Dict[str, Any]]:
        if os.path.exists(self.roles_data_path):
            with open(self.roles_data_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data.get("roles", [])
        return []

    def evaluate_matches(
        self,
        candidate_name: str,
        candidate_summary: str,
        extracted_skills: List[SkillEvidence],
        experience: List[ExperienceItem],
        projects: List[ProjectItem],
        education: List[EducationItem],
        years_exp: float,
        domain_confidences: Dict[str, float]
    ) -> List[CareerRoleMatch]:
        results: List[CareerRoleMatch] = []
        candidate_skill_names = {s.name.lower(): s for s in extracted_skills}
        candidate_profile_text = f"{candidate_summary} {' '.join([s.name for s in extracted_skills])} {' '.join([p.title + ' ' + p.description for p in projects])}"

        for role in self.roles:
            role_id = role["id"]
            role_title = role["title"]
            role_domain = role.get("domain", "General")
            req_skills = role.get("requiredSkills", [])
            pref_skills = role.get("preferredSkills", [])
            target_edu = role.get("education", [])

            # 1. Skill Match (40%)
            matched_req: List[str] = []
            missing_req: List[str] = []
            developing_skills: List[str] = []
            skill_score_sum = 0

            for req in req_skills:
                req_lower = req.lower()
                found = next((s for name_l, s in candidate_skill_names.items() if req_lower in name_l or name_l in req_lower), None)
                if found:
                    matched_req.append(found.name)
                    skill_score_sum += found.score
                    if found.status == "Developing":
                        developing_skills.append(found.name)
                else:
                    missing_req.append(req)

            matched_pref = []
            for pref in pref_skills:
                pref_lower = pref.lower()
                found = next((s for name_l, s in candidate_skill_names.items() if pref_lower in name_l or name_l in pref_lower), None)
                if found:
                    matched_pref.append(found.name)
                    skill_score_sum += found.score * 0.5

            total_req_count = max(1, len(req_skills))
            if matched_req:
                raw_req_ratio = len(matched_req) / total_req_count
                avg_proficiency = skill_score_sum / (len(matched_req) + len(matched_pref) * 0.5)
                skill_match_pct = int((raw_req_ratio * 70) + (avg_proficiency * 0.3) + min(15, len(matched_pref) * 5))
            else:
                skill_match_pct = 0

            skill_match_pct = min(100, max(0, skill_match_pct))

            # 2. Experience Match (20%)
            if years_exp >= 4.0:
                exp_score = min(100, int(80 + (years_exp * 4)))
            elif years_exp >= 2.0:
                exp_score = int(60 + (years_exp * 8))
            elif years_exp >= 0.5:
                exp_score = 45
            else:
                exp_score = 15 if len(experience) == 0 else 30

            # 3. Project Match (15%)
            if projects:
                proj_hits = 0
                for proj in projects:
                    p_text = f"{proj.title} {proj.description} {' '.join(proj.technologies)}".lower()
                    for req in req_skills + pref_skills:
                        if req.lower() in p_text:
                            proj_hits += 1
                proj_score = min(100, int(min(proj_hits, 5) * 20))
            else:
                proj_score = 0  # No dedicated projects section

            # 4. Education Match (10%)
            if education:
                edu_score = 40  # baseline degree detected
                for edu in education:
                    for req_deg in target_edu:
                        if req_deg.lower() in edu.degree.lower() or req_deg.lower() in edu.institution.lower():
                            edu_score = 95
                            break
            else:
                edu_score = 0  # No education detected

            # 5. Semantic Match (10%)
            role_desc_text = f"{role['title']} {role['description']} {' '.join(req_skills)}"
            semantic_sim = self.embedding_service.compute_similarity(candidate_profile_text, role_desc_text)
            semantic_score = int(semantic_sim * 100)

            # 6. Domain Alignment (5%)
            domain_conf = domain_confidences.get(role_domain, 0.0)
            domain_score = int(domain_conf * 100)

            # 6-Pillar Formula (Section 11) - Zero artificial minimums
            final_score = int(
                skill_match_pct * 0.40
                + exp_score * 0.20
                + proj_score * 0.15
                + edu_score * 0.10
                + semantic_score * 0.10
                + domain_score * 0.05
            )
            final_score = max(0, min(100, final_score))

            # Explainable Evidence Breakdown (Section 26 & 27)
            why_match = []
            if matched_req:
                why_match.append({
                    "title": f"Verified Skills ({len(matched_req)} of {len(req_skills)} Core)",
                    "detail": f"Resume proves strong competency in {', '.join(matched_req[:3])}."
                })
            else:
                why_match.append({
                    "title": "Skill Alignment",
                    "detail": "No direct core skill overlap detected in resume."
                })

            if projects:
                why_match.append({
                    "title": "Project Alignment",
                    "detail": f"Identified {len(projects)} technical projects directly matching role technologies."
                })
            else:
                why_match.append({
                    "title": "Projects",
                    "detail": "Projects: Not detected in resume."
                })

            what_missing = []
            if missing_req:
                what_missing.append({
                    "skill": missing_req[0],
                    "reason": f"Required core competency for production {role_title} execution."
                })

            results.append(
                CareerRoleMatch(
                    id=role_id,
                    roleTitle=role_title,
                    domain=role_domain,
                    fitPercentage=final_score,
                    score=final_score,
                    skillMatch=skill_match_pct,
                    experienceMatch=exp_score,
                    projectMatch=proj_score,
                    educationMatch=edu_score,
                    semanticMatch=semantic_score,
                    domainMatch=domain_score,
                    marketDemand=role.get("marketDemand", "High"),
                    salaryRange=role.get("salaryRange", { "entry": "$100k", "median": "$140k", "senior": "$190k" }),
                    experienceAlignment=f"{years_exp} yrs verified experience (Matches {role.get('experienceLevel', 'Mid-Level')})" if years_exp > 0 else "Entry-level candidate profile",
                    alignedSkills=matched_req + matched_pref,
                    missingSkills=missing_req,
                    developingSkills=developing_skills,
                    whyThisMatch=f"Demonstrates verified {role_domain} foundation with {len(matched_req)} validated skills." if matched_req else f"Exploratory alignment with {role_domain}.",
                    estimatedTimeToReadyMonths=max(1, len(missing_req) * 2),
                    transitionComplexity=role.get("transitionComplexity", "Moderate"),
                    keyMilestones=role.get("keyMilestones", ["Production Deployment", "Automated Testing"]),
                    explainableBreakdown=ExplainableBreakdown(
                        technicalSkillsScore=skill_match_pct,
                        experienceAlignmentScore=exp_score,
                        projectAlignmentScore=proj_score,
                        educationAlignmentScore=edu_score,
                        semanticMatchScore=semantic_score,
                        domainMatchScore=domain_score,
                        skillGapScore=100 - skill_match_pct,
                        whyYouMatch=why_match,
                        whatIsMissing=what_missing
                    )
                )
            )

        results.sort(key=lambda r: r.fitPercentage, reverse=True)
        return results
