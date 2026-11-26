
from fastapi import APIRouter, Depends, status,BackgroundTasks
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.workflow_template import (
    WorkflowTemplateCreate,
    WorkflowTemplateUpdate,
    WorkflowTemplateResponse,
    WorkflowRunResponse,
    WorkflowTemplateOverviewResponse
)
from app.services.workflow_template_service import workflow_template_service
from app.services.workflow_service import workflow_service

router = APIRouter(
    prefix="/workflow-templates",
    tags=["Workflow Templates"],
)


@router.post(
    "/",
    response_model=WorkflowTemplateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_workflow_template(
    data: WorkflowTemplateCreate,
    db: Session = Depends(get_db),
):
    return workflow_template_service.create(db, data)


@router.get(
    "/",
    response_model=list[WorkflowTemplateResponse],
)
def get_workflow_templates(
    db: Session = Depends(get_db),
):
    return workflow_template_service.get_all(db)

@router.get(
    "/overview",
    response_model=list[WorkflowTemplateOverviewResponse],
)
def get_workflow_overview(db: Session = Depends(get_db)):
    return workflow_template_service.get_overview(db)

@router.get(
    "/{id}",
    response_model=WorkflowTemplateResponse,
)
def get_workflow_template(
    id: int,
    db: Session = Depends(get_db),
):
    return workflow_template_service.get_by_id(db, id)


@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_workflow_template(
    id: int,
    db: Session = Depends(get_db),
):
    workflow_template_service.delete(db, id)




@router.patch(
    "/{id}",
    response_model=WorkflowTemplateResponse,
)
def update_workflow_template(
    id: int,
    data: WorkflowTemplateUpdate,
    db: Session = Depends(get_db),
):
    return workflow_template_service.update(db, id, data)


@router.post("/{id}/run", status_code=status.HTTP_202_ACCEPTED)
def run_workflow_template(
    id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    task = workflow_template_service.create_task_from_template(db, id)

    background_tasks.add_task(
        workflow_service.execute_workflow_background,
        task.id,
    )

    return {
        "task_id": task.id,
        "status": "accepted",
        "message": "Workflow execution started.",
    }

@router.get("/{id}/runs", response_model=list[WorkflowRunResponse])
def get_workflow_runs(id: int, db: Session = Depends(get_db)):
    return workflow_template_service.get_workflow_runs(db, id)


