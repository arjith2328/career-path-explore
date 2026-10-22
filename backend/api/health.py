from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "career-path-explorer-intelligence",
        "version": "2.1.0"
    }

@router.get("/")
def root_check():
    return {
        "status": "ok",
        "service": "career-path-explorer-intelligence",
        "health": "/api/health",
        "docs": "/docs"
    }
