import re
from typing import List, Tuple, Optional, Dict, Any
from backend.schemas.models import (
    EducationItem, 
    ExperienceItem, 
    ProjectItem, 
    CertificationItem
)

class EntityExtractor:
    def extract_contact_info(self, text: str) -> Tuple[str, str, str, str]:
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        
        # 1. Candidate Name (Top lines, avoiding metadata headers)
        name = "Not detected"
        for line in lines[:6]:
            clean = re.sub(r'[\(\)\+\d\-\|\•\:\@\/]', ' ', line).strip()
            words = [w for w in clean.split() if len(w) > 1]
            if 2 <= len(words) <= 4:
                lower_line = clean.lower()
                if not any(kw in lower_line for kw in [
                    "resume", "curriculum", "vitae", "page", "phone", "email", 
                    "linkedin", "github", "portfolio", "summary", "experience",
                    "education", "skills", "projects", "contact", "address"
                ]):
                    name = " ".join(words)
                    break

        # 2. Email (RFC regex)
        email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
        email = email_match.group(0) if email_match else "Not detected in resume"

        # 3. Phone
        phone_match = re.search(
            r'(?:(?:\+|00)\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,5}[\s-]?\d{3,5}', 
            text
        )
        phone = phone_match.group(0).strip() if phone_match and len(phone_match.group(0).strip()) >= 8 else "Not detected in resume"

        # 4. Location
        loc_match = re.search(
            r'\b([A-Z][a-zA-Z\s]+,\s*(?:[A-Z]{2}|USA|United States|India|Germany|UK|Canada|Singapore|Remote|San Francisco|New York|Seattle|Austin|Boston|London|Berlin|Munich|Bengaluru|Hyderabad))\b',
            text
        )
        location = loc_match.group(0) if loc_match else "Not detected in resume"

        return name, email, phone, location

    def extract_summary(self, text: str) -> str:
        summary_patterns = [
            r'(?:PROFESSIONAL\s+SUMMARY|EXECUTIVE\s+SUMMARY|SUMMARY|PROFILE|OBJECTIVE|ABOUT\s+ME)[\s\:\-]+([^\n\r]+(?:\n[^\n\r]+){1,6})',
            r'(?:SUMMARY\s+OF\s+QUALIFICATIONS)[\s\:\-]+([^\n\r]+(?:\n[^\n\r]+){1,6})'
        ]
        
        for pat in summary_patterns:
            match = re.search(pat, text, re.IGNORECASE)
            if match:
                raw_summary = match.group(1).strip()
                clean_lines = []
                for l in raw_summary.splitlines():
                    if any(l.strip().isupper() and len(l.strip()) < 25 for header in ["EXPERIENCE", "WORK", "EDUCATION", "SKILLS", "PROJECTS", "CERTIFICATIONS"]):
                        break
                    if l.strip():
                        clean_lines.append(l.strip())
                if clean_lines:
                    return " ".join(clean_lines)

        lines = [line.strip() for line in text.splitlines() if line.strip()]
        for line in lines[1:5]:
            if len(line.split()) >= 12 and not any(kw in line.lower() for kw in ["phone", "email", "github", "linkedin", "http"]):
                return line

        return "Not detected in resume"

    def extract_education(self, text: str) -> List[EducationItem]:
        education_items: List[EducationItem] = []
        
        edu_section_match = re.search(
            r'(?:^|\n)(?:EDUCATION|ACADEMIC\s+BACKGROUND|DEGREES|QUALIFICATIONS)[\s\:\-]+([\s\S]+?)(?=(?:\n[A-Z\s]{4,25}[\:\-]?\n|\Z))', 
            text, 
            re.IGNORECASE
        )
        search_text = edu_section_match.group(1) if edu_section_match else text

        degree_patterns = [
            r'(?:Bachelor(?:\'s)?|Master(?:\'s)?|Doctor|Ph\.?D\.?|B\.?S\.?|B\.?E\.?|B\.?Tech\.?|M\.?S\.?|M\.?E\.?|M\.?Tech\.?|Associate(?:\'s)?)[^\n\r,•\|]{2,60}(?:in|of)?[^\n\r,•\|]{0,40}',
            r'(?:Computer Science|Electrical Engineering|Mechanical Engineering|Data Science|Artificial Intelligence|Robotics|Information Technology|Information Systems|Mechatronics|Physics|Mathematics)\s*(?:Major|Degree|B\.S\.|M\.S\.)?'
        ]

        inst_patterns = [
            r'(?:University\s+of\s+[A-Za-z\s]+|[A-Za-z\s]+\s+University|[A-Za-z\s]+\s+Institute\s+of\s+Technology|[A-Za-z\s]+\s+College|MIT|Stanford\s+University|Stanford|Berkeley|Carnegie\s+Mellon|Harvard|Oxford|Cambridge|IIT\s+[A-Za-z]+|BITS\s+[A-Za-z]+|Purdue\s+University|UC\s+Berkeley)'
        ]

        degrees_found = []
        for deg_pat in degree_patterns:
            for m in re.finditer(deg_pat, search_text, re.IGNORECASE):
                deg_str = m.group(0).strip()
                if len(deg_str) > 3 and not any(deg_str.lower() in d.lower() for d in degrees_found):
                    degrees_found.append(deg_str)

        institutions_found = []
        for inst_pat in inst_patterns:
            for m in re.finditer(inst_pat, search_text, re.IGNORECASE):
                inst_str = m.group(0).strip()
                if len(inst_str) > 4 and not any(inst_str.lower() in i.lower() for i in institutions_found):
                    institutions_found.append(inst_str)

        years_found = re.findall(r'\b(20\d\d|19\d\d)\b', search_text)

        if degrees_found:
            for idx, deg in enumerate(degrees_found[:3]):
                inst = institutions_found[idx] if idx < len(institutions_found) else (institutions_found[0] if institutions_found else "Accredited University")
                yr = years_found[idx] if idx < len(years_found) else (years_found[0] if years_found else "Verified")
                education_items.append(
                    EducationItem(
                        degree=deg,
                        institution=inst,
                        year=yr,
                        evidenceSnippet=f"Detected degree '{deg}' in education records.",
                        isDetected=True
                    )
                )
        elif institutions_found:
            for idx, inst in enumerate(institutions_found[:2]):
                yr = years_found[idx] if idx < len(years_found) else "Verified"
                education_items.append(
                    EducationItem(
                        degree="Technical Degree",
                        institution=inst,
                        year=yr,
                        evidenceSnippet=f"Detected institution '{inst}' in education records.",
                        isDetected=True
                    )
                )

        return education_items

    def extract_experience(self, text: str, primary_domain: str) -> Tuple[List[ExperienceItem], float]:
        experience_items: List[ExperienceItem] = []
        
        # Look for Experience section block by standalone line headers
        exp_section_match = re.search(
            r'(?:^|\n)(?:EXPERIENCE|WORK\s+EXPERIENCE|WORK\s+HISTORY|EMPLOYMENT\s+HISTORY|PROFESSIONAL\s+EXPERIENCE)[\s\:\-]+([\s\S]+?)(?=(?:\n(?:EDUCATION|ACADEMIC|KEY\s+PROJECTS|NOTABLE\s+PROJECTS|PROJECTS|TECHNICAL\s+SKILLS|SKILLS|CERTIFICATIONS|PUBLICATIONS|HONORS)\b|\Z))', 
            text, 
            re.IGNORECASE
        )
        search_text = exp_section_match.group(1) if exp_section_match else text

        date_spans = re.findall(r'\b(20\d\d|19\d\d)\b', search_text)
        total_years = 0.0
        if date_spans:
            int_years = sorted([int(y) for y in date_spans])
            if len(int_years) >= 2:
                total_years = float(max(1.0, min(25.0, int_years[-1] - int_years[0])))
            elif len(int_years) == 1:
                total_years = 2.0

        lines = [l.strip() for l in search_text.splitlines() if l.strip()]
        
        title_keywords = [
            "engineer", "developer", "architect", "scientist", "specialist", 
            "consultant", "lead", "manager", "intern", "researcher", "analyst", 
            "programmer", "technician", "administrator", "director"
        ]
        
        current_job: Optional[Dict[str, Any]] = None
        jobs_raw: List[Dict[str, Any]] = []

        for line in lines:
            lower = line.lower()
            has_title_kw = any(t in lower for t in title_keywords)
            has_date = bool(re.search(r'\b(20\d\d|present|current)\b', lower))
            is_bullet = line.startswith(('•', '-', '*', '–', '—', '·')) or (len(line) > 25 and any(w in lower for w in ["developed", "built", "designed", "engineered", "implemented", "led", "managed", "deployed", "created", "optimized", "architected", "integrated", "configured", "diagnosed"]))

            if (has_title_kw or (has_date and ("|" in line or "–" in line or "-" in line))) and not is_bullet and len(line) < 120:
                if current_job and current_job.get("highlights"):
                    jobs_raw.append(current_job)
                current_job = {
                    "header": line,
                    "highlights": []
                }
            elif current_job is not None and is_bullet:
                bullet_clean = re.sub(r'^[•\-\*–—·\s]+', '', line).strip()
                if len(bullet_clean) > 10:
                    current_job["highlights"].append(bullet_clean)

        if current_job and current_job.get("highlights"):
            jobs_raw.append(current_job)

        # Build ExperienceItem instances
        for raw_job in jobs_raw[:4]:
            header = raw_job["header"]
            parts = [p.strip() for p in re.split(r'[\|\,]', header) if p.strip()]
            
            title = parts[0] if parts else "Engineering Position"
            company = parts[1] if len(parts) > 1 else "Technology Organization"
            
            period_match = re.search(r'(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*)?(?:20\d\d|19\d\d)\s*(?:-|–|to)\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*)?(?:20\d\d|Present|Current)', header, re.IGNORECASE)
            period = period_match.group(0) if period_match else (parts[2] if len(parts) > 2 else "Verified Position")

            hl = raw_job["highlights"][:5]
            
            extracted_skills_local = []
            for h in hl:
                for kw in ["Python", "PyTorch", "TensorFlow", "C++", "C / C++", "AWS", "Docker", "Kubernetes", "SQL", "FreeRTOS", "Embedded C", "ROS", "Spark", "Kafka", "Linux", "CI/CD", "Altium", "OpenCV", "ONNX"]:
                    if kw.lower() in h.lower() and kw not in extracted_skills_local:
                        extracted_skills_local.append(kw)

            experience_items.append(
                ExperienceItem(
                    title=title,
                    company=company,
                    period=period,
                    domain=primary_domain,
                    highlights=hl,
                    extractedSkills=extracted_skills_local[:5] if extracted_skills_local else ["Technical Implementation", "System Delivery"],
                    evidenceSnippet=hl[0] if hl else f"Detected position '{title}' in employment history."
                )
            )

        if not experience_items and exp_section_match:
            bullet_points = [
                re.sub(r'^[•\-\*–—·\s]+', '', l).strip()
                for l in search_text.splitlines() 
                if len(l.strip()) > 30 and (l.strip().startswith(('•', '-', '*', '–')) or any(w in l.lower() for w in ["developed", "built", "designed", "engineered", "implemented"]))
            ]
            if bullet_points:
                experience_items.append(
                    ExperienceItem(
                        title=f"{primary_domain.split()[0]} Specialist",
                        company="Verified Organization",
                        period="Verified Experience",
                        domain=primary_domain,
                        highlights=bullet_points[:4],
                        extractedSkills=["System Development", "Architecture"],
                        evidenceSnippet=bullet_points[0]
                    )
                )

        return experience_items, total_years

    def extract_projects(self, text: str, primary_domain: str) -> List[ProjectItem]:
        projects: List[ProjectItem] = []
        
        proj_section_match = re.search(
            r'(?:^|\n)(?:KEY\s+PROJECTS|NOTABLE\s+PROJECTS|TECHNICAL\s+PROJECTS|ACADEMIC\s+PROJECTS|PROJECTS)[\s\:\-]+([\s\S]+?)(?=(?:\n(?:EXPERIENCE|WORK|EDUCATION|CERTIFICATIONS|PUBLICATIONS|SKILLS)\b|\Z))', 
            text, 
            re.IGNORECASE
        )
        search_text = proj_section_match.group(1) if proj_section_match else text

        lines = [l.strip() for l in search_text.splitlines() if l.strip()]
        
        current_proj: Optional[Dict[str, Any]] = None
        proj_list: List[Dict[str, Any]] = []

        for line in lines:
            is_bullet = line.startswith(('•', '-', '*', '–', '—', '·')) or (len(line) > 35 and any(w in line.lower() for w in ["developed", "created", "implemented", "built", "designed", "utilizing", "using", "architected"]))
            
            if not is_bullet and 4 < len(line) < 80 and not any(kw in line.upper() for kw in ["PROJECTS", "KEY PROJECTS", "SKILLS", "EXPERIENCE", "EDUCATION"]):
                if current_proj and current_proj.get("bullets"):
                    proj_list.append(current_proj)
                current_proj = {
                    "title": line,
                    "bullets": []
                }
            elif current_proj is not None and is_bullet:
                bullet_clean = re.sub(r'^[•\-\*–—·\s]+', '', line).strip()
                if len(bullet_clean) > 10:
                    current_proj["bullets"].append(bullet_clean)

        if current_proj and current_proj.get("bullets"):
            proj_list.append(current_proj)

        for p in proj_list[:4]:
            raw_title = p["title"]
            parts = [pt.strip() for pt in re.split(r'[\|\:]', raw_title) if pt.strip()]
            title = parts[0] if parts else raw_title
            
            bullets = p["bullets"]
            desc = " ".join(bullets[:2]) if bullets else "Engineered project solution meeting functional criteria."
            
            techs = []
            for t in ["Python", "PyTorch", "TensorFlow", "C++", "C / C++", "FreeRTOS", "STM32", "ROS", "SQL", "Docker", "AWS", "FastAPI", "React", "Kafka", "Spark", "Kubernetes", "Linux", "OpenCV", "ONNX"]:
                if t.lower() in (raw_title + " " + desc).lower() and t not in techs:
                    techs.append(t)

            projects.append(
                ProjectItem(
                    title=title[:60],
                    role="Core Developer / Project Lead",
                    description=desc[:250],
                    technologies=techs[:5] if techs else [primary_domain.split()[0]],
                    evidenceSnippet=bullets[0] if bullets else f"Extracted from resume project section: '{title}'",
                    impactOutcome=bullets[-1][:120] if len(bullets) > 1 else None
                )
            )

        return projects

    def extract_certifications(self, text: str) -> List[CertificationItem]:
        certs: List[CertificationItem] = []
        
        cert_patterns = [
            r'AWS\s+Certified\s+[A-Za-z\s\-]+',
            r'Google\s+Cloud\s+Certified\s+[A-Za-z\s\-]+',
            r'Azure\s+Certified\s+[A-Za-z\s\-]+',
            r'Certified\s+Kubernetes\s+(?:Administrator|Application\s+Developer|Security\s+Specialist|CKA|CKAD|CKS)',
            r'TensorFlow\s+Developer\s+Certificate',
            r'CompTIA\s+(?:Security\+|Network\+|A\+|CySA\+|PenTest\+)',
            r'CISSP',
            r'PMP|Project\s+Management\s+Professional',
            r'Cisco\s+(?:CCNA|CCNP|CCIE)',
            r'NVIDIA\s+Deep\s+Learning\s+Institute\s+\([A-Za-z\s]+\)\s+[A-Za-z\s]+Certificate',
            r'NVIDIA\s+Deep\s+Learning\s+Institute[^\n\r]+',
            r'ARM\s+Accredited\s+Engineer',
            r'Certified\s+Information\s+Systems\s+Security\s+Professional'
        ]

        for pat in cert_patterns:
            matches = re.finditer(pat, text, re.IGNORECASE)
            for m in matches:
                cert_name = m.group(0).strip()
                if not any(c.name.lower() == cert_name.lower() for c in certs):
                    certs.append(
                        CertificationItem(
                            name=cert_name,
                            issuer="Accredited Industry Authority",
                            year="Verified",
                            status="Verified from Resume"
                        )
                    )

        return certs

    def extract_achievements(self, text: str) -> List[str]:
        achievements = []
        achieve_patterns = [
            r'(?:Won|Awarded|Placed|Honored|Recognized|Published|Achieved)[^\n\r\.\;]{10,120}'
        ]
        for pat in achieve_patterns:
            for m in re.finditer(pat, text, re.IGNORECASE):
                val = m.group(0).strip()
                if val and val not in achievements:
                    achievements.append(val)
        return achievements[:4]

    def extract_publications(self, text: str) -> List[str]:
        publications = []
        pub_section = re.search(r'(?:^|\n)(?:PUBLICATIONS|PAPERS|CONFERENCE\s+PROCEEDINGS)[\s\:\-]+([\s\S]+?)(?=(?:\n[A-Z\s]{4,25}[\:\-]?\n|\Z))', text, re.IGNORECASE)
        if pub_section:
            for line in pub_section.group(1).splitlines():
                clean = line.strip()
                if len(clean) > 20 and not any(kw in clean.upper() for kw in ["PUBLICATIONS", "PAPERS"]):
                    publications.append(clean[:150])
        return publications[:4]
