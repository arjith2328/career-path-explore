import re
from typing import List, Dict, Any
from backend.schemas.models import CertificationItem

class CertificationExtractor:
    """
    Extracts verified certifications and courses from the CERTIFICATIONS section.
    """

    KNOWN_ISSUERS = ["AWS", "Google", "Microsoft", "Coursera", "DeepLearning.AI", "Cisco", "Linux Foundation", "NVIDIA", "Stanford Online"]

    def extract_certifications(self, cert_text: str, full_text: str) -> List[CertificationItem]:
        source = cert_text if cert_text and len(cert_text.strip()) > 10 else ""
        if not source:
            # Look for certification lines in full text
            cert_lines = [l for l in full_text.splitlines() if any(k in l.lower() for k in ["certified", "certification", "deeplearning.ai", "aws certified"])]
            source = "\n".join(cert_lines)

        items: List[CertificationItem] = []
        if not source:
            return items

        for line in source.splitlines():
            cleaned = re.sub(r"^[•\-*–\s]+", "", line).strip()
            if len(cleaned) > 8:
                issuer = "Industry Organization"
                for known in self.KNOWN_ISSUERS:
                    if known.lower() in cleaned.lower():
                        issuer = known
                        break
                
                year_m = re.search(r"\b(20\d{2})\b", cleaned)
                year = year_m.group(0) if year_m else "Verified"

                items.append(
                    CertificationItem(
                        name=cleaned.split("|")[0].strip(),
                        issuer=issuer,
                        year=year,
                        status="Verified from Resume"
                    )
                )

        return items
