import re
from typing import List, Dict, Any
from backend.schemas.models import ProjectItem

class ProjectExtractor:
    """
    Extracts structured technical projects EXCLUSIVELY from dedicated project sections:
    PROJECTS, PERSONAL PROJECTS, ACADEMIC PROJECTS, PROJECT EXPERIENCE.

    If no dedicated project section exists, returns [] without inventing projects
    or scraping work experience into fake projects.
    """

    TECH_DICTIONARY = [
        "Python", "PyTorch", "TensorFlow", "OpenCV", "YOLO", "YOLOv8", "TensorRT", "ONNX",
        "React", "TypeScript", "JavaScript", "Next.js", "Node.js", "Express", "FastAPI",
        "Docker", "Kubernetes", "AWS", "SQL", "PostgreSQL", "MongoDB", "Redis",
        "Embedded C", "C++", "C", "STM32", "FreeRTOS", "ESP32", "ARM", "UART", "SPI", "I2C", "CAN",
        "ROS", "ROS 2", "Gazebo", "SLAM", "Verilog", "VHDL", "FPGA", "Altium", "KiCad",
        "Spark", "PySpark", "Kafka", "Airflow", "dbt", "Snowflake"
    ]

    def extract_projects(self, proj_text: str, full_text: str, detected_domain: str = "") -> List[ProjectItem]:
        # Strict Rule: Only extract if a dedicated project section was detected and has content
        if not proj_text or len(proj_text.strip()) < 15:
            return []

        lines = [l.strip() for l in proj_text.splitlines() if l.strip()]
        projects: List[ProjectItem] = []
        current_name = ""
        current_desc_lines: List[str] = []
        current_techs: List[str] = []

        def flush_project():
            nonlocal current_name, current_desc_lines, current_techs
            if current_name and (current_desc_lines or current_techs):
                full_desc = " ".join(current_desc_lines)
                if not current_techs:
                    for tech in self.TECH_DICTIONARY:
                        if re.search(rf"\b{re.escape(tech)}\b", full_desc + " " + current_name, re.IGNORECASE):
                            current_techs.append(tech)

                evidence = f"Project '{current_name}': {full_desc[:250]}" if full_desc else f"Project '{current_name}'"
                projects.append(
                    ProjectItem(
                        title=current_name,
                        role="Project Developer",
                        description=full_desc if full_desc else f"Project implementation extracted directly from resume.",
                        technologies=list(set(current_techs)) if current_techs else [],
                        evidenceSnippet=evidence,
                        impactOutcome=None
                    )
                )
            current_name = ""
            current_desc_lines = []
            current_techs = []

        for line in lines:
            # Check for project title header
            if "|" in line or (" - " in line and len(line) < 80) or line.isupper():
                parts = line.split("|")
                flush_project()
                current_name = parts[0].strip(" •-*#:")
                if len(parts) > 1:
                    tech_str = parts[1]
                    for tech in self.TECH_DICTIONARY:
                        if re.search(rf"\b{re.escape(tech)}\b", tech_str, re.IGNORECASE):
                            current_techs.append(tech)
                continue

            # Project bullet point
            if line.startswith(("•", "-", "*", "–")):
                cleaned_bullet = re.sub(r"^[•\-*–\s]+", "", line).strip()
                if len(cleaned_bullet) > 10:
                    current_desc_lines.append(cleaned_bullet)
                    for tech in self.TECH_DICTIONARY:
                        if re.search(rf"\b{re.escape(tech)}\b", cleaned_bullet, re.IGNORECASE):
                            current_techs.append(tech)
            elif current_name and len(line) > 10:
                current_desc_lines.append(line)
                for tech in self.TECH_DICTIONARY:
                    if re.search(rf"\b{re.escape(tech)}\b", line, re.IGNORECASE):
                        current_techs.append(tech)
            elif not current_name and len(line) < 60:
                # Potential title
                current_name = line.strip(" •-*#:")

        flush_project()
        return projects
