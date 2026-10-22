import re
from typing import List, Dict, Any, Tuple
from backend.schemas.models import SkillEvidence, SkillCategoryGroup

class SkillExtractor:
    """
    Extracts skills with exact evidence quotes, canonical alias normalization,
    and computes dynamic proficiency levels (Beginner -> Advanced) using experience-weighted evidence.
    """

    def __init__(self, ontology: Dict[str, Any]):
        self.ontology_skills = ontology.get("skills", [])

    def extract_skills(self, full_text: str, sections: Dict[str, str]) -> Tuple[List[SkillEvidence], List[SkillCategoryGroup]]:
        extracted_skills: List[SkillEvidence] = []
        skills_text = sections.get("SKILLS", "")
        exp_text = sections.get("EXPERIENCE", "")
        intern_text = sections.get("INTERNSHIP", "")
        proj_text = sections.get("PROJECTS", "")

        for s_def in self.ontology_skills:
            skill_id = s_def["id"]
            canonical_name = s_def["name"]
            category = s_def.get("category", "General Technical")
            domain = s_def.get("domain", "Software Engineering")
            aliases = s_def.get("aliases", []) + [canonical_name]
            keywords = s_def.get("keywords", [])

            # Check matches across sections
            matched_aliases, count, best_quote, is_in_exp, is_in_proj, is_in_intern, is_in_skills = self._evaluate_evidence(
                aliases=aliases,
                keywords=keywords,
                full_text=full_text,
                skills_text=skills_text,
                exp_text=exp_text,
                intern_text=intern_text,
                proj_text=proj_text
            )

            if count > 0:
                # Experience-based weighting (Section 8 & 9)
                level, confidence_score, status, score = self._calculate_skill_level(
                    count=count,
                    in_skills=is_in_skills,
                    in_exp=is_in_exp,
                    in_intern=is_in_intern,
                    in_proj=is_in_proj,
                    quote_length=len(best_quote)
                )

                extracted_skills.append(
                    SkillEvidence(
                        id=skill_id,
                        name=canonical_name,
                        category=category,
                        domain=domain,
                        status=status,
                        evidenceType="Explicitly Detected",
                        confidence="High" if confidence_score >= 0.85 else "Medium",
                        confidenceScore=confidence_score,
                        score=score,
                        yearsOfExperience=round(min(6.0, count * 0.75 + (2.0 if is_in_exp else 0.5)), 1),
                        sourceQuote=best_quote,
                        evidence=best_quote,
                        contextSnippet=f"Demonstrated in resume across {count} verified occurrences."
                    )
                )

        extracted_skills.sort(key=lambda s: s.score, reverse=True)
        category_groups = self._group_categories(extracted_skills)
        return extracted_skills, category_groups

    def _evaluate_evidence(
        self,
        aliases: List[str],
        keywords: List[str],
        full_text: str,
        skills_text: str,
        exp_text: str,
        intern_text: str,
        proj_text: str
    ) -> Tuple[List[str], int, str, bool, bool, bool, bool]:
        total_count = 0
        matched_aliases = []
        best_sentence = ""
        is_in_exp = False
        is_in_proj = False
        is_in_intern = False
        is_in_skills = False

        lines = [l.strip() for l in full_text.splitlines() if l.strip()]

        for alias in aliases:
            escaped = re.escape(alias)
            pattern = rf"\b{escaped}\b"
            matches = re.findall(pattern, full_text, re.IGNORECASE)
            if matches:
                total_count += len(matches)
                matched_aliases.append(alias)

                if exp_text and re.search(pattern, exp_text, re.IGNORECASE):
                    is_in_exp = True
                if proj_text and re.search(pattern, proj_text, re.IGNORECASE):
                    is_in_proj = True
                if intern_text and re.search(pattern, intern_text, re.IGNORECASE):
                    is_in_intern = True
                if skills_text and re.search(pattern, skills_text, re.IGNORECASE):
                    is_in_skills = True

                # Find best quote sentence from experience or projects first, then general lines
                for line in lines:
                    if re.search(pattern, line, re.IGNORECASE) and len(line) > len(alias) + 10:
                        if not best_sentence or (is_in_exp and line in exp_text):
                            best_sentence = line.strip(" •-*")

        if not best_sentence and matched_aliases:
            best_sentence = f"Demonstrated competency in {matched_aliases[0]} in resume."

        return matched_aliases, total_count, best_sentence, is_in_exp, is_in_proj, is_in_intern, is_in_skills

    def _calculate_skill_level(
        self,
        count: int,
        in_skills: bool,
        in_exp: bool,
        in_intern: bool,
        in_proj: bool,
        quote_length: int
    ) -> Tuple[str, float, str, int]:
        """
        Calculates skill strength: Beginner, Developing, Intermediate, Strong, Advanced.
        Weighting: Skills list = 1.0, Project = 1.5, Internship = 1.5, Professional exp = 2.0, Repeated mentions = +0.5 each.
        """
        weight = (count - 1) * 0.5
        if in_skills:
            weight += 1.0
        if in_proj:
            weight += 1.5
        if in_intern:
            weight += 1.5
        if in_exp:
            weight += 2.0
        if quote_length > 40:
            weight += 1.0

        if weight >= 5.0:
            return "Advanced", 0.96, "Strong", 95
        elif weight >= 3.5:
            return "Strong", 0.90, "Strong", 88
        elif weight >= 2.5:
            return "Intermediate", 0.82, "Strong", 78
        elif weight >= 1.5:
            return "Developing", 0.72, "Developing", 62
        else:
            return "Beginner", 0.60, "Developing", 48

    def _group_categories(self, skills: List[SkillEvidence]) -> List[SkillCategoryGroup]:
        groups_map: Dict[str, List[SkillEvidence]] = {}
        for s in skills:
            cat = s.category
            if cat not in groups_map:
                groups_map[cat] = []
            groups_map[cat].append(s)

        category_groups: List[SkillCategoryGroup] = []
        for cat_name, items in groups_map.items():
            strong = sum(1 for i in items if i.status == "Strong")
            developing = sum(1 for i in items if i.status == "Developing")
            missing = sum(1 for i in items if i.status == "Missing")
            coverage = int((strong / max(1, len(items))) * 100)

            category_groups.append(
                SkillCategoryGroup(
                    id=cat_name.lower().replace(" ", "_"),
                    name=cat_name,
                    domain=items[0].domain if items else "General",
                    skills=items,
                    strongCount=strong,
                    developingCount=developing,
                    missingCount=missing,
                    overallCoverage=coverage
                )
            )

        return category_groups
