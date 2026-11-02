from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.task import TaskCreate,TaskResponse
from app.services.task_service import (
    create_task,
    get_tasks as get_tasks_service
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

@router.post("/", response_model=TaskResponse)
def create_task_endpoint(
    task: TaskCreate,
    db: Session = Depends(get_db),
):
    return create_task(db,task)


@router.get("/", response_model=list[TaskResponse])
def get_tasks_endpoint(db: Session = Depends(get_db)):
    return get_tasks_service(db)
