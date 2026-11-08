from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models import AgentAssignment
from app.services.task_service import task_service
from app.enums.status import ExecutionStatus
from app.db.session import SessionLocal
from app.schemas.workflow import WorkflowExecutionResponse, AssignmentResultResponse

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
    def execute_workflow(self,db:Session, task_id:int)->WorkflowExecutionResponse:

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

        try:    
            for assignment in assignments:
                assignment.input_data = previous_output
                assignment.status = ExecutionStatus.IN_PROGRESS

                db.commit()
                db.refresh(assignment)

            
                assignment.output_data = {
                    "result": f"{assignment.title} completed successfully.",
                    "agent_id": assignment.agent_id,
                }

                assignment.status = ExecutionStatus.COMPLETED

                db.commit()
                db.refresh(assignment)
                    

                previous_output = assignment.output_data

        except Exception:
            db.rollback()
            task = task_service.get_by_id(db, task_id)
            assignment = db.query(AgentAssignment).filter(
                AgentAssignment.id == assignment.id
            ).first()

            assignment.status = ExecutionStatus.FAILED
            task.status = ExecutionStatus.FAILED

            db.commit()
            db.refresh(task)

            return WorkflowExecutionResponse(
                task_id=task.id,
                status=task.status,
                message="Workflow execution failed.",
                results=[
                    AssignmentResultResponse(
                        assignment_id=item.id,
                        agent_id=item.agent_id,
                        status=item.status,
                        output=item.output_data,
                    )
                    for item in assignments
                ],
            )
              
       


        task.status = ExecutionStatus.COMPLETED

        db.commit()
        db.refresh(task)

        return WorkflowExecutionResponse(
            task_id=task.id,
            status=task.status,
            message="Workflow executed successfully.",
            results=[
                AssignmentResultResponse(
                    assignment_id=assignment.id,
                    agent_id=assignment.agent_id,
                    status=assignment.status,
                    output=assignment.output_data,
                )
                for assignment in assignments
            ],
        )

    def execute_workflow_background(self, task_id: int):
        db = SessionLocal()

        try:
            self.execute_workflow(db, task_id)
        finally:
            db.close()


    def get_workflow_status(
    self,
    db: Session,
    task_id: int
) -> WorkflowExecutionResponse:

        task = task_service.get_by_id(db, task_id)
        assignments = self.get_workflow_assignments(db, task_id)

        return WorkflowExecutionResponse(
            task_id=task.id,
            status=task.status,
            message=f"Workflow status: {task.status.value}",
            results=[
                AssignmentResultResponse(
                    assignment_id=item.id,
                    agent_id=item.agent_id,
                    status=item.status,
                    output=item.output_data,
                )
                for item in assignments
            ],
        )



    



workflow_service = WorkflowService()