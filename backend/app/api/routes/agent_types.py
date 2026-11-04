
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import AgentType
from app.schemas.agent import  AgentTypeCreate,AgentTypeResponse,AgenTypeUpdate
from backend.app.services.agent.agent_type_service import (
    create_agent_type,
    get_agent_types as get_agent_types_service,
    get_agent_type_by_id,
    update_agent_type

)

router = APIRouter(
    prefix="/agent-types",
    tags=["AgentTypes"],
)


@router.post("/", response_model=AgentTypeResponse)
def create_agent_type_endpoint(
    agent_type_data: AgentTypeCreate,
    db: Session = Depends(get_db),
):
    return create_agent_type(db, agent_type_data)

@router.get("/", response_model=list[AgentTypeResponse])
def get_agent_types(db: Session = Depends(get_db)):
    return get_agent_types_service(db)

@router.patch("/{id}",response_model=AgentTypeResponse)
def update_agent_type_endpoint(
    id:int,
    agent_type_data:AgenTypeUpdate,
    db: Session=Depends(get_db),
):
    
    return update_agent_type(db,id,agent_type_data)



@router.get("/{id}", response_model=AgentTypeResponse)
def get_agent_type_endpoint(
    id: int,
    db: Session = Depends(get_db),
):
    return get_agent_type_by_id(db, id)

  