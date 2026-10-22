import unittest
import os
import sys

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from parsers.pdf_parser import PDFParser
from services.resume_analysis import ResumeAnalysisService
from extraction.project_extractor import ProjectExtractor
from extraction.section_detector import SectionDetector


RESUME_EMBEDDED_TEXT = """
VIKRAM PATEL
vikram.patel@embedded-systems.io | Austin, TX

PROFESSIONAL SUMMARY
Embedded Systems Engineer with 5+ years of experience designing real-time firmware, device drivers, and microcontrollers.

EXPERIENCE
Firmware Engineer | Texas Instruments | Austin, TX
2021 - Present
- Developed ARM Cortex-M4 FreeRTOS drivers and low-power BLE firmware in C and C++.
- Implemented SPI, I2C, and UART communication protocols for IoT sensor telemetry.

Embedded Software Engineer | Silicon Labs | Austin, TX
2019 - 2021
- Created bootloaders and board support packages (BSP) for RTOS-based industrial controllers.
- Automated hardware-in-the-loop (HIL) test suites using Python.

EDUCATION
B.S. in Electrical and Computer Engineering | University of Texas at Austin, 2019

TECHNICAL SKILLS
Embedded C, C++, ARM Cortex, FreeRTOS, RTOS, Device Drivers, Microcontrollers, SPI, I2C, UART, BLE, Oscilloscopes, Git
"""

RESUME_FRONTEND_TEXT = """
SARAH JENKINS
sarah.jenkins@webdev.dev | San Francisco, CA

PROFESSIONAL SUMMARY
Senior Frontend Engineer with 4 years building high-performance web applications using React, TypeScript, and modern CSS architecture.

EXPERIENCE
Frontend Software Engineer | Stripe | San Francisco, CA
2022 - Present
- Architected responsive dashboards using React 18, TypeScript, TailwindCSS, and Next.js.
- Optimized bundle sizes by 40% and improved Core Web Vitals across merchant checkout flows.

UI Developer | Vercel | Remote
2020 - 2022
- Developed design system component library in React, Storybook, and CSS Modules.
- Integrated GraphQL and RESTful APIs with Zustand state management.

PROJECTS
DesignSystem Pro | React, TypeScript, Storybook
- Open-source component library with 2k GitHub stars and 100% accessible WCAG AA compliance.

EDUCATION
B.S. in Computer Science | UC Berkeley, 2020

TECHNICAL SKILLS
React, TypeScript, JavaScript, Next.js, HTML5, CSS3, TailwindCSS, Redux, Zustand, GraphQL, Webpack, Vite, Jest
"""


class TestPersonalization(unittest.TestCase):
    def setUp(self):
        self.service = ResumeAnalysisService()

    def test_arjith_pdf_no_hallucinated_projects(self):
        root_dir = os.path.abspath(os.path.join(backend_dir, ".."))
        pdf_path = os.path.join(root_dir, "ARJITH.pdf")
        if not os.path.exists(pdf_path):
            self.skipTest(f"ARJITH.pdf not found at {pdf_path}")

        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()

        result = self.service.analyze_document(pdf_bytes, "ARJITH.pdf")

        # 1. Candidate Name
        self.assertIn("ARJITH", result.candidateProfile.candidateName.upper())

        # 2. Strict Project Extraction: ARJITH.pdf has NO project section
        self.assertEqual(len(result.candidateProfile.projects), 0, "ARJITH.pdf should have 0 projects because no project section exists.")

        # 3. Domain Detection
        self.assertIn("AI & Machine Learning", result.candidateProfile.detectedDomain)

        # 4. Top Matches
        top_match = result.careerMatches[0]
        self.assertTrue(
            "Machine Learning" in top_match.roleTitle or "AI" in top_match.roleTitle or "Data" in top_match.roleTitle,
            f"Expected ML/AI top match, got: {top_match.roleTitle}"
        )

        # 5. Roadmap is populated with personalized steps
        self.assertTrue(len(result.candidateProfile.roadmap) > 0)
        self.assertTrue(any("Build" in step.actionType or "Skill" in step.actionType or "System" in step.actionType or "Deployment" in step.actionType for step in result.candidateProfile.roadmap))

    def test_cross_resume_differentiation(self):
        """Asserts that distinct candidate resumes produce completely distinct intelligence."""
        res_embedded = self.service.analyze_text(RESUME_EMBEDDED_TEXT, "vikram_embedded.pdf")
        res_frontend = self.service.analyze_text(RESUME_FRONTEND_TEXT, "sarah_frontend.pdf")

        # Names must be distinct
        self.assertNotEqual(res_embedded.candidateProfile.candidateName, res_frontend.candidateProfile.candidateName)
        self.assertEqual(res_embedded.candidateProfile.candidateName, "VIKRAM PATEL")
        self.assertEqual(res_frontend.candidateProfile.candidateName, "SARAH JENKINS")

        # Domains must be distinct
        self.assertNotEqual(res_embedded.candidateProfile.detectedDomain, res_frontend.candidateProfile.detectedDomain)
        self.assertIn("Embedded", res_embedded.candidateProfile.detectedDomain)
        self.assertIn("Frontend", res_frontend.candidateProfile.detectedDomain)

        # Skills must be distinct
        embedded_skill_names = {s.name for s in res_embedded.candidateProfile.skills}
        frontend_skill_names = {s.name for s in res_frontend.candidateProfile.skills}
        self.assertTrue(any("Embedded" in s or "ARM" in s or "FreeRTOS" in s for s in embedded_skill_names))
        self.assertTrue(any("React" in s or "TypeScript" in s or "CSS" in s for s in frontend_skill_names))
        self.assertFalse(embedded_skill_names.issubset(frontend_skill_names))

        # Top Career Match must be distinct
        top_embedded = res_embedded.careerMatches[0].roleTitle
        top_frontend = res_frontend.careerMatches[0].roleTitle
        self.assertNotEqual(top_embedded, top_frontend)
        self.assertTrue("Embedded" in top_embedded or "Firmware" in top_embedded or "Systems" in top_embedded)
        self.assertTrue("Frontend" in top_frontend or "Web" in top_frontend or "Full Stack" in top_frontend)

        # Projects section handling: Embedded has 0 projects, Frontend has 1 project
        self.assertEqual(len(res_embedded.candidateProfile.projects), 0)
        self.assertEqual(len(res_frontend.candidateProfile.projects), 1)
        self.assertEqual(res_frontend.candidateProfile.projects[0].title, "DesignSystem Pro")

        # Roadmaps must be distinct
        emb_roadmap_titles = [m.title for m in res_embedded.candidateProfile.roadmap]
        fe_roadmap_titles = [m.title for m in res_frontend.candidateProfile.roadmap]
        self.assertNotEqual(emb_roadmap_titles, fe_roadmap_titles)


if __name__ == "__main__":
    unittest.main()
