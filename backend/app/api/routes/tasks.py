from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.task import TaskCreate,TaskResponse,TaskUpdate
from app.services.task_service import task_service
from app.services.workflow_service import workflow_service
from app.schemas.workflow import WorkflowExecutionResponse

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

@router.post("/", response_model=TaskResponse)
def create_task_endpoint(
    task: TaskCreate,
    db: Session = Depends(get_db),
):
   
    return task_service.create(db,task)

@router.patch("/{id}", response_model=TaskResponse)
def update_task_endpoint(
    id:int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
):
   
    return task_service.update(db,id,task)


@router.get("/", response_model=list[TaskResponse])
def get_tasks_endpoint(db: Session = Depends(get_db)):
    return task_service.get_all(db)



@router.post("/{task_id}/run", status_code=202)
def run_task(
    task_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    task_service.get_by_id(db, task_id)

    background_tasks.add_task(
        workflow_service.execute_workflow_background,
        task_id,
    )

    return {
        "task_id": task_id,
        "status": "accepted",
        "message": "Workflow execution started.",
    }

@router.get("/task_id/workflow",response_model=WorkflowExecutionResponse)
def get_workflow_status(task_id:int,db:Session=Depends(get_db)):
    return workflow_service.get_workflow_status(db,task_id)