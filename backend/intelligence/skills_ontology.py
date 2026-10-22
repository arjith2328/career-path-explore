import re
from typing import List, Dict, Tuple, Optional, Any
from backend.schemas.models import SkillEvidence, SkillCategoryGroup

SKILL_ONTOLOGY: Dict[str, Dict[str, Any]] = {
    # 1. AI & Machine Learning
    "PyTorch": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["pytorch", "torch", "pytorch framework", "torchvision", "torchaudio"],
        "benchmark": 85,
    },
    "TensorFlow": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["tensorflow", "tf2", "keras"],
        "benchmark": 80,
    },
    "Machine Learning": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["machine learning", "supervised learning", "unsupervised learning", "scikit-learn", "sklearn", "random forest", "xgboost", "gradient boosting"],
        "benchmark": 88,
    },
    "Deep Learning": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["deep learning", "neural networks", "neural net", "transformer", "llm", "transformers", "bert", "gpt", "lstm", "rnn"],
        "benchmark": 84,
    },
    "Computer Vision": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["computer vision", "opencv", "object detection", "image segmentation", "yolo", "image processing"],
        "benchmark": 80,
    },
    "NLP": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["nlp", "natural language processing", "spacy", "huggingface", "tokenization", "word embeddings", "nlu"],
        "benchmark": 78,
    },
    "Model Optimization & ONNX": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["onnx", "tensorrt", "quantization", "model optimization", "int8", "pruning", "tflite", "model compression"],
        "benchmark": 75,
    },
    "MLOps": {
        "domain": "AI & Machine Learning",
        "category": "AI / ML",
        "aliases": ["mlops", "mlflow", "kubeflow", "weights & biases", "wandb", "dvc", "model registry", "feast", "model monitoring", "drift detection"],
        "benchmark": 80,
    },

    # 2. Software Engineering & Programming
    "Python": {
        "domain": "Software Engineering",
        "category": "Programming",
        "aliases": ["python", "python3", "python 3", "asyncio", "fastapi", "django", "flask", "pydantic"],
        "benchmark": 88,
    },
    "JavaScript & TypeScript": {
        "domain": "Software Engineering",
        "category": "Programming",
        "aliases": ["javascript", "typescript", "es6", "nodejs", "node.js", "node js", "npm"],
        "benchmark": 86,
    },
    "React": {
        "domain": "Software Engineering",
        "category": "Software Engineering",
        "aliases": ["react", "reactjs", "react.js", "next.js", "nextjs", "redux", "zustand"],
        "benchmark": 85,
    },
    "C / C++": {
        "domain": "Software Engineering",
        "category": "Programming",
        "aliases": ["c++", "cpp", "c/c++", "c99", "c11", "c++14", "c++17", "c++20", "gcc compiler", "clang", "cmake", "c programming language"],
        "benchmark": 82,
    },
    "Go (Golang)": {
        "domain": "Software Engineering",
        "category": "Programming",
        "aliases": ["golang", "go language", "goroutines"],
        "benchmark": 75,
    },
    "Rust": {
        "domain": "Software Engineering",
        "category": "Programming",
        "aliases": ["rust-lang", "cargo build", "tokio", "memory safety rust"],
        "benchmark": 70,
    },
    "System Design": {
        "domain": "Software Engineering",
        "category": "Software Engineering",
        "aliases": ["system design", "distributed systems", "microservices", "system architecture", "rest api", "grpc", "caching", "redis"],
        "benchmark": 84,
    },
    "CI/CD Pipelines": {
        "domain": "Software Engineering",
        "category": "Software Engineering",
        "aliases": ["ci/cd", "github actions", "gitlab ci", "jenkins", "circleci", "continuous integration", "continuous deployment"],
        "benchmark": 82,
    },

    # 3. Data Engineering & Analytics
    "SQL & PostgreSQL": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["sql", "postgresql", "postgres", "mysql", "sqlite", "relational database", "query optimization", "database indexing"],
        "benchmark": 82,
    },
    "Pandas & NumPy": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["pandas", "numpy", "scipy", "data analysis", "dataframe", "data wrangling"],
        "benchmark": 84,
    },
    "Apache Spark": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["apache spark", "spark", "pyspark", "hadoop", "databricks", "mapreduce"],
        "benchmark": 78,
    },
    "Kafka & Stream Processing": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["apache kafka", "kafka", "event streaming", "apache flink", "rabbitmq", "pubsub", "stream processing"],
        "benchmark": 75,
    },
    "Data Warehousing": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["snowflake", "bigquery", "redshift", "data warehouse", "dbt", "etl pipeline", "elt pipeline", "data pipeline", "star schema"],
        "benchmark": 78,
    },
    "Statistical Modeling": {
        "domain": "Data Engineering & Science",
        "category": "Data",
        "aliases": ["statistical modeling", "a/b testing", "hypothesis testing", "linear regression", "time series analysis", "arima", "anova"],
        "benchmark": 76,
    },

    # 4. Cloud & DevOps
    "AWS Cloud Services": {
        "domain": "Cloud & DevOps",
        "category": "Cloud",
        "aliases": ["aws", "amazon web services", "ec2", "s3 bucket", "rds", "aws lambda", "eks", "cloudwatch", "aws sqs"],
        "benchmark": 82,
    },
    "Docker Containerization": {
        "domain": "Cloud & DevOps",
        "category": "Cloud",
        "aliases": ["docker", "containerization", "dockerfile", "docker-compose", "multi-stage build", "containerized"],
        "benchmark": 85,
    },
    "Kubernetes": {
        "domain": "Cloud & DevOps",
        "category": "Cloud",
        "aliases": ["kubernetes", "k8s", "helm charts", "kubectl", "k8s cluster", "ingress controller"],
        "benchmark": 78,
    },
    "Terraform & IaC": {
        "domain": "Cloud & DevOps",
        "category": "Cloud",
        "aliases": ["terraform", "iac", "infrastructure as code", "cloudformation", "ansible", "pulumi"],
        "benchmark": 75,
    },

    # 5. Embedded Systems & Hardware
    "Embedded C": {
        "domain": "Embedded Systems",
        "category": "Embedded Systems",
        "aliases": ["embedded c", "embedded c programming", "bare-metal c", "firmware c", "c for embedded", "bare-metal embedded c"],
        "benchmark": 84,
    },
    "ARM Cortex Microcontrollers": {
        "domain": "Embedded Systems",
        "category": "Embedded Systems",
        "aliases": ["arm cortex", "cortex-m", "cortex-m4", "cortex-m7", "stm32", "microcontroller", "mcu", "esp32", "pic microcontroller", "nordic nrf"],
        "benchmark": 80,
    },
    "FreeRTOS & RTOS": {
        "domain": "Embedded Systems",
        "category": "Embedded Systems",
        "aliases": ["freertos", "rtos", "real-time operating system", "zephyr rtos", "vxworks", "threadx", "task scheduling", "rtos mutex", "rtos semaphore"],
        "benchmark": 78,
    },
    "Hardware Protocols (I2C/SPI/UART/CAN)": {
        "domain": "Embedded Systems",
        "category": "Embedded Systems",
        "aliases": ["i2c", "spi", "uart", "can bus", "can protocol", "rs485", "gpio", "dma controller", "adc", "dac", "pwm", "serial communication", "modbus"],
        "benchmark": 82,
    },
    "Edge AI & Embedded Inference": {
        "domain": "Embedded Systems",
        "category": "Embedded Systems",
        "aliases": ["tflite micro", "tinyml", "edge ai", "npu", "embedded vision", "edge inference", "microtvm"],
        "benchmark": 74,
    },
    "PCB Design & Altium": {
        "domain": "Electronics",
        "category": "Electronics",
        "aliases": ["altium", "kicad", "pcb design", "pcb layout", "schematic capture", "orcad", "eagle pcb", "gerber files"],
        "benchmark": 76,
    },
    "Hardware Debugging & Oscilloscope": {
        "domain": "Hardware Engineering",
        "category": "Hardware",
        "aliases": ["digital oscilloscope", "oscilloscope", "logic analyzer", "multimeter", "jtag", "swd", "soldering", "hardware debugging", "spectrum analyzer"],
        "benchmark": 80,
    },
    "FPGA & Verilog / VHDL": {
        "domain": "Hardware Engineering",
        "category": "Hardware",
        "aliases": ["fpga", "verilog", "vhdl", "systemverilog", "vivado", "quartus", "rtl design", "xilinx", "altera fpga"],
        "benchmark": 72,
    },

    # 6. Robotics & Mechanical
    "ROS / ROS2": {
        "domain": "Robotics",
        "category": "Robotics",
        "aliases": ["ros", "ros2", "robot operating system", "moveit", "gazebo simulation", "rviz", "nav2"],
        "benchmark": 78,
    },
    "Robotics Kinematics & Motion Planning": {
        "domain": "Robotics",
        "category": "Robotics",
        "aliases": ["kinematics", "motion planning", "slam", "lidar", "autonomous navigation", "path planning", "trajectory generation", "actuators", "pid control"],
        "benchmark": 75,
    },
    "CAD Design (SolidWorks / Fusion360)": {
        "domain": "Mechanical Engineering",
        "category": "Mechanical",
        "aliases": ["solidworks", "fusion 360", "autocad", "catia", "cad modeling", "finite element analysis", "fea", "ansys", "gd&t", "3d cad", "dfm"],
        "benchmark": 78,
    },

    # 7. Cybersecurity
    "Network Security & Threat Analysis": {
        "domain": "Cybersecurity",
        "category": "Cybersecurity",
        "aliases": ["penetration testing", "cybersecurity", "vulnerability assessment", "wireshark", "siem", "soc analysis", "threat modeling", "owasp", "kali linux", "firewall rules"],
        "benchmark": 78,
    },
    "IAM & Cryptography": {
        "domain": "Cybersecurity",
        "category": "Cybersecurity",
        "aliases": ["identity and access management", "oauth2", "jwt", "tls", "cryptography", "pki", "soc2", "zero trust", "ssl/tls", "public key encryption"],
        "benchmark": 80,
    },

    # 8. Leadership & System Engineering
    "Technical Architecture & RFCs": {
        "domain": "Software Engineering",
        "category": "Leadership",
        "aliases": ["rfc document", "architecture review", "technical roadmap", "system architecture document", "design doc"],
        "benchmark": 82,
    },
    "Mentorship & Team Leadership": {
        "domain": "Software Engineering",
        "category": "Leadership",
        "aliases": ["technical mentorship", "code reviews", "team lead", "sprint planning", "scrum", "agile leadership", "engineering management"],
        "benchmark": 85,
    }
}

