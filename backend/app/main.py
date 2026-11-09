import os

from fastapi import FastAPI, HTTPException,Depends
from sqlalchemy import  text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine,get_db
from app.api.routes.agents import router as agents_router
from app.api.routes.agent_types import router as agents_types_router
from app.api.routes.tasks import router as task_router
from app.api.routes.agent_assignment import router as agent_assignment_router


app = FastAPI(
    title="AgentFlow API",
    description="Backend API for the AgentFlow platform.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents_router)
app.include_router(agents_types_router)
app.include_router(task_router)
app.include_router(agent_assignment_router)

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "agentflow-api",
    }

@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    return {
        "message": "Database session received successfully"
    }


@app.get("/health/db", tags=["Health"])
def database_health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "database": "connected",
        }
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed",
        ) from exc