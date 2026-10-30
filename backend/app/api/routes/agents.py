
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import Agent
from app.schemas.agent import AgentCreate, AgentResponse
from app.services.agent_service import (
    create_agent,
    get_agents as get_agents_service,
    get_agent_by_id,
)

router = APIRouter(
    prefix="/agents",
    tags=["Agents"],
)


@router.post("/", response_model=AgentResponse)
def create_agent_endpoint(
    agent: AgentCreate,
    db: Session = Depends(get_db),
):
    return create_agent(db, agent)



@router.get("/", response_model=list[AgentResponse])
def get_agents(db: Session = Depends(get_db)):
    return get_agents_service(db)


@router.get("/{agent_id}", response_model=AgentResponse)
def get_agent(
    agent_id: int,
    db: Session = Depends(get_db),
):
    agent = get_agent_by_id(db, agent_id)

    if agent is None:
        raise HTTPException(
            status_code=404,
            detail="Agent not found",
        )

    return agent
