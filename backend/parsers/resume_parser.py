from typing import Tuple
from backend.parsers.pdf_parser import PDFParser
from backend.parsers.docx_parser import DOCXParser

class ResumeParser:
    def __init__(self):
        self.pdf_parser = PDFParser()
        self.docx_parser = DOCXParser()

    def parse_document(self, file_bytes: bytes, filename: str) -> str:
        lower_name = filename.lower()
        if lower_name.endswith('.pdf'):
            return self.pdf_parser.parse(file_bytes, filename)
        elif lower_name.endswith('.docx') or lower_name.endswith('.doc'):
            return self.docx_parser.parse(file_bytes, filename)
        elif lower_name.endswith('.txt'):
            txt = file_bytes.decode('utf-8', errors='ignore').strip()
            if not txt or len(txt) < 15:
                raise ValueError("NO_TEXT_EXTRACTED: No readable text was found in this document.")
            return txt
        else:
            raise ValueError("UNSUPPORTED_FILE_TYPE: Please upload a PDF or DOCX resume.")
