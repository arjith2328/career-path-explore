import io
import re
from backend.parsers.base import BaseParser

class PDFParser(BaseParser):
    def parse(self, file_bytes: bytes, filename: str = "document.pdf") -> str:
        text_chunks = []
        page_count = 0
        engine_used = "none"

        # 1. Primary extraction engine: PyMuPDF (fitz)
        try:
            import pymupdf
            doc = pymupdf.open(stream=file_bytes, filetype="pdf")
            page_count = len(doc)
            for page in doc:
                txt = page.get_text("text")
                if txt and txt.strip():
                    text_chunks.append(txt.strip())
            doc.close()
            if text_chunks:
                engine_used = "pymupdf"
        except ImportError:
            try:
                import fitz
                doc = fitz.open(stream=file_bytes, filetype="pdf")
                page_count = len(doc)
                for page in doc:
                    txt = page.get_text("text")
                    if txt and txt.strip():
                        text_chunks.append(txt.strip())
                doc.close()
                if text_chunks:
                    engine_used = "fitz"
            except Exception:
                pass
        except Exception:
            pass

        # 2. Secondary fallback engine: pypdf
        if not text_chunks:
            try:
                from pypdf import PdfReader
                reader = PdfReader(io.BytesIO(file_bytes))
                page_count = len(reader.pages)
                for page in reader.pages:
                    txt = page.extract_text()
                    if txt and txt.strip():
                        text_chunks.append(txt.strip())
                if text_chunks:
                    engine_used = "pypdf"
            except Exception as e:
                raise ValueError(f"Failed to parse PDF document '{filename}': {str(e)}")

        full_text = "\n\n".join(text_chunks).strip()
        
        # Clean control characters while preserving formatting & structure
        cleaned_text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', full_text)
        cleaned_text = re.sub(r'\n{3,}', '\n\n', cleaned_text).strip()

        if not cleaned_text or len(cleaned_text.strip()) < 15:
            raise ValueError(
                "NO_TEXT_EXTRACTED: No readable text was found in this resume. "
                "The PDF may be scanned, image-based, or password-protected."
            )

        return cleaned_text
