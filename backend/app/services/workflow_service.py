from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import AgentAssignment
from app.services.task_service import task_service



def get_workflow_assignments(db: Session, task_id: int):

    task_service.get_by_id(db, task_id)

    assignments = (
        db.query(AgentAssignment)
        .filter(AgentAssignment.task_id == task_id)
        .order_by(AgentAssignment.sequence)
        .all()
    )

    if not assignments:
        raise HTTPException(
            status_code=400,
            detail="Task has no assigned agents.",
        )

    return assignments