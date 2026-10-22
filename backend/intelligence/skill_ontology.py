import json
import os
from typing import Dict, List, Any, Optional

class SkillOntologyEngine:
    """
    Manages skills ontology, canonical naming, alias lookup, and domain association.
    """

    def __init__(self, data_path: Optional[str] = None):
        if not data_path:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            data_path = os.path.join(base_dir, "data", "skills.json")

        self.data_path = data_path
        self.skills_data = self._load_data()
        self.alias_to_canonical = self._build_alias_map()

    def _load_data(self) -> Dict[str, Any]:
        if os.path.exists(self.data_path):
            with open(self.data_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {"skills": []}

    def _build_alias_map(self) -> Dict[str, str]:
        mapping = {}
        for s in self.skills_data.get("skills", []):
            canonical = s["name"]
            mapping[canonical.lower()] = canonical
            for alias in s.get("aliases", []):
                mapping[alias.lower()] = canonical
        return mapping

    def normalize(self, skill_name: str) -> str:
        return self.alias_to_canonical.get(skill_name.lower().strip(), skill_name.strip())

    def get_skill(self, canonical_name: str) -> Optional[Dict[str, Any]]:
        for s in self.skills_data.get("skills", []):
            if s["name"].lower() == canonical_name.lower():
                return s
        return None

    def get_all_skills(self) -> List[Dict[str, Any]]:
        return self.skills_data.get("skills", [])
