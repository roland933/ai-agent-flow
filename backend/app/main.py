import os

from fastapi import FastAPI, HTTPException
from sqlalchemy import  text
from sqlalchemy.exc import SQLAlchemyError
from pydantic import BaseModel



from app.db.session import engine


app = FastAPI(
    title="AgentFlow API",
    description="Backend API for the AgentFlow platform.",
    version="0.1.0",
)


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "agentflow-api",
    }

@app.get("/hello/{name}")
def say_hello(name:str):
    return {
        "message":f"hello,{name}!",
    }

class AgenCreate(BaseModel):
    name:str
    agent_type:str

@app.post("/agents")
def create_agent(agent:AgenCreate):
    return {
         "message": "Agent received successfully",
         "agent": {
              "name": agent.name,
              "agent_type": agent.agent_type,
         }
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