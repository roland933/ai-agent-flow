
from pydantic import BaseModel, Field, AliasPath


class WorkflowTemplateAssignmentCreate(BaseModel):
    agent_id: int
    instructions: str | None = None
    sequence: int = Field(ge=1)


class WorkflowTemplateCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None

    task_title: str = Field(min_length=1, max_length=150)
    task_description: str | None = None

    output_name: str = Field(min_length=1, max_length=150)
    output_description: str | None = None
    output_format: str = "markdown"

    assignments: list[WorkflowTemplateAssignmentCreate] = Field(
        default_factory=list,
        max_length=3,
    )
from pydantic import BaseModel, Field


# CREATE SCHEMAS

class WorkflowTemplateAssignmentCreate(BaseModel):
    agent_id: int
    instructions: str | None = None
    sequence: int = Field(ge=1)


class WorkflowTemplateCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    description: str | None = None

    task_title: str = Field(min_length=1, max_length=150)
    task_description: str | None = None

    output_name: str = Field(min_length=1, max_length=150)
    output_description: str | None = None
    output_format: str = "markdown"

    assignments: list[WorkflowTemplateAssignmentCreate] = Field(
        default_factory=list,
        max_length=3,
    )


class WorkflowTemplateAssignmentResponse(BaseModel):
    id: int
    agent_id: int
    agent_name: str = Field(
        validation_alias=AliasPath("agent", "name")
    )
    instructions: str | None
    sequence: int

    model_config = {"from_attributes": True}


class WorkflowTemplateResponse(BaseModel):
    id: int
    name: str
    description: str | None

    task_title: str
    task_description: str | None

    output_name: str
    output_description: str | None
    output_format: str

    assignments: list[WorkflowTemplateAssignmentResponse]

    model_config = {"from_attributes": True}


class WorkflowTemplateUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=150)
    description: str | None = None

    task_title: str | None = Field(default=None, min_length=1, max_length=150)
    task_description: str | None = None

    output_name: str | None = Field(default=None, min_length=1, max_length=150)
    output_description: str | None = None
    output_format: str | None = None

    assignments: list[WorkflowTemplateAssignmentCreate] | None = Field(
        default=None,
        max_length=3,
    )