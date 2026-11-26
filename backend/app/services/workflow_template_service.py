
from sqlalchemy.orm import Session,joinedload
from fastapi import HTTPException

from app.models import (
    WorkflowTemplate,
    WorkflowTemplateAssignment,
    Agent,
)

from app.models import (
    WorkflowTemplate,
    WorkflowTemplateAssignment,
    Agent,
    Task,
    AgentAssignment,
)

from app.services.base_service import BaseService

from app.schemas.workflow_template import (
    WorkflowTemplateCreate,
    WorkflowTemplateUpdate,
)

class WorkflowTemplateService(
    BaseService[
        WorkflowTemplate,
        WorkflowTemplateCreate,
        WorkflowTemplateUpdate,
    ]
):
    model = WorkflowTemplate

   

    def create(
        self,
        db: Session,
        data: WorkflowTemplateCreate,
    ) -> WorkflowTemplate:

        try:
            # Ellenőrizzük, hogy minden kiválasztott agent létezik-e.
            agent_ids = {item.agent_id for item in data.assignments}

            if agent_ids:
                existing_ids = {
                    agent.id
                    for agent in db.query(Agent)
                    .filter(Agent.id.in_(agent_ids))
                    .all()
                }

                if agent_ids != existing_ids:
                    raise HTTPException(
                        status_code=404,
                        detail="One or more agents were not found",
                    )

            # Létrehozzuk a workflow-t az agent-hozzárendelések nélkül.
            workflow_data = data.model_dump(exclude={"assignments"})

            workflow = WorkflowTemplate(**workflow_data)

            db.add(workflow)
            db.flush()

            # Létrehozzuk az agent-hozzárendeléseket.
            for assignment_data in data.assignments:
                assignment = WorkflowTemplateAssignment(
                    workflow_id=workflow.id,
                    agent_id=assignment_data.agent_id,
                    instructions=assignment_data.instructions,
                    sequence=assignment_data.sequence,
                )

                db.add(assignment)

            db.commit()
            db.refresh(workflow)

            return workflow

        except Exception:
            db.rollback()
            raise

    
    def update(
        self,
        db: Session,
        id: int,
        data: WorkflowTemplateUpdate,
    ) -> WorkflowTemplate:

        try:
            workflow = self.get_by_id(db, id)

            update_data = data.model_dump(
                exclude_unset=True,
                exclude={"assignments"},
            )

            # Workflow alapadatainak frissítése
            for key, value in update_data.items():
                setattr(workflow, key, value)

            # Agent-hozzárendelések frissítése,
            # ha az assignments mező szerepelt a kérésben.
            if "assignments" in data.model_fields_set:

                assignments = data.assignments or []

                agent_ids = {item.agent_id for item in assignments}

                if agent_ids:
                    existing_ids = {
                        agent.id
                        for agent in db.query(Agent)
                        .filter(Agent.id.in_(agent_ids))
                        .all()
                    }

                    if agent_ids != existing_ids:
                        raise HTTPException(
                            status_code=404,
                            detail="One or more agents were not found",
                        )

                workflow.assignments.clear()

                for assignment_data in assignments:
                    assignment = WorkflowTemplateAssignment(
                        agent_id=assignment_data.agent_id,
                        instructions=assignment_data.instructions,
                        sequence=assignment_data.sequence,
                    )

                    workflow.assignments.append(assignment)

            db.commit()
            db.refresh(workflow)

            return workflow

        except Exception:
            db.rollback()
            raise



    def get_all(self, db: Session) -> list[WorkflowTemplate]:
        return (
            db.query(WorkflowTemplate)
            .options(
                joinedload(WorkflowTemplate.assignments)
                .joinedload(WorkflowTemplateAssignment.agent)
            )
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        id: int,
        detail_message: str = "Workflow not found",
    ) -> WorkflowTemplate:
        workflow = (
            db.query(WorkflowTemplate)
            .options(
                joinedload(WorkflowTemplate.assignments)
                .joinedload(WorkflowTemplateAssignment.agent)
            )
            .filter(WorkflowTemplate.id == id)
            .first()
        )

        if workflow is None:
            raise HTTPException(
                status_code=404,
                detail=detail_message,
            )

        return workflow

    def create_task_from_template(self, db: Session, id: int) -> Task:
            try:
                workflow = self.get_by_id(db, id)
    
                if not workflow.assignments:
                    raise HTTPException(
                        status_code=400,
                        detail="Workflow template has no assigned agents.",
                    )
    
                task = Task(
                    title=workflow.task_title,
                    description=workflow.task_description,
                )
    
                db.add(task)
                db.flush()
    
                for item in workflow.assignments:
                    assignment = AgentAssignment(
                        task_id=task.id,
                        agent_id=item.agent_id,
                        title=workflow.task_title,
                        description=item.instructions,
                        sequence=item.sequence,
                    )
                    db.add(assignment)
    
                db.commit()
                db.refresh(task)
    
                return task
    
            except Exception:
                db.rollback()
                raise



workflow_template_service = WorkflowTemplateService()
