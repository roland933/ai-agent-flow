from sqlalchemy.orm import Session

from app.models import AgentType


def create_agent_type(
    db: Session,
    name: str,
    description: str | None = None,
    is_active: bool = True,
):
    existing_type = db.query(AgentType).filter(
        AgentType.name == name
    ).first()

    if existing_type:
        return existing_type

    agent_type = AgentType(
        name=name,
        description=description,
        is_active=is_active,
    )

    db.add(agent_type)
    db.commit()
    db.refresh(agent_type)

    return agent_type