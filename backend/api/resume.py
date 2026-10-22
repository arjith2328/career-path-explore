import logging
import traceback
from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.resume_analysis import ResumeAnalysisService
from backend.schemas.models import AnalyzeResumeResponse

logger = logging.getLogger("ResumeAPI")
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

router = APIRouter(prefix="/api/resume", tags=["Resume Intelligence"])

# Initialize modular analysis service
analysis_service = ResumeAnalysisService()

SAMPLE_RESUMES = {
    "ai": {
        "filename": "Elena_Rostova_AI_ML_Resume.pdf",
        "text": """ELENA ROSTOVA
Email: elena.rostova@ai-research.io | Phone: +1 (415) 882-9012 | Location: San Francisco, CA
GitHub: github.com/erostova | LinkedIn: linkedin.com/in/elena-rostova

PROFESSIONAL SUMMARY
Senior Machine Learning Engineer with 5+ years of experience architecting and deploying deep learning models, computer vision systems, and low-latency inference pipelines with PyTorch and Docker.

EDUCATION
Master of Science in Artificial Intelligence
Stanford University | 2019 - 2021
Bachelor of Science in Computer Science
UC Berkeley | 2015 - 2019

EXPERIENCE
Senior ML Engineer | NeuralVision Systems | 2021 - Present
• Designed and trained high-accuracy object detection and computer vision architectures using PyTorch and OpenCV.
• Quantized neural models to ONNX and TensorRT, reducing inference latency by 42% on AWS EC2 GPU clusters.
• Implemented MLOps workflows with automated model registry, drift telemetry, and CI/CD pipelines.

Machine Learning Engineer | Apex AI Labs | 2019 - 2021
• Developed predictive machine learning models in Python using scikit-learn and Pandas.
• Automated feature stores and data preprocessing with SQL and Docker containers.

KEY PROJECTS
Real-Time Perception Engine
• Architected end-to-end vision inference pipeline with sub-30ms latency on multi-camera streams using PyTorch.
• Integrated Docker containerization and Kubernetes for automated horizontal pod scaling.

CERTIFICATIONS
• AWS Certified Machine Learning - Specialty
• NVIDIA Deep Learning Institute (DLI) Computer Vision Certificate
"""
    },
    "embedded": {
        "filename": "Vikram_Patel_Embedded_Systems.pdf",
        "text": """VIKRAM PATEL
Email: vikram.patel@embedded-core.com | Phone: +1 (512) 404-7718 | Location: Austin, TX

SUMMARY
Embedded Systems & Firmware Engineer with 6 years of hands-on experience in bare-metal Embedded C, ARM Cortex-M microcontrollers, FreeRTOS task scheduling, and hardware communication protocols.

EDUCATION
Bachelor of Science in Electrical Engineering
University of Texas at Austin | 2014 - 2018

WORK EXPERIENCE
Senior Firmware Engineer | Silicon Edge Technologies | 2021 - Present
• Engineered bare-metal Embedded C firmware drivers for ARM Cortex-M4 STM32 microcontrollers.
• Implemented low-power FreeRTOS real-time operating system task scheduling and inter-process communication.
• Configured hardware communication bus protocols including I2C, SPI, UART, and CAN bus for industrial sensor networks.
• Diagnosed signal integrity anomalies using digital oscilloscope, logic analyzer, and JTAG hardware debugging tools.

Embedded Systems Engineer | MicroControl Labs | 2018 - 2021
• Developed custom bootloaders and peripheral device drivers for IoT edge microcontrollers.
• Participated in PCB design schematic reviews with Altium and conducted hardware board bring-up.

NOTABLE PROJECTS
Autonomous Sensor Node Subsystem
• Built an ultra-low-power environmental monitoring node on STM32 MCU utilizing FreeRTOS and I2C sensors.
• Implemented DMA-driven SPI flash logging with power optimization routines.
"""
    },
    "data": {
        "filename": "Sarah_Jenkins_Data_Engineering.pdf",
        "text": """SARAH JENKINS
Email: sarah.jenkins@data-infra.net | Phone: +1 (206) 919-4821 | Location: Seattle, WA

SUMMARY
Staff Data Platform Engineer specializing in high-throughput distributed data pipelines, Apache Spark ETL architectures, lakehouse systems, and real-time Kafka streaming.

EDUCATION
Bachelor of Science in Computer Science & Applied Mathematics
University of Washington | 2016 - 2020

EXPERIENCE
Lead Data Engineer | CloudData Analytics | 2021 - Present
• Architected automated batch and streaming data pipelines processing 8TB+ daily telemetry using Apache Spark and PySpark.
• Implemented lakehouse data partitions with Delta Lake and dbt on AWS cloud architecture with S3 and EMR.
• Deployed real-time event streaming and change data capture with Apache Kafka and PostgreSQL.

Data Engineer | MetricStream Systems | 2020 - 2021
• Developed SQL database extraction pipelines and automated data quality checks with Apache Airflow.
• Containerized ETL microservices using Docker containers and orchestrated CI/CD delivery on GitHub Actions.

PROJECTS
Enterprise Lakehouse Migration
• Led zero-downtime data warehouse migration to Apache Iceberg format, decreasing query runtimes by 55%.
"""
    }
}

