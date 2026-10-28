import os

from fastapi import FastAPI, HTTPException,Depends
from sqlalchemy import  text
from sqlalchemy.exc import SQLAlchemyError
from pydantic import BaseModel
from sqlalchemy.orm import Session


from app.db.session import engine,get_db
from app.models import Agent

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

@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
    return {
        "message": "Database session received successfully"
    }

class AgenCreate(BaseModel):
    name:str
    agent_type:str

@app.post("/agents")
def create_agent(agent:AgenCreate, db:Session=Depends(get_db)):
    new_agent = Agent(
        name=agent.name,
        agent_type = agent.agent_type
    )
    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)

    return {
        "message": "Agent created successfully",
        "agent": {
            "id": new_agent.id,
            "name": new_agent.name,
            "agent_type": new_agent.agent_type,
        },
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