import math
import re
from typing import List, Dict

class EmbeddingService:
    """
    Computes semantic similarity between candidate profile vectors and career role descriptions.
    Uses sentence-transformers if installed, with a high-performance normalized token-vector fallback.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = None
        try:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer(model_name)
        except Exception:
            self.model = None

    def compute_similarity(self, text_a: str, text_b: str) -> float:
        if not text_a or not text_b:
            return 0.5

        if self.model is not None:
            try:
                emb1 = self.model.encode(text_a, convert_to_tensor=True)
                emb2 = self.model.encode(text_b, convert_to_tensor=True)
                from sentence_transformers import util
                cosine = util.cos_sim(emb1, emb2).item()
                return max(0.0, min(1.0, float(cosine)))
            except Exception:
                pass

        # Fallback: Normalized Cosine Term Overlap Similarity
        words_a = re.findall(r"\b\w{3,}\b", text_a.lower())
        words_b = re.findall(r"\b\w{3,}\b", text_b.lower())

        vec_a: Dict[str, int] = {}
        for w in words_a:
            vec_a[w] = vec_a.get(w, 0) + 1

        vec_b: Dict[str, int] = {}
        for w in words_b:
            vec_b[w] = vec_b.get(w, 0) + 1

        common_keys = set(vec_a.keys()) & set(vec_b.keys())
        dot_product = sum(vec_a[k] * vec_b[k] for k in common_keys)
        mag_a = math.sqrt(sum(v * v for v in vec_a.values()))
        mag_b = math.sqrt(sum(v * v for v in vec_b.values()))

        if mag_a == 0 or mag_b == 0:
            return 0.0

        raw_sim = dot_product / (mag_a * mag_b)
        return round(min(1.0, max(0.0, raw_sim)), 2)

    def calculate_similarity(self, text_a: str, text_b: str) -> float:
        return self.compute_similarity(text_a, text_b)
