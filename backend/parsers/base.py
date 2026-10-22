from abc import ABC, abstractmethod
import io

class BaseParser(ABC):
    @abstractmethod
    def parse(self, file_bytes: bytes, filename: str) -> str:
        """Extracts clean text from document bytes."""
        pass