class SkillOntologyEngine:
    def extract_skills(self, text: str) -> List[SkillEvidence]:
        detected_skills: List[SkillEvidence] = []
        sentences = [s.strip() for s in re.split(r'[.\n\r;•\-\*]', text) if len(s.strip()) > 8]
        lower_text = text.lower()

        for canonical_name, spec in SKILL_ONTOLOGY.items():
            # Build search patterns with aliases
            aliases = spec.get("aliases", [])
            all_patterns = [canonical_name.lower()] + [a.lower() for a in aliases]
            
            # Sort by length descending so longer phrases match first
            all_patterns.sort(key=len, reverse=True)
            escaped_patterns = [re.escape(p) for p in all_patterns]
            
            # Use regex word boundaries
            regex_str = r'(?<![a-zA-Z0-9_])(' + '|'.join(escaped_patterns) + r')(?![a-zA-Z0-9_])'
            pattern = re.compile(regex_str, re.IGNORECASE)

            match = pattern.search(lower_text)
            if match:
                # Find matching sentence for real source citation
                best_quote = None
                for sent in sentences:
                    if pattern.search(sent.lower()):
                        best_quote = sent[:180]
                        break

                matches_count = len(pattern.findall(lower_text))
                # Deterministic scoring: base score + occurrence multiplier
                score = min(96, max(68, 70 + matches_count * 5))
                status = "Strong" if score >= 80 else "Developing"
                confidence = "High" if matches_count >= 2 or (best_quote and len(best_quote) > 30) else "Medium"
                years = round(min(10.0, 1.0 + matches_count * 0.7), 1)

                quote_text = best_quote or f"Detected references to {canonical_name} in uploaded document."
                conf_score = round(min(0.98, max(0.70, 0.75 + matches_count * 0.08)), 2)

                detected_skills.append(
                    SkillEvidence(
                        id=f"skill-{len(detected_skills) + 1}",
                        name=canonical_name,
                        category=spec["category"],
                        domain=spec["domain"],
                        status=status,
                        evidenceType="Explicitly Detected",
                        confidence=confidence,
                        confidenceScore=conf_score,
                        score=score,
                        yearsOfExperience=years,
                        sourceQuote=quote_text,
                        evidence=quote_text,
                        contextSnippet=spec["domain"]
                    )
                )

        # Sort by score descending
        detected_skills.sort(key=lambda s: s.score, reverse=True)
        return detected_skills

    def group_skills_by_category(self, skills: List[SkillEvidence]) -> List[SkillCategoryGroup]:
        groups_dict: Dict[str, List[SkillEvidence]] = {}
        for s in skills:
            cat = s.category
            if cat not in groups_dict:
                groups_dict[cat] = []
            groups_dict[cat].append(s)

        result = []
        for idx, (cat_name, cat_skills) in enumerate(groups_dict.items()):
            strong_c = len([s for s in cat_skills if s.status == "Strong"])
            dev_c = len([s for s in cat_skills if s.status == "Developing"])
            miss_c = max(0, 5 - len(cat_skills))
            avg_score = int(sum(s.score for s in cat_skills) / len(cat_skills)) if cat_skills else 50
            primary_domain = cat_skills[0].domain if cat_skills else "Software Engineering"

            result.append(
                SkillCategoryGroup(
                    id=f"cat-{idx+1}",
                    name=cat_name,
                    domain=primary_domain,
                    skills=cat_skills,
                    strongCount=strong_c,
                    developingCount=dev_c,
                    missingCount=miss_c,
                    overallCoverage=min(95, avg_score)
                )
            )

        return result
