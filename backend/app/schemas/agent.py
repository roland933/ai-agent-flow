from pydantic import BaseModel


class AgentCreate(BaseModel):
    name: str
    agent_type_id: int

class AgentTypeResponse(BaseModel):
    id: int
    name: str
    description: str | None
    is_active: bool

    model_config = {
        "from_attributes": True
    }

class AgentResponse(BaseModel):
    id: int
    name: str
    agent_type_id: int
    agent_type: AgentTypeResponse