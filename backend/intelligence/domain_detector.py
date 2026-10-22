import re
from typing import Dict, List, Tuple, Any
from backend.schemas.models import SkillEvidence, ProjectItem, ExperienceItem

class DomainDetector:
    """
    Evaluates multi-label domain confidence across 15+ engineering and technology fields
    based on weighted candidate evidence from skills, projects, and work history.
    """

    DOMAIN_KEYWORDS = {
        "AI & Machine Learning": [
            "pytorch", "tensorflow", "opencv", "yolo", "machine learning", "deep learning", "nlp",
            "model", "computer vision", "neural network", "onnx", "tensorrt", "mlops", "scikit-learn",
            "image processing", "classification", "detection", "segmentation", "llm", "keras"
        ],
        "Computer Vision": [
            "opencv", "yolo", "yolov8", "computer vision", "image processing", "tensorrt", "object detection",
            "segmentation", "video analysis", "tracking", "point cloud", "camera", "perception", "bounding box"
        ],
        "Embedded Systems": [
            "embedded c", "c/c++", "stm32", "freertos", "arm cortex", "i2c", "spi", "uart", "can bus",
            "microcontroller", "firmware", "oscilloscope", "logic analyzer", "bare metal", "driver", "mcu", "esp32"
        ],
        "Software Engineering": [
            "react", "typescript", "javascript", "node.js", "express", "fastapi", "django", "flask",
            "next.js", "frontend", "backend", "full stack", "rest api", "graphql", "sql", "postgresql"
        ],
        "Frontend": [
            "react", "typescript", "javascript", "next.js", "tailwind", "css", "html", "vue", "angular",
            "frontend", "ui/ux", "web interface", "redux", "responsive"
        ],
        "Backend": [
            "node.js", "express", "fastapi", "django", "flask", "backend", "microservices", "sql",
            "postgresql", "mongodb", "redis", "rest api", "graphql", "api gateway"
        ],
        "Data Engineering": [
            "spark", "pyspark", "airflow", "kafka", "hadoop", "etl", "data warehouse", "lakehouse",
            "dbt", "bigquery", "snowflake", "sql", "data pipeline", "iceberg", "delta lake"
        ],
        "Data Science": [
            "data science", "pandas", "numpy", "statistics", "eda", "feature engineering", "scikit-learn",
            "predictive", "clustering", "regression", "tableau", "power bi"
        ],
        "Cloud & DevOps": [
            "docker", "kubernetes", "aws", "azure", "gcp", "ci/cd", "github actions", "terraform",
            "helm", "cloudformation", "infrastructure", "devops", "monitoring", "microservices"
        ],
        "Cybersecurity": [
            "penetration testing", "cybersecurity", "vulnerability", "encryption", "wireshark",
            "burp suite", "owasp", "metasploit", "firewall", "zero trust", "threat analysis"
        ],
        "Robotics & Automation": [
            "ros", "ros2", "robotics", "slam", "kinematics", "lidar", "gazebo", "trajectory",
            "actuator", "motion planning", "autonomous"
        ],
        "VLSI & Semiconductor": [
            "verilog", "systemverilog", "vhdl", "fpga", "xilinx", "vivado", "rtl", "asic",
            "timing closure", "quartus", "synthesis"
        ],
        "Electronics & Hardware": [
            "pcb", "altium", "kicad", "schematic", "gerber", "hardware design", "analog",
            "power electronics", "soldering", "circuit"
        ],
        "IoT & Edge Computing": [
            "mqtt", "coap", "iot", "edge computing", "esp32", "lora", "ble", "sensors",
            "telemetry", "aws iot"
        ]
    }

    def detect_domains(
        self,
        full_text: str,
        extracted_skills: List[SkillEvidence],
        projects: List[ProjectItem],
        experience: List[ExperienceItem]
    ) -> Tuple[Dict[str, float], str, List[str]]:
        domain_scores: Dict[str, float] = {d: 0.05 for d in self.DOMAIN_KEYWORDS.keys()}

        # 1. Score from extracted skills (Weight: 45%)
        for skill in extracted_skills:
            for domain, keywords in self.DOMAIN_KEYWORDS.items():
                if any(kw in skill.name.lower() or kw in skill.domain.lower() for kw in keywords):
                    domain_scores[domain] += 1.8 * (skill.score / 100.0)

        # 2. Score from projects (Weight: 35%)
        for proj in projects:
            p_text = f"{proj.title} {proj.description} {' '.join(proj.technologies)}".lower()
            for domain, keywords in self.DOMAIN_KEYWORDS.items():
                match_count = sum(1 for kw in keywords if re.search(rf"\b{re.escape(kw)}\b", p_text))
                domain_scores[domain] += match_count * 1.5

        # 3. Score from full text keywords (Weight: 20%)
        lower_full = full_text.lower()
        for domain, keywords in self.DOMAIN_KEYWORDS.items():
            for kw in keywords:
                if re.search(rf"\b{re.escape(kw)}\b", lower_full):
                    domain_scores[domain] += 0.4

        # Normalize domain confidences to sum to 1.0 (or realistic probabilities)
        max_score = max(domain_scores.values())
        if max_score > 0:
            normalized = {
                domain: round(min(0.98, max(0.04, score / max_score)), 2)
                for domain, score in domain_scores.items()
            }
        else:
            normalized = {domain: 0.1 for domain in self.DOMAIN_KEYWORDS.keys()}

        # Rank domains
        sorted_domains = sorted(normalized.items(), key=lambda x: x[1], reverse=True)
        primary_domain = sorted_domains[0][0]
        secondary_domains = [d[0] for d in sorted_domains[1:4] if d[1] >= 0.4]

        return normalized, primary_domain, secondary_domains
