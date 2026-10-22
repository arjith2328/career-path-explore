from fastapi import APIRouter
from backend.intelligence.career_matcher import CareerMatcher
from backend.intelligence.embeddings import EmbeddingService
from backend.intelligence.career_path import CareerPathEngine

router = APIRouter(prefix="/api/career", tags=["Career Intelligence"])

embedding_service = EmbeddingService()
career_matcher = CareerMatcher(embedding_service)
path_engine = CareerPathEngine()

@router.get("/roles")
def get_all_career_roles():
    return {
        "success": True,
        "count": len(career_matcher.roles),
        "roles": career_matcher.roles
    }

@router.get("/graph/{domain}")
def get_career_graph_by_domain(domain: str):
    pathway = path_engine.pathways.get(domain)
    if not pathway:
        return {"success": False, "message": f"No career graph found for domain '{domain}'"}
    return {
        "success": True,
        "domain": domain,
        "pathway": pathway
    }
