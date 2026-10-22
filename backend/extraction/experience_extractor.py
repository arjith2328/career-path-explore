import re
from typing import List, Dict, Any
from backend.schemas.models import ExperienceItem

class ExperienceExtractor:
    """
    Extracts work experience records from the EXPERIENCE / INTERNSHIP sections,
    parsing company, role, dates, and bulleted responsibility achievements.
    """

    def extract_experience(self, exp_text: str, detected_domain: str = "Software Engineering") -> List[ExperienceItem]:
        if not exp_text or len(exp_text.strip()) == 0:
            return []

        lines = [l.strip() for l in exp_text.splitlines() if l.strip()]
        experiences: List[ExperienceItem] = []
        
        current_title = ""
        current_company = ""
        current_period = ""
        current_highlights: List[str] = []
        current_skills: List[str] = []

        def flush_current():
            nonlocal current_title, current_company, current_period, current_highlights, current_skills
            if current_title or current_company:
                period_display = current_period if current_period else "Dates not specified"
                full_snippet = f"{current_title or 'Engineering Role'} at {current_company or 'Company'} ({period_display}): " + " ".join(current_highlights[:2])
                experiences.append(
                    ExperienceItem(
                        title=current_title or "Not detected in resume",
                        company=current_company or "Not detected in resume",
                        period=period_display,
                        domain=detected_domain,
                        highlights=current_highlights if current_highlights else [],
                        extractedSkills=list(dict.fromkeys(current_skills))[:8],
                        evidenceSnippet=full_snippet[:300].strip()
                    )
                )
            current_title = ""
            current_company = ""
            current_period = ""
            current_highlights = []
            current_skills = []

        for line in lines:
            # Check for title/company line with pipe or hyphen or date: e.g. "Senior ML Engineer | NeuralVision Systems | 2021 - Present"
            if "|" in line or (" - " in line and re.search(r"\b(20\d{2}|19\d{2}|Present|Current)\b", line, re.I)):
                parts = [p.strip() for p in line.split("|")]
                if len(parts) >= 2:
                    flush_current()
                    current_title = parts[0]
                    current_company = parts[1]
                    if len(parts) >= 3:
                        current_period = parts[2]
                    else:
                        date_m = re.search(r"\b(20\d{2}|19\d{2})\s*(?:-|–|—|to)\s*(20\d{2}|Present|Current)\b", line, re.I)
                        current_period = date_m.group(0) if date_m else ""
                    continue
                elif " - " in line:
                    date_m = re.search(r"\b(20\d{2}|19\d{2})\s*(?:-|–|—|to)\s*(20\d{2}|Present|Current)\b", line, re.I)
                    if date_m:
                        flush_current()
                        text_part = line[:date_m.start()].strip(" -–|,\t")
                        current_period = date_m.group(0)
                        if " at " in text_part.lower():
                            sub = re.split(r"(?i)\s+at\s+", text_part)
                            current_title = sub[0].strip()
                            current_company = sub[1].strip() if len(sub) > 1 else ""
                        elif "," in text_part:
                            sub = text_part.split(",")
                            current_title = sub[0].strip()
                            current_company = sub[1].strip() if len(sub) > 1 else ""
                        else:
                            current_title = text_part
                        continue

            # Check if bullet point or responsibility line
            cleaned_bullet = re.sub(r"^[\u2022\u25cf\u2013\u2014\ufffd•\-*–—\s]+", "", line).strip()
            if len(cleaned_bullet) > 10 and (line.startswith(("•", "-", "*", "–", "—", "\u2022", "\u25cf", "\ufffd")) or current_title):
                current_highlights.append(cleaned_bullet)
                # Extract skill tokens
                words = re.findall(r"\b[A-Za-z0-9\+\#\.\-]{2,}\b", cleaned_bullet)
                for w in words:
                    if w.lower() in ["pytorch", "opencv", "tensorrt", "docker", "fastapi", "python", "scikit-learn", "pandas", "sql", "aws", "kubernetes", "c++", "c", "react", "typescript", "freertos", "stm32", "arm", "kafka", "spark"]:
                        current_skills.append(w)

        flush_current()
        return experiences
