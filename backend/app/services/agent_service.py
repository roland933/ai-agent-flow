
from sqlalchemy.orm import Session

from app.models import Agent,AgentType
from app.schemas.agent import AgentCreate
from fastapi import HTTPException

def create_agent(db: Session, agent_data: AgentCreate):
  
    agent_type = db.query(AgentType).filter(AgentType.id == agent_data.agent_type_id).first()

    if agent_type is None:
        raise HTTPException(status_code=404,detail="Agent type not found.")

    if not agent_type.is_active:
        raise HTTPException(
            status_code=400,
            detail="Agent tpye is inactive"
        )

    new_agent = Agent(
            name=agent_data.name,
            agent_type_id=agent_data.agent_type_id,
        )

    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)

    return new_agent




def get_agents(db: Session):
    return db.query(Agent).all()


def get_agent_by_id(db: Session, agent_id: int):
    return db.query(Agent).filter(Agent.id == agent_id).first()

