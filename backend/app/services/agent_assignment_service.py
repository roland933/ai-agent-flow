from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import Agent,AgentAssignment
from app.schemas.agent_assignment import AgentAssignmentCreate,AgentAssignmentUpdate
from app.services.task_service import task_service
from app.services.base_service import BaseService
from app.services.agent_service import agent_service

class AgentAssignmentService(
    BaseService[AgentAssignment, AgentAssignmentCreate, AgentAssignmentUpdate]
):
    model = AgentAssignment

    def create(
        self,
        db: Session,
        assignment_data: AgentAssignmentCreate,
    ):
        try:
            task_service.get_by_id(db, assignment_data.task_id)

            agent_service.get_by_id(db, assignment_data.agent_id)

            existing_assignment = db.query(self.model).filter(
                    self.model.task_id == assignment_data.task_id,
                    self.model.sequence == assignment_data.sequence,
                ).first()

            if existing_assignment is not None:
                raise HTTPException(
                    status_code=409,
                    detail="Sequence already exists for this task",
                )

            return super().create(db, assignment_data)

        except HTTPException:
            raise

        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail=f"An unexpected error occurred: {str(e)}",
            )


    def get_assignments_by_task(self,db:Session, task_id:int):
        
        task_service.get_by_id(db, task_id)

        return (
                db.query(self.model)
                .filter(self.model.task_id == task_id)
                .order_by(self.model.sequence)
                .all()
            )

    def update(
        self,
        db: Session,
        id: int,
        update_data: AgentAssignmentUpdate,
    ):
        assignment = self.get_by_id(db, id)

        data = update_data.model_dump(exclude_unset=True)

        task_id = data.get("task_id", assignment.task_id)
        sequence = data.get("sequence", assignment.sequence)

        existing_assignment = db.query(self.model).filter(
            self.model.task_id == task_id,
            self.model.sequence == sequence,
            self.model.id != id,
        ).first()

        if existing_assignment is not None:
            raise HTTPException(
                status_code=409,
                detail="Sequence already exists for this task.",
            )

        if "task_id" in data:
            task_service.get_by_id(db, task_id)

        if "agent_id" in data:
            agent_service.get_by_id(db, data["agent_id"])


        return super().update(
                db,
                id,
                update_data,
            )

    def delete(self, db: Session, id: int):
        assignment = self.get_by_id(db, id)

        task = task_service.get_by_id(db, assignment.task_id)

        if task.status == "in_progress":
            raise HTTPException(
                status_code=409,
                detail="Cannot delete an assignment belonging to a running task.",
            )

        if assignment.status == "in_progress":
            raise HTTPException(
                status_code=409,
                detail="Cannot delete an assignment that is currently running.",
            )

        return super().delete(db, id)
        

agent_assignment_service = AgentAssignmentService()