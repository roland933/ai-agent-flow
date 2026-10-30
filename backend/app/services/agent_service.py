
from sqlalchemy.orm import Session

from app.models import Agent
from app.schemas.agent import AgentCreate


def create_agent(db: Session, agent_data: AgentCreate):
    new_agent = Agent(
        name=agent_data.name,
        agent_type=agent_data.agent_type,
    )

    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)

    return new_agent




def get_agents(db: Session):
    return db.query(Agent).all()


def get_agent_by_id(db: Session, agent_id: int):
    return db.query(Agent).filter(Agent.id == agent_id).first()

