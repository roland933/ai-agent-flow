from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import AgentAssignment
from app.services.task_service import task_service
from app.enums.status import ExecutionStatus

class WorkflowService:

    def get_workflow_assignments(self,db: Session, task_id: int):

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
    def execute_worklow(self,db:Session, task_id:int):

        task = task_service.get_by_id(db,task_id)

        if task.status != ExecutionStatus.PENDING:
            raise HTTPException(
                status_code=409,
                detail= "Task is not in pending status",
            )

        assignments = self.get_workflow_assignments(db,task_id)
        previous_output = None
        task.status = ExecutionStatus.IN_PROGRESS
        try:
            db.commit()
            db.refresh(task)
        except Exception:
            db.rollback()
            raise

        for assignment in assignments:
            assignment.input_data = previous_output
            assignment.status = ExecutionStatus.IN_PROGRESS

            try:
                db.commit()
                db.refresh(assignment)
            except Exception:
                db.rollback()
                raise


            assignment.output_data = {
                "result": f"{assignment.title} completed successfully.",
                "agent_id": assignment.agent_id,
            }

            assignment.status = ExecutionStatus.COMPLETED
                
            try:
                db.commit()
                db.refresh(assignment)
            except Exception:
                db.rollback()
                db.commit()
                raise

            previous_output = assignment.output_data

       

       
        try:
            db.commit()
            db.refresh(task)
        except Exception:
            db.rollback()
            task.status = ExecutionStatus.FAILED
            db.commit()
            raise



workflow_service = WorkflowService()