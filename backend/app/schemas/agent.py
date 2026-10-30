from pydantic import BaseModel


class AgentCreate(BaseModel):
    name: str
    agent_type: str


class AgentResponse(BaseModel):
    id: int
    name: str
    agent_type: str