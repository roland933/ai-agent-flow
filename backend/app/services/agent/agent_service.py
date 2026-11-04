
from sqlalchemy.orm import Session

from app.models import Agent,AgentType
from app.schemas.agent import AgentCreate,AgentUpdate
from fastapi import HTTPException
from app.services.base_service import BaseService

class AgentService(BaseService[Agent, AgentCreate, AgentUpdate]):
    model = Agent


    def create(self,db: Session, agent_data: AgentCreate):
    

        agent_type = db.query(AgentType).filter(AgentType.id == agent_data.agent_type_id).first()

        if agent_type is None:
            raise HTTPException(status_code=404,detail="Agent type not found.")

        if not agent_type.is_active:
            raise HTTPException(
                status_code=400,
                detail="Agent tpye is inactive"
            )

        return super().create(db, agent_data)


agent_service = AgentService()

