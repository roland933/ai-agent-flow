from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.agent_assignment import (
    AgentAssignmentCreate,
    AgentAssignmentResponse,
)
from app.services.agent_assignment_service import agent_assignment_service

router = APIRouter(
    prefix="/agent-assignments",
    tags=["Agent Assignments"],
)

@router.post("/", response_model=AgentAssignmentResponse)
def create_assignment_endpoint(
    assignment_data: AgentAssignmentCreate,
    db: Session = Depends(get_db),
):
    return agent_assignment_service.create(db, assignment_data)


@router.get(
    "/task/{task_id}",
    response_model=list[AgentAssignmentResponse],
)
def get_assignments_endpoint(
    task_id: int,
    db: Session = Depends(get_db),
):
    return agent_assignment_service.get_assignments_by_task(db,task_id)


@router.delete("/{assignment_id}", status_code=204)
def delete_assignment(
    assignment_id: int,
    db: Session = Depends(get_db),
):
    agent_assignment_service.delete(db, assignment_id)