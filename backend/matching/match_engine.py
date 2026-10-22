from typing import List, Dict, Any, Tuple, Optional
from backend.schemas.models import (
    SkillEvidence, 
    ExperienceItem, 
    ProjectItem, 
    EducationItem, 
    CareerRoleMatch, 
    ExplainableBreakdown
)
from backend.career.role_database import CAREER_ROLES_DB
from backend.intelligence.embeddings import EmbeddingService

class CareerMatchEngine:
    def __init__(self, embedding_service: EmbeddingService, custom_weights: Optional[Dict[str, float]] = None):
        self.embedding_service = embedding_service
        self.weights = custom_weights or {
            "skill": 0.40,
            "experience": 0.20,
            "project": 0.15,
            "education": 0.10,
            "semantic": 0.10,
            "domain": 0.05
        }

    def evaluate_matches(
        self,
        resume_text: str,
        skills: List[SkillEvidence],
        experience: List[ExperienceItem],
        projects: List[ProjectItem],
        education: List[EducationItem],
        primary_domain: str,
        total_exp_years: float
    ) -> List[CareerRoleMatch]:
        candidate_skill_map = {s.name.lower(): s for s in skills}
        matches: List[CareerRoleMatch] = []

        for role in CAREER_ROLES_DB:
            # 1. Skill Match (40%)
            req_skills = role["requiredSkills"]
            matched_skills: List[str] = []
            missing_skills: List[str] = []
            developing_skills: List[str] = []

            for r_skill in req_skills:
                found_ev = candidate_skill_map.get(r_skill.lower())
                if not found_ev:
                    # Partial / substring check
                    for c_name, c_ev in candidate_skill_map.items():
                        if r_skill.lower() in c_name or c_name in r_skill.lower():
                            found_ev = c_ev
                            break

                if found_ev:
                    if found_ev.status == "Strong":
                        matched_skills.append(r_skill)
                    else:
                        developing_skills.append(r_skill)
                else:
                    missing_skills.append(r_skill)

            total_req = len(req_skills) if req_skills else 1
            skill_score = int(((len(matched_skills) * 1.0 + len(developing_skills) * 0.6) / total_req) * 100)
            skill_score = max(0, min(100, skill_score))

            # 2. Experience Match (20%)
            exp_range = role.get("experienceRange", "2-5 Years")
            if total_exp_years >= 6.0:
                exp_score = 95
            elif total_exp_years >= 3.0:
                exp_score = 88 if "3" in exp_range or "2" in exp_range else 80
            elif total_exp_years >= 1.0:
                exp_score = 82 if "1" in exp_range or "2" in exp_range else 68
            elif total_exp_years > 0:
                exp_score = 50 if "1" in exp_range else 35
            else:
                exp_score = 15 if len(experience) == 0 else 30

            # 3. Project Match (15%)
            if projects:
                proj_hits = 0
                for p in projects:
                    p_text = (p.title + " " + p.description + " " + " ".join(p.technologies)).lower()
                    for signal in role.get("projectSignals", []):
                        if signal.lower() in p_text:
                            proj_hits += 1
                            break
                project_score = min(100, max(0, proj_hits * 25))
            else:
                project_score = 0

            # 4. Education Match (10%)
            if education:
                edu_hits = 0
                for e in education:
                    e_text = (e.degree + " " + e.institution).lower()
                    for sig in role.get("educationSignals", []):
                        if sig.lower() in e_text:
                            edu_hits += 1
                            break
                edu_score = min(96, 50 + edu_hits * 25)
            else:
                edu_score = 0

            # 5. Semantic Match (10%)
            semantic_sim = self.embedding_service.calculate_similarity(resume_text[:1200], role["description"])
            semantic_score = int(semantic_sim * 100)
            semantic_score = max(0, min(100, semantic_score))

            # 6. Domain Match (5%)
            domain_score = 95 if primary_domain == role.get("domain") else 20

            # Composite Final Score (Deterministic Weighted Sum)
            final_score = int(
                skill_score * self.weights["skill"] +
                exp_score * self.weights["experience"] +
                project_score * self.weights["project"] +
                edu_score * self.weights["education"] +
                semantic_score * self.weights["semantic"] +
                domain_score * self.weights["domain"]
            )
            final_score = max(0, min(100, final_score))

            # Explainability: Why you match
            why_points = []
            for ms in (matched_skills + developing_skills)[:3]:
                ev_obj = candidate_skill_map.get(ms.lower())
                quote = ev_obj.sourceQuote if ev_obj else f"Detected in resume: {ms}"
                why_points.append({
                    "point": f"Verified competency in {ms}",
                    "sourceEvidence": f'"{quote}"' if quote else None
                })

            if proj_hits > 0:
                why_points.append({
                    "point": f"Engineering projects show {role['title']} signal alignment.",
                    "sourceEvidence": None
                })
            
            if edu_hits > 0 and education:
                why_points.append({
                    "point": f"Education aligns with {role['title']} foundational signals.",
                    "sourceEvidence": f'"{education[0].evidenceSnippet}"'
                })

            # Explainability: What is missing
            missing_points = []
            for mis in missing_skills:
                missing_points.append({
                    "point": mis,
                    "impact": "High" if mis in role["requiredSkills"][:2] else "Medium"
                })

            time_to_ready = max(1, len(missing_skills) * 2)

            explainable_breakdown = ExplainableBreakdown(
                technicalSkillsScore=skill_score,
                experienceAlignmentScore=exp_score,
                projectAlignmentScore=project_score,
                educationAlignmentScore=edu_score,
                semanticMatchScore=semantic_score,
                domainMatchScore=domain_score,
                skillGapScore=100 - skill_score,
                whyYouMatch=why_points,
                whatIsMissing=missing_points
            )

            match_obj = CareerRoleMatch(
                id=role["id"],
                roleTitle=role["title"],
                domain=role["domain"],
                fitPercentage=final_score,
                score=final_score,
                skillMatch=skill_score,
                experienceMatch=exp_score,
                projectMatch=project_score,
                educationMatch=edu_score,
                semanticMatch=semantic_score,
                domainMatch=domain_score,
                marketDemand=role["marketDemand"],
                salaryRange=role["salaryRange"],
                experienceAlignment=f"{total_exp_years} yrs verified / {role['experienceRange']} target",
                alignedSkills=matched_skills,
                missingSkills=missing_skills,
                developingSkills=developing_skills,
                whyThisMatch=f"Strong competency coverage across {len(matched_skills)}/{len(req_skills)} required technical signals with direct resume citations.",
                estimatedTimeToReadyMonths=time_to_ready,
                transitionComplexity="Direct / Low" if final_score >= 82 else "Moderate (~2-3 months)",
                keyMilestones=[f"Bridge {m}" for m in missing_skills[:3]],
                explainableBreakdown=explainable_breakdown
            )
            matches.append(match_obj)

        # Sort by fit percentage descending
        matches.sort(key=lambda x: x.fitPercentage, reverse=True)
        return matches
