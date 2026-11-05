
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.agent.agent_service import agent_service
from app.schemas.agent import AgentCreate, AgentResponse

router = APIRouter(
    prefix="/agents",
    tags=["Agents"],
)


@router.post("/", response_model=AgentResponse)
def create_agent_endpoint(
    agent: AgentCreate,
    db: Session = Depends(get_db),
):
    return agent_service.create(db, agent)



@router.get("/", response_model=list[AgentResponse])
def get_agents(db: Session = Depends(get_db)):
    return agent_service.get_all(db)


@router.get("/{agent_id}", response_model=AgentResponse)
def get_agent(
    agent_id: int,
    db: Session = Depends(get_db),
):
   return agent_service.get_by_id(db,agent_id)
