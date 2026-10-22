import re
from typing import Dict, List, Tuple

class SectionDetector:
    """
    Identifies resume sections and boundary lines using flexible regex pattern matching
    against standard and non-standard resume headings.
    """

    SECTION_PATTERNS = {
        "SUMMARY": [
            r"^(?:professional\s+|career\s+|executive\s+)?summary",
            r"^(?:career\s+)?objective",
            r"^executive\s+summary",
            r"^about\s+(?:me|myself)",
            r"^(?:professional\s+)?profile(?:\s+summary)?"
        ],
        "EDUCATION": [
            r"^education(?:al\s+background)?",
            r"^academic\s+(?:qualifications|background|history|credentials)",
            r"^degrees?\s+(?:and\s+education)?",
            r"^university\s+education",
            r"^academics?"
        ],
        "EXPERIENCE": [
            r"^(?:work\s+|professional\s+|relevant\s+|technical\s+|career\s+|industry\s+)?experience",
            r"^employment\s+(?:history|record)",
            r"^work\s+history",
            r"^career\s+history",
            r"^professional\s+background"
        ],
        "INTERNSHIP": [
            r"^internships?",
            r"^industrial\s+training",
            r"^summer\s+internships?",
            r"^practicum"
        ],
        "SKILLS": [
            r"^(?:technical\s+|core\s+|key\s+|primary\s+)?skills?(?:\s*(?:&|and)\s*(?:competencies|tools|technologies))?",
            r"^technical\s+competencies",
            r"^technologies\s*(?:and|&)?\s*(?:tools)?",
            r"^tools\s*(?:and|&)?\s*technologies",
            r"^programming\s+languages",
            r"^competencies",
            r"^areas\s+of\s+expertise"
        ],
        "PROJECTS": [
            r"^(?:academic\s+|key\s+|selected\s+|technical\s+|personal\s+|software\s+|capstone\s+|featured\s+)?projects?",
            r"^project\s+experience",
            r"^technical\s+portfolio",
            r"^open\s+source\s+contributions"
        ],
        "CERTIFICATIONS": [
            r"^certifications?",
            r"^licenses?\s*(?:and|&)?\s*(?:certifications?)?",
            r"^courses?\s*(?:and|&)?\s*certifications?",
            r"^accreditations?",
            r"^credentials"
        ],
        "ACHIEVEMENTS": [
            r"^(?:key\s+|major\s+|notable\s+)?achievements?",
            r"^awards?\s*(?:and|&)?\s*(?:honors?)?",
            r"^honors?\s*(?:and|&)?\s*(?:awards?)?",
            r"^accomplishments?",
            r"^recognitions?"
        ],
        "PUBLICATIONS": [
            r"^publications?",
            r"^research\s+(?:papers?|publications?)",
            r"^patents?",
            r"^conference\s+proceedings"
        ],
        "COURSEWORK": [
            r"^(?:relevant\s+|key\s+)?coursework",
            r"^key\s+courses",
            r"^subjects\s+studied"
        ],
        "LEADERSHIP": [
            r"^positions?\s+of\s+responsibility",
            r"^leadership\s+(?:activities|roles)?",
            r"^extracurricular\s+(?:activities|involvement)"
        ]
    }

    def detect_sections(self, text: str) -> Dict[str, str]:
        """
        Splits resume text into labeled sections.
        Returns a dictionary mapping section name -> section text.
        """
        lines = [line.strip() for line in text.splitlines()]
        sections: Dict[str, List[str]] = {"HEADER": []}
        current_section = "HEADER"

        for line in lines:
            if not line:
                continue

            detected = self._match_heading(line)
            if detected:
                current_section = detected
                if current_section not in sections:
                    sections[current_section] = []
            else:
                sections[current_section].append(line)

        # Join lines for each section
        return {sec: "\n".join(content_lines) for sec, content_lines in sections.items() if content_lines}

    def _match_heading(self, line: str) -> str | None:
        """
        Tests if a single line acts as a section heading.
        Section headings are typically short (< 50 chars) and match section keywords.
        """
        cleaned = re.sub(r"[^\w\s&/]", "", line).strip().lower()
        if len(cleaned) == 0 or len(cleaned) > 50:
            return None

        for section_name, patterns in self.SECTION_PATTERNS.items():
            for pattern in patterns:
                if re.match(pattern, cleaned, re.IGNORECASE):
                    return section_name

        return None
