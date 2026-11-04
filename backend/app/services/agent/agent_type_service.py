from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models import AgentType
from app.schemas.agent import AgentTypeCreate,AgenTypeUpdate


def create_agent_type(
    db: Session,
    agent_type_data: AgentTypeCreate,
):
    existing_type = db.query(AgentType).filter(
        AgentType.name == agent_type_data.name
    ).first()

    if existing_type:
        return existing_type

    agent_type = AgentType(
        name=agent_type_data.name,
        description=agent_type_data.description,
        is_active = agent_type_data.is_active
    )

    db.add(agent_type)
    db.commit()
    db.refresh(agent_type)

    return agent_type

def get_agent_types(db:Session):
    return db.query(AgentType).all()

def get_agent_type_by_id(db: Session, agent_type_id: int):
    agent_type = db.query(AgentType).filter(
        AgentType.id == agent_type_id
    ).first()

    if agent_type is None:
        raise HTTPException(
            status_code=404,
            detail="Agent type not found",
        )

    return agent_type

def update_agent_type(db: Session, id: int, agent_type_data: AgenTypeUpdate):
    agent_type = get_agent_type_by_id(db, id)

    update_data = agent_type_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(agent_type, key, value)

    db.commit()
    db.refresh(agent_type)

    return agent_type
  


    
