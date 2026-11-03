from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.task import TaskCreate,TaskResponse,TaskUpdate
from app.services.task_service import task_service

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
