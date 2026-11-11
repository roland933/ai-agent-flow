from pydantic import BaseModel,field_validator
from app.helpers.validators import validate_not_empty

class TaskCreate(BaseModel):
    title:str
    description:str | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value:str)->str:
       return validate_not_empty(value)

class TaskResponse(BaseModel):
    id: int
    title:str
    description:str | None
    status:str

    model_config = {
            "from_attributes": True
        }

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str | None) -> str | None:
        if value is None:
            return value

        return validate_not_empty(value)
    