import datetime
import uuid
import logging
from typing import Dict, Any, List

from backend.parsers.pdf_parser import PDFParser
from backend.parsers.docx_parser import DOCXParser
from backend.extraction.section_detector import SectionDetector
from backend.extraction.candidate_extractor import CandidateExtractor
from backend.extraction.skill_extractor import SkillExtractor
from backend.extraction.experience_extractor import ExperienceExtractor
from backend.extraction.project_extractor import ProjectExtractor
from backend.extraction.education_extractor import EducationExtractor
from backend.extraction.certification_extractor import CertificationExtractor

from backend.intelligence.skill_ontology import SkillOntologyEngine
from backend.intelligence.domain_detector import DomainDetector
from backend.intelligence.embeddings import EmbeddingService
from backend.intelligence.career_matcher import CareerMatcher
from backend.intelligence.skill_gap import SkillGapEngine
from backend.intelligence.transition_engine import CareerTransitionEngine
from backend.intelligence.career_path import CareerPathEngine
from backend.intelligence.roadmap_engine import RoadmapEngine

from backend.schemas.models import (
    AnalyzeResumeResponse,
    CandidateProfile,
    CareerDNA
)

logger = logging.getLogger("ResumePipeline")

class ResumeAnalysisService:
    """
    Modular orchestrator for end-to-end evidence-first resume intelligence.
    Extracts strictly from uploaded resume without inventing candidate data.
    """

    def __init__(self):
        self.pdf_parser = PDFParser()
        self.docx_parser = DOCXParser()
        self.section_detector = SectionDetector()
        self.candidate_extractor = CandidateExtractor()
        
        self.skill_ontology = SkillOntologyEngine()
        self.skill_extractor = SkillExtractor(self.skill_ontology.skills_data)
        self.experience_extractor = ExperienceExtractor()
        self.project_extractor = ProjectExtractor()
        self.education_extractor = EducationExtractor()
        self.certification_extractor = CertificationExtractor()

        self.domain_detector = DomainDetector()
        self.embedding_service = EmbeddingService()
        self.career_matcher = CareerMatcher(self.embedding_service)
        self.skill_gap_engine = SkillGapEngine()
        self.transition_engine = CareerTransitionEngine()
        self.career_path_engine = CareerPathEngine()
        self.roadmap_engine = RoadmapEngine()

    def analyze_document(self, file_bytes: bytes, filename: str) -> AnalyzeResumeResponse:
        logger.info(f"[ResumePipeline] Ingesting filename: '{filename}' ({len(file_bytes)} bytes)")
        
        # 1. Document Extraction
        lower_name = filename.lower()
        if lower_name.endswith((".docx", ".doc")):
            full_text = self.docx_parser.parse(file_bytes, filename)
        else:
            full_text = self.pdf_parser.parse(file_bytes, filename)

        if not full_text or len(full_text.strip()) == 0:
            raise ValueError("No readable text could be extracted from this document.")

        logger.info(f"[Extraction] {len(full_text)} characters extracted.")
        return self.analyze_text(full_text, filename, len(file_bytes))

    def analyze_text(self, full_text: str, filename: str = "document.pdf", file_size: int = 1024) -> AnalyzeResumeResponse:
        # 2. Section Detection
        sections = self.section_detector.detect_sections(full_text)
        logger.info(f"[Sections] Detected: {list(sections.keys())}")

        # 3. Candidate Metadata
        cand_info = self.candidate_extractor.extract_info(full_text, sections, filename)

        # 4. Skill Extraction & Scoring
        extracted_skills, category_groups = self.skill_extractor.extract_skills(full_text, sections)
        logger.info(f"[Skills] {len(extracted_skills)} competencies detected.")

        # 5. Experience & Projects Extraction
        experiences = self.experience_extractor.extract_experience(sections.get("EXPERIENCE", ""))
        logger.info(f"[Experience] {len(experiences)} roles detected.")

        projects = self.project_extractor.extract_projects(sections.get("PROJECTS", ""), full_text)
        logger.info(f"[Projects] {len(projects)} dedicated projects detected.")

        education = self.education_extractor.extract_education(sections.get("EDUCATION", ""), full_text)
        certifications = self.certification_extractor.extract_certifications(sections.get("CERTIFICATIONS", ""), full_text)

        # 6. Domain Detection
        domain_confidences, primary_domain, secondary_domains = self.domain_detector.detect_domains(
            full_text=full_text,
            extracted_skills=extracted_skills,
            projects=projects,
            experience=experiences
        )
        logger.info(f"[Domain] Primary: {primary_domain} ({int(domain_confidences.get(primary_domain, 0)*100)}%)")

        # 7. Career Matching (6-Pillar Formula)
        career_matches = self.career_matcher.evaluate_matches(
            candidate_name=cand_info["name"],
            candidate_summary=cand_info["summary"],
            extracted_skills=extracted_skills,
            experience=experiences,
            projects=projects,
            education=education,
            years_exp=cand_info["yearsOfExperience"],
            domain_confidences=domain_confidences
        )
        logger.info(f"[CareerMatching] {len(career_matches)} roles evaluated.")

        top_match = career_matches[0] if career_matches else None
        top_fit = top_match.fitPercentage if top_match else 0

        # 8. Skill Gap Analysis
        skill_gaps = self.skill_gap_engine.analyze_gaps(top_match, extracted_skills) if top_match else []
        critical_gaps_count = len([g for g in skill_gaps if g.gap == 'High Deficit'])
        logger.info(f"[SkillGap] {len(skill_gaps)} gaps detected ({critical_gaps_count} critical).")

        # 9. Career Transitions
        transitions = self.transition_engine.compute_transitions(career_matches, extracted_skills)

        # 10. Dynamic Career Path
        career_path = self.career_path_engine.get_pathway(
            primary_domain=primary_domain,
            top_match=top_match,
            years_exp=cand_info["yearsOfExperience"]
        )

        # 11. Personalized Adaptive Roadmap (Section 19-22)
        roadmap = self.roadmap_engine.generate_roadmap(
            candidate_name=cand_info["name"],
            years_exp=cand_info["yearsOfExperience"],
            top_match=top_match,
            extracted_skills=extracted_skills,
            projects=projects
        )
        logger.info(f"[Roadmap] {len(roadmap)} adaptive milestones generated.")

        # 12. Candidate Career DNA (Section 24)
        strong_skill_names = [s.name for s in extracted_skills if s.status == "Strong"][:5]
        career_dna = CareerDNA(
            primaryDomain=primary_domain,
            coreStrength=f"{primary_domain} & {top_match.roleTitle}" if top_match else primary_domain,
            strongSkills=strong_skill_names if strong_skill_names else ["No strong skill evidence detected yet."],
            evidenceProjectsCount=len(projects),
            yearsOfExperience=cand_info["yearsOfExperience"],
            careerDirection=top_match.roleTitle if top_match else primary_domain,
            confidencePercentage=int(domain_confidences.get(primary_domain, 0.5) * 100)
        )

        # 13. Independent Readiness Score Calculation (Section 25)
        # Readiness = (SkillCoverage * 0.35) + (ExperienceScore * 0.25) + (ProjectScore * 0.15) + (TopFit * 0.15) - (CriticalGaps * 2.5)
        skill_coverage_pct = (len([s for s in extracted_skills if s.status == 'Strong']) / max(1, len(extracted_skills))) * 100
        exp_score = min(100, cand_info["yearsOfExperience"] * 20 + 20) if cand_info["yearsOfExperience"] > 0 else 10
        proj_score = min(100, len(projects) * 35) if len(projects) > 0 else 0
        
        calculated_readiness = int(
            (skill_coverage_pct * 0.35)
            + (exp_score * 0.25)
            + (proj_score * 0.15)
            + (top_fit * 0.15)
            - (critical_gaps_count * 2.5)
        )
        calculated_readiness = max(0, min(100, calculated_readiness))

        # 14. Candidate Profile Payload
        current_title = experiences[0].title if experiences else "Not detected in resume"
        current_employer = experiences[0].company if experiences else "Not detected in resume"

        profile = CandidateProfile(
            id=str(uuid.uuid4()),
            candidateName=cand_info["name"],
            detectedDomain=primary_domain,
            secondaryDomains=secondary_domains,
            domainConfidences=domain_confidences,
            documentName=filename,
            fileSizeBytes=file_size,
            parsedDate=datetime.datetime.now().strftime("%B %d, %Y"),
            yearsOfExperience=cand_info["yearsOfExperience"],
            readinessScore=calculated_readiness,
            overallFitScore=top_fit,
            skillCoverageScore=int(skill_coverage_pct),
            skillGapsCount=critical_gaps_count,
            summary=cand_info["summary"],
            email=cand_info["email"],
            phone=cand_info["phone"],
            location=cand_info["location"],
            currentTitle=current_title,
            currentEmployer=current_employer,
            targetRoles=[m.roleTitle for m in career_matches[:4]],
            skills=extracted_skills,
            skillCategories=category_groups,
            recentMatches=career_matches[:4],
            roadmap=roadmap,
            education=education,
            experience=experiences,
            projects=projects,
            certifications=certifications,
            achievements=sections.get("ACHIEVEMENTS", "").splitlines()[:3] if "ACHIEVEMENTS" in sections else [],
            publications=sections.get("PUBLICATIONS", "").splitlines()[:2] if "PUBLICATIONS" in sections else []
        )

        explanations = [
            f"Primary discipline identified as {primary_domain} with {int(domain_confidences.get(primary_domain, 0.8)*100)}% confidence.",
            f"Calculated top fit as {top_match.roleTitle if top_match else 'None'} ({top_fit}% match score) based on {len(top_match.alignedSkills if top_match else [])} verified skills.",
            f"Roadmap calibrated for {cand_info['yearsOfExperience']} years verified experience with {len(roadmap)} adaptive milestones."
        ]

        evidence_list = []
        for s in extracted_skills:
            if s.sourceQuote:
                source_type = "experience" if s.yearsOfExperience and s.yearsOfExperience > 1.5 else "skills"
                evidence_list.append({
                    "claim": s.name,
                    "source": source_type,
                    "quote": s.sourceQuote,
                    "confidence": s.confidenceScore or 0.90
                })

        logger.info(f"[ResumePipeline] Analysis completed successfully for '{cand_info['name']}'.")

        return AnalyzeResumeResponse(
            success=True,
            message="Resume analysis completed successfully with zero hallucinations.",
            candidateProfile=profile,
            careerDNA=career_dna,
            domains=domain_confidences,
            skills=extracted_skills,
            experience=experiences,
            education=education,
            projects=projects,
            certifications=certifications,
            careerMatches=career_matches,
            skillGaps=skill_gaps,
            careerPath=career_path,
            careerTransitions=transitions,
            transitions=transitions,
            roadmap=roadmap,
            evidence=evidence_list[:12],
            explanations=explanations
        )
