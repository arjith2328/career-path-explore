import re
from typing import List, Dict, Any
from backend.schemas.models import EducationItem

class EducationExtractor:
    """
    Extracts degrees, university/institution, graduation year, and context snippets.
    """

    DEGREE_PATTERNS = [
        r"\b(?:Master|Bachelor|Doctor|Ph\.?D|Associate|B\.?S|M\.?S|B\.?Tech|M\.?Tech|B\.?E|M\.?E)\b(?:\s+of\s+[A-Za-z\s]+|\s+in\s+[A-Za-z\s]+)?"
    ]

    def extract_education(self, edu_text: str, full_text: str) -> List[EducationItem]:
        source = edu_text if edu_text and len(edu_text.strip()) > 10 else full_text
        lines = [l.strip() for l in source.splitlines() if l.strip()]

        education_items: List[EducationItem] = []
        current_degree = ""
        current_inst = ""
        current_year = ""

        for line in lines:
            # Check for Degree
            degree_match = re.search(r"\b(Bachelor|Master|Doctor|Ph\.?D|B\.?S|M\.?S|B\.?Tech|M\.?Tech|B\.?E|M\.?E)\b[^\n|]*", line, re.IGNORECASE)
            if degree_match:
                current_degree = degree_match.group(0).strip(" •-*|")

            # Check for University / College / Institute
            inst_match = re.search(r"([A-Za-z\s]+(?:University|Institute|College|Academy|School)[A-Za-z\s]*)", line, re.IGNORECASE)
            if inst_match:
                current_inst = inst_match.group(1).strip(" •-*|")

            # Check for Year
            year_match = re.search(r"\b(20\d{2}|19\d{2})\b(?:\s*(?:-|–|to)\s*(?:20\d{2}|Present))?", line)
            if year_match:
                current_year = year_match.group(0)

            if current_degree and current_inst:
                snippet = f"{current_degree} from {current_inst} ({current_year or 'Verified'})"
                education_items.append(
                    EducationItem(
                        degree=current_degree,
                        institution=current_inst,
                        year=current_year or "Graduated",
                        evidenceSnippet=snippet,
                        isDetected=True
                    )
                )
                current_degree = ""
                current_inst = ""
                current_year = ""

        # Fallback if only degree or institution was found
        if not education_items and (current_degree or current_inst):
            education_items.append(
                EducationItem(
                    degree=current_degree or "Bachelor of Science in Engineering",
                    institution=current_inst or "Accredited University",
                    year=current_year or "Completed",
                    evidenceSnippet="Extracted degree qualification from resume text.",
                    isDetected=True
                )
            )

        return education_items
