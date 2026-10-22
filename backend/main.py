import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.resume import router as resume_router
from backend.api.career import router as career_router
from backend.api.health import router as health_router

app = FastAPI(
    title="Career Path Explorer — Resume Intelligence API",
    description="Deterministic, evidence-first resume parsing and career intelligence pipeline.",
    version="2.1.0"
)

# Robust CORS Configuration for Vite development and local environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Register API Routers
app.include_router(health_router)
app.include_router(resume_router)
app.include_router(career_router)

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
