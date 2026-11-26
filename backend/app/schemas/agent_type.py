from pydantic import BaseModel

class AgentTypeCreate(BaseModel):
    name: str
    description: str | None = None
    is_active: bool = True
    role: str | None = None
    responsibilities: str | None = None
    expected_output: str | None = None
    constraints: str | None = None


class AgentTypeUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    is_active: bool | None = None
    role: str | None = None
    responsibilities: str | None = None
    expected_output: str | None = None
    constraints: str | None = None


class AgentTypeResponse(BaseModel):
    id: int
    name: str
    description: str | None
    is_active: bool
    role: str | None
    responsibilities: str | None
    expected_output: str | None
    constraints: str | None

    model_config = {
        "from_attributes": True
    }