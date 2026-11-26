
from pydantic import BaseModel, Field, AliasPath
from app.enums.status import ExecutionStatus


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


# ASSIGNMENT RESPONSE

class WorkflowTemplateAssignmentResponse(BaseModel):
    id: int
    agent_id: int
    agent_name: str = Field(
        validation_alias=AliasPath("agent", "name")
    )
    instructions: str | None
    sequence: int

    model_config = {"from_attributes": True}


# WORKFLOW RESPONSE

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


# UPDATE SCHEMA

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


# RUN HISTORY

class WorkflowRunResponse(BaseModel):
    id: int
    title: str
    status: ExecutionStatus

    model_config = {"from_attributes": True}


# OVERVIEW RESPONSE

class WorkflowTemplateOverviewResponse(WorkflowTemplateResponse):
    last_run: WorkflowRunResponse | None = None
    total_runs: int = 0