@router.post("/analyze", response_model=AnalyzeResumeResponse)
async def analyze_resume(file: UploadFile = File(...)):
    filename = file.filename or "resume.pdf"
    lower_name = filename.lower()
    
    # 1. Validate File Extension
    if not any(lower_name.endswith(ext) for ext in [".pdf", ".docx", ".doc", ".txt"]):
        logger.warning(f"[ResumeAPI] Rejected unsupported file: '{filename}'")
        raise HTTPException(
            status_code=400, 
            detail={
                "error": "UNSUPPORTED_FILE_TYPE",
                "message": "Please upload a PDF or DOCX resume."
            }
        )

    try:
        file_bytes = await file.read()
        file_size = len(file_bytes)

        # 2. Validate File Size
        if file_size == 0:
            logger.warning(f"[ResumeAPI] Uploaded file is empty: '{filename}'")
            raise HTTPException(
                status_code=400, 
                detail={
                    "error": "EMPTY_FILE",
                    "message": "The uploaded resume file is empty."
                }
            )

        if file_size > 25 * 1024 * 1024:
            logger.warning(f"[ResumeAPI] File size exceeds 25MB: '{filename}' ({file_size} bytes)")
            raise HTTPException(
                status_code=413,
                detail={
                    "error": "FILE_TOO_LARGE",
                    "message": "Resume file size exceeds the 25MB limit."
                }
            )

        logger.info(f"[ResumeAPI] Processing upload '{filename}' ({file_size} bytes)")
        
        # Execute Modular Intelligence Pipeline
        result = analysis_service.analyze_document(file_bytes, filename)
        return result

    except HTTPException:
        raise
    except ValueError as ve:
        logger.warning(f"[ResumeAPI] Text extraction failed: {str(ve)}")
        raise HTTPException(
            status_code=422,
            detail={
                "error": "NO_TEXT_EXTRACTED",
                "message": str(ve)
            }
        )
    except Exception as e:
        logger.error(f"[ResumeAPI] Unhandled error during analysis: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail={
                "error": "PROCESSING_ERROR",
                "message": "The resume intelligence engine encountered an unexpected error while processing this document."
            }
        )

@router.post("/sample/{sample_key}", response_model=AnalyzeResumeResponse)
async def analyze_sample_resume(sample_key: str):
    if sample_key not in SAMPLE_RESUMES:
        raise HTTPException(
            status_code=404,
            detail={
                "error": "SAMPLE_NOT_FOUND",
                "message": f"Sample candidate profile '{sample_key}' not found."
            }
        )

    sample = SAMPLE_RESUMES[sample_key]
    logger.info(f"[ResumeAPI] Running pipeline on sample candidate '{sample_key}' ({sample['filename']})")
    
    # Process sample text through the exact same deterministic pipeline
    result = analysis_service.analyze_text(sample["text"], sample["filename"], len(sample["text"].encode("utf-8")))
    return result
