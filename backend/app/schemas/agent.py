from pydantic import BaseModel
from app.schemas.agent_type import AgentTypeResponse

class AgentCreate(BaseModel):
    name: str
    agent_type_id: int

class AgentUpdate(BaseModel):
    name: str
    agent_type_id: int


class AgentResponse(BaseModel):
    id: int
    name: str
    agent_type_id: int
    agent_type: AgentTypeResponse


