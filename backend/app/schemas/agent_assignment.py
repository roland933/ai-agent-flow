from pydantic import BaseModel


class AgentAssignmentCreate(BaseModel):
    task_id: int
    agent_id: int
    title: str
    description: str | None = None
    sequence: int

class AgentAssignmentResponse(BaseModel):
    id: int
    task_id: int
    agent_id: int
    title: str
    description: str | None
    status: str
    sequence: int

    model_config = {"from_attributes": True}


class AgentAssignmentUpdate(BaseModel):
    task_id: int | None = None
    agent_id: int | None = None
    title: str | None = None
    description: str | None = None
    sequence: int | None = None