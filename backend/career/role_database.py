from typing import List, Dict, Any

CAREER_ROLES_DB: List[Dict[str, Any]] = [
    # 1. AI & Machine Learning
    {
        "id": "ai-ml-engineer",
        "title": "AI / ML Engineer",
        "domain": "AI & Machine Learning",
        "description": "Develop and deploy deep learning models, vision/NLP pipelines, and low-latency inference services.",
        "requiredSkills": ["Python", "PyTorch", "Machine Learning", "Deep Learning", "Docker Containerization", "MLOps"],
        "preferredSkills": ["Computer Vision", "Model Optimization & ONNX", "AWS Cloud Services", "System Design"],
        "experienceRange": "3 - 6 Years",
        "educationSignals": ["Computer Science", "Artificial Intelligence", "Electrical Engineering", "Mathematics"],
        "projectSignals": ["model deployment", "inference", "training", "quantization", "neural network", "transformer"],
        "salaryRange": {"min": "$165k", "median": "$195k", "max": "$235k"},
        "marketDemand": "Very High",
        "nextRoles": ["Senior AI/ML Engineer", "AI Architect"],
        "adjacentRoles": ["MLOps Engineer", "Data Scientist", "Edge AI Engineer"]
    },
    {
        "id": "machine-learning-engineer",
        "title": "Machine Learning Engineer",
        "domain": "AI & Machine Learning",
        "description": "Architect predictive machine learning pipelines, feature stores, and automated training suites.",
        "requiredSkills": ["Python", "Machine Learning", "SQL & PostgreSQL", "Pandas & NumPy", "CI/CD Pipelines"],
        "preferredSkills": ["PyTorch", "Docker Containerization", "AWS Cloud Services"],
        "experienceRange": "2 - 5 Years",
        "educationSignals": ["Computer Science", "Data Science", "Statistics", "Software Engineering"],
        "projectSignals": ["classifier", "cross-validation", "feature engineering", "predictive model", "scikit-learn"],
        "salaryRange": {"min": "$150k", "median": "$180k", "max": "$215k"},
        "marketDemand": "Very High",
        "nextRoles": ["AI / ML Engineer", "Lead ML Engineer"],
        "adjacentRoles": ["Data Scientist", "Data Engineer"]
    },
    {
        "id": "ai-architect",
        "title": "AI Architect",
        "domain": "AI & Machine Learning",
        "description": "Design org-wide enterprise AI platforms, distributed training clusters, and technical governance.",
        "requiredSkills": ["System Design", "PyTorch", "AWS Cloud Services", "Technical Architecture & RFCs", "MLOps"],
        "preferredSkills": ["Kubernetes", "Deep Learning", "Mentorship & Team Leadership"],
        "experienceRange": "8+ Years",
        "educationSignals": ["Computer Science", "Distributed Systems", "AI"],
        "projectSignals": ["distributed training", "enterprise governance", "platform architecture"],
        "salaryRange": {"min": "$240k", "median": "$295k", "max": "$360k"},
        "marketDemand": "High",
        "nextRoles": ["VP of AI", "Fellow"],
        "adjacentRoles": ["Principal Engineer", "Cloud Architect"]
    },

    # 2. Embedded Systems & Edge Computing
    {
        "id": "embedded-systems-engineer",
        "title": "Embedded Systems Engineer",
        "domain": "Embedded Systems",
        "description": "Develop low-level bare-metal firmware, FreeRTOS drivers, and microcontroller communication protocols.",
        "requiredSkills": ["Embedded C", "ARM Cortex Microcontrollers", "FreeRTOS & RTOS", "Hardware Protocols (I2C/SPI/UART/CAN)"],
        "preferredSkills": ["Hardware Debugging & Oscilloscope", "Edge AI & Embedded Inference", "Python", "C / C++"],
        "experienceRange": "2 - 6 Years",
        "educationSignals": ["Electrical Engineering", "Computer Engineering", "Electronics", "Embedded Systems"],
        "projectSignals": ["stm32", "microcontroller", "dma", "bare-metal", "device driver", "sensor", "firmware"],
        "salaryRange": {"min": "$135k", "median": "$165k", "max": "$200k"},
        "marketDemand": "Very High",
        "nextRoles": ["Senior Embedded Engineer", "Embedded Systems Architect"],
        "adjacentRoles": ["Edge AI Engineer", "Robotics Engineer", "Hardware Design Engineer"]
    },
    {
        "id": "edge-ai-engineer",
        "title": "Edge AI & Perception Engineer",
        "domain": "Embedded Systems",
        "description": "Deploy quantized deep learning and computer vision models on resource-constrained embedded microcontrollers.",
        "requiredSkills": ["Embedded C", "ARM Cortex Microcontrollers", "Edge AI & Embedded Inference", "PyTorch", "Model Optimization & ONNX"],
        "preferredSkills": ["FreeRTOS & RTOS", "Computer Vision", "Python", "C / C++"],
        "experienceRange": "3 - 7 Years",
        "educationSignals": ["Computer Engineering", "Electrical Engineering", "Robotics", "AI"],
        "projectSignals": ["tflite", "quantization", "embedded ai", "edge inference", "mcu perception", "tinyml"],
        "salaryRange": {"min": "$160k", "median": "$190k", "max": "$230k"},
        "marketDemand": "High",
        "nextRoles": ["Embedded AI Architect", "Principal Robotics Engineer"],
        "adjacentRoles": ["Embedded Systems Engineer", "AI / ML Engineer", "Robotics Engineer"]
    },

    # 3. Data Engineering & Analytics
    {
        "id": "data-engineer",
        "title": "Data Engineer",
        "domain": "Data Engineering & Science",
        "description": "Build high-throughput ingestion pipelines, distributed Spark transformations, and analytical data warehouses.",
        "requiredSkills": ["Python", "SQL & PostgreSQL", "Apache Spark", "Kafka & Stream Processing", "Data Warehousing"],
        "preferredSkills": ["AWS Cloud Services", "Docker Containerization", "CI/CD Pipelines"],
        "experienceRange": "3 - 6 Years",
        "educationSignals": ["Computer Science", "Information Systems", "Data Analytics"],
        "projectSignals": ["etl", "pipeline", "spark", "kafka", "warehouse", "ingestion", "dbt", "snowflake"],
        "salaryRange": {"min": "$145k", "median": "$175k", "max": "$210k"},
        "marketDemand": "High",
        "nextRoles": ["Senior Data Engineer", "Data Architect"],
        "adjacentRoles": ["Data Scientist", "Cloud Engineer", "Machine Learning Engineer"]
    },
    {
        "id": "data-scientist",
        "title": "Data Scientist",
        "domain": "Data Engineering & Science",
        "description": "Perform statistical hypothesis testing, predictive analytics, and business intelligence attribution.",
        "requiredSkills": ["Python", "Pandas & NumPy", "SQL & PostgreSQL", "Statistical Modeling", "Machine Learning"],
        "preferredSkills": ["Data Warehousing", "CI/CD Pipelines"],
        "experienceRange": "2 - 5 Years",
        "educationSignals": ["Statistics", "Mathematics", "Data Science", "Economics", "Computer Science"],
        "projectSignals": ["statistical model", "a/b test", "hypothesis", "predictive analytics", "regression", "scipy"],
        "salaryRange": {"min": "$140k", "median": "$170k", "max": "$205k"},
        "marketDemand": "High",
        "nextRoles": ["Lead Data Scientist", "Analytics Director"],
        "adjacentRoles": ["Machine Learning Engineer", "Data Engineer"]
    },

    # 4. Software Engineering
    {
        "id": "senior-software-engineer",
        "title": "Senior Software Engineer",
        "domain": "Software Engineering",
        "description": "Own critical backend microservices, lead system architecture RFCs, and maintain code reliability standards.",
        "requiredSkills": ["Python", "System Design", "CI/CD Pipelines", "SQL & PostgreSQL", "AWS Cloud Services"],
        "preferredSkills": ["JavaScript & TypeScript", "React", "Docker Containerization", "Mentorship & Team Leadership"],
        "experienceRange": "4 - 7 Years",
        "educationSignals": ["Computer Science", "Software Engineering", "Computer Engineering"],
        "projectSignals": ["microservice", "backend", "system design", "sla", "rfc", "fastapi", "rest api"],
        "salaryRange": {"min": "$155k", "median": "$185k", "max": "$220k"},
        "marketDemand": "Very High",
        "nextRoles": ["Staff Engineer", "Technical Lead", "Engineering Manager"],
        "adjacentRoles": ["AI / ML Engineer", "Cloud Engineer", "Data Engineer"]
    },
    {
        "id": "staff-engineer",
        "title": "Staff Engineer",
        "domain": "Software Engineering",
        "description": "Drive org-wide architectural patterns, de-risk multi-quarter technical initiatives, and mentor senior engineers.",
        "requiredSkills": ["System Design", "Technical Architecture & RFCs", "Mentorship & Team Leadership", "AWS Cloud Services"],
        "preferredSkills": ["Kubernetes", "CI/CD Pipelines", "Python"],
        "experienceRange": "8+ Years",
        "educationSignals": ["Computer Science", "Engineering"],
        "projectSignals": ["architecture standard", "org-wide", "rfc proposal", "multi-tenant"],
        "salaryRange": {"min": "$220k", "median": "$270k", "max": "$330k"},
        "marketDemand": "High",
        "nextRoles": ["Principal Engineer", "Director of Engineering"],
        "adjacentRoles": ["AI Architect", "Engineering Manager"]
    },

    # 5. Cloud & DevOps
    {
        "id": "cloud-engineer",
        "title": "Cloud & DevOps Engineer",
        "domain": "Cloud & DevOps",
        "description": "Architect resilient multi-region cloud infrastructure, container orchestration, and automated CI/CD pipelines.",
        "requiredSkills": ["AWS Cloud Services", "Docker Containerization", "Kubernetes", "CI/CD Pipelines", "Terraform & IaC"],
        "preferredSkills": ["Python", "System Design"],
        "experienceRange": "3 - 6 Years",
        "educationSignals": ["Computer Science", "Information Technology", "Cloud Computing"],
        "projectSignals": ["terraform", "kubernetes", "aws", "infrastructure as code", "ci/cd", "helm", "dockerfile"],
        "salaryRange": {"min": "$145k", "median": "$175k", "max": "$215k"},
        "marketDemand": "Very High",
        "nextRoles": ["Senior Cloud Architect", "Platform Lead"],
        "adjacentRoles": ["MLOps Engineer", "Site Reliability Engineer", "Senior Software Engineer"]
    },
    {
        "id": "mlops-engineer",
        "title": "MLOps Engineer",
        "domain": "Cloud & DevOps",
        "description": "Bridge data science and cloud platform engineering with model registries, automated inference, and drift monitoring.",
        "requiredSkills": ["MLOps", "Docker Containerization", "Kubernetes", "Python", "AWS Cloud Services", "CI/CD Pipelines"],
        "preferredSkills": ["PyTorch", "Terraform & IaC", "System Design"],
        "experienceRange": "3 - 7 Years",
        "educationSignals": ["Computer Science", "Cloud Engineering", "Data Engineering"],
        "projectSignals": ["mlops", "model registry", "drift telemetry", "kubeflow", "mlflow"],
        "salaryRange": {"min": "$160k", "median": "$190k", "max": "$230k"},
        "marketDemand": "Very High",
        "nextRoles": ["Lead MLOps Architect", "Head of Platform"],
        "adjacentRoles": ["AI / ML Engineer", "Cloud Engineer"]
    },

    # 6. Robotics
    {
        "id": "robotics-engineer",
        "title": "Robotics Software Engineer",
        "domain": "Robotics",
        "description": "Design real-time motion planning algorithms, sensor fusion loops, and autonomous navigation with ROS2.",
        "requiredSkills": ["C / C++", "ROS / ROS2", "Robotics Kinematics & Motion Planning", "Python"],
        "preferredSkills": ["ARM Cortex Microcontrollers", "Computer Vision", "Hardware Protocols (I2C/SPI/UART/CAN)"],
        "experienceRange": "2 - 6 Years",
        "educationSignals": ["Robotics", "Mechatronics", "Mechanical Engineering", "Electrical Engineering"],
        "projectSignals": ["ros", "ros2", "slam", "motion planning", "autonomous robot", "gazebo"],
        "salaryRange": {"min": "$145k", "median": "$175k", "max": "$215k"},
        "marketDemand": "High",
        "nextRoles": ["Senior Robotics Engineer", "Robotics Architect"],
        "adjacentRoles": ["Embedded Systems Engineer", "Edge AI Engineer"]
    },

    # 7. Hardware & Electronics Engineering
    {
        "id": "hardware-electronics-engineer",
        "title": "Hardware & PCB Design Engineer",
        "domain": "Hardware Engineering",
        "description": "Design multi-layer high-speed PCB layouts, schematic captures, signal integrity testing, and FPGA integrations.",
        "requiredSkills": ["PCB Design & Altium", "Hardware Debugging & Oscilloscope", "Hardware Protocols (I2C/SPI/UART/CAN)", "FPGA & Verilog / VHDL"],
        "preferredSkills": ["ARM Cortex Microcontrollers", "Embedded C"],
        "experienceRange": "3 - 7 Years",
        "educationSignals": ["Electrical Engineering", "Electronics Engineering", "Hardware Engineering"],
        "projectSignals": ["altium", "kicad", "pcb", "schematic", "oscilloscope", "fpga", "verilog"],
        "salaryRange": {"min": "$140k", "median": "$170k", "max": "$205k"},
        "marketDemand": "High",
        "nextRoles": ["Senior Hardware Architect", "Principal Hardware Engineer"],
        "adjacentRoles": ["Embedded Systems Engineer", "Robotics Engineer"]
    },

    # 8. Cybersecurity
    {
        "id": "cybersecurity-engineer",
        "title": "Cybersecurity & Infrastructure Engineer",
        "domain": "Cybersecurity",
        "description": "Implement zero-trust identity architectures, vulnerability assessment automation, and network threat defense.",
        "requiredSkills": ["Network Security & Threat Analysis", "IAM & Cryptography", "AWS Cloud Services", "Python"],
        "preferredSkills": ["Docker Containerization", "CI/CD Pipelines"],
        "experienceRange": "3 - 6 Years",
        "educationSignals": ["Cybersecurity", "Computer Science", "Information Assurance"],
        "projectSignals": ["threat model", "soc2", "penetration testing", "vulnerability scan", "wireshark"],
        "salaryRange": {"min": "$150k", "median": "$180k", "max": "$220k"},
        "marketDemand": "Very High",
        "nextRoles": ["Security Architect", "CISO"],
        "adjacentRoles": ["Cloud Engineer", "Senior Software Engineer"]
    },

    # 9. Mechanical & CAD Engineering
    {
        "id": "mechanical-design-engineer",
        "title": "Mechanical Design & Simulation Engineer",
        "domain": "Mechanical Engineering",
        "description": "Engineer complex electromechanical enclosures, finite element stress analysis (FEA), and DFM manufacturing workflows.",
        "requiredSkills": ["CAD Design (SolidWorks / Fusion360)", "Robotics Kinematics & Motion Planning", "Hardware Debugging & Oscilloscope"],
        "preferredSkills": ["PCB Design & Altium", "Python"],
        "experienceRange": "2 - 6 Years",
        "educationSignals": ["Mechanical Engineering", "Mechatronics", "Aerospace Engineering"],
        "projectSignals": ["solidworks", "cad", "fea", "stress analysis", "prototyping", "enclosure"],
        "salaryRange": {"min": "$130k", "median": "$160k", "max": "$195k"},
        "marketDemand": "Moderate",
        "nextRoles": ["Senior Mechanical Engineer", "Chief Mechanical Architect"],
        "adjacentRoles": ["Robotics Engineer", "Hardware & PCB Design Engineer"]
    }
]
