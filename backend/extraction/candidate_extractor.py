import re
from typing import Dict, Any, Optional

class CandidateExtractor:
    """
    Extracts core candidate metadata: Name, Email, Phone, Location, Summary,
    and calculates total years of experience from resume evidence.
    """

    EMAIL_REGEX = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    PHONE_REGEX = r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
    LOCATION_REGEX = r"(?:Location:\s*)?([A-Za-z\s]+,\s*[A-Z]{2}(?:\s+\d{5})?|[A-Za-z\s]+,\s*[A-Za-z\s]+)"

    def extract_info(self, raw_text: str, sections: Dict[str, str], filename: str = "") -> Dict[str, Any]:
        email = self._extract_email(raw_text)
        phone = self._extract_phone(raw_text)
        location = self._extract_location(raw_text)
        name = self._extract_name(raw_text, sections.get("HEADER", ""), filename)
        summary = self._extract_summary(sections)
        years_exp = self._calculate_years_of_experience(raw_text, sections.get("EXPERIENCE", ""))

        return {
            "name": name,
            "email": email,
            "phone": phone,
            "location": location,
            "summary": summary,
            "yearsOfExperience": years_exp
        }

    def _extract_email(self, text: str) -> Optional[str]:
        match = re.search(self.EMAIL_REGEX, text)
        return match.group(0) if match else "Not detected in resume"

    def _extract_phone(self, text: str) -> Optional[str]:
        match = re.search(self.PHONE_REGEX, text)
        return match.group(0) if match else "Not detected in resume"

    def _extract_location(self, text: str) -> Optional[str]:
        # Search specifically for Location: ... or City, State
        for line in text.splitlines()[:15]:
            if "location:" in line.lower():
                cleaned = re.sub(r"(?i)location:\s*", "", line).strip()
                return cleaned.split("|")[0].strip()
            match = re.search(r"([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})", line)
            if match:
                return match.group(1).strip()
        return "Not detected in resume"

    def _extract_name(self, raw_text: str, header_text: str, filename: str) -> str:
        # 1. First check first few non-empty lines in header_text
        lines = [l.strip() for l in (header_text or raw_text).splitlines() if l.strip()]
        for line in lines[:5]:
            # Skip lines with emails, urls, phone numbers, or typical resume keywords
            if "@" in line or "http" in line or "www." in line or "github" in line or "linkedin" in line:
                continue
            if re.search(r"\d{3}", line):
                continue
            cleaned = re.sub(r"[^\w\s]", "", line).strip()
            words = cleaned.split()
            if 1 <= len(words) <= 4 and all(w.isalpha() for w in words):
                # Filter out generic titles
                if cleaned.lower() not in ["resume", "curriculum vitae", "cv", "professional summary"]:
                    return cleaned.upper() if cleaned.isupper() else cleaned.title()

        # 2. Fallback to clean filename
        if filename:
            clean_fn = re.sub(r"(?i)\.(pdf|docx|doc|txt)$", "", filename)
            clean_fn = re.sub(r"[_\-]+", " ", clean_fn)
            clean_fn = re.sub(r"(?i)\b(resume|cv|profile)\b", "", clean_fn).strip()
            if clean_fn:
                return clean_fn.title()

        return "Candidate"

    def _extract_summary(self, sections: Dict[str, str]) -> str:
        if "SUMMARY" in sections and sections["SUMMARY"].strip():
            return sections["SUMMARY"].strip()
        
        # Look for leading text before major sections
        header = sections.get("HEADER", "")
        lines = [l.strip() for l in header.splitlines() if l.strip()]
        summary_lines = []
        for line in lines[1:]:
            if "@" not in line and "phone" not in line.lower() and "github" not in line.lower() and "linkedin" not in line.lower() and "location:" not in line.lower():
                if len(line) > 15:
                    summary_lines.append(line)
        if summary_lines:
            return " ".join(summary_lines)

        return "Not detected in resume"

    def _calculate_years_of_experience(self, text: str, exp_text: str) -> float:
        # Search for explicit patterns e.g., "4+ years of experience" or "5 years"
        match = re.search(r"(\d+(?:\.\d+)?)\+?\s*(?:years|yrs)\s+(?:of\s+)?experience", text, re.IGNORECASE)
        if match:
            try:
                return float(match.group(1))
            except ValueError:
                pass

        # Parse year ranges in experience section, e.g. 2021 - 2024
        year_matches = re.findall(r"\b(20\d{2}|19\d{2})\s*(?:-|–|to)\s*(20\d{2}|Present|Current)\b", exp_text or text, re.IGNORECASE)
        total_months = 0
        current_year = 2026

        for start_str, end_str in year_matches:
            try:
                start_yr = int(start_str)
                end_yr = current_year if end_str.lower() in ["present", "current"] else int(end_str)
                if end_yr >= start_yr:
                    total_months += (end_yr - start_yr) * 12
            except ValueError:
                continue

        if total_months > 0:
            return round(total_months / 12, 1)

        return 0.0  # Zero if no dates or experience years detected in resume
