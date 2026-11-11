
from app.models import Task
from app.schemas.task import TaskCreate,TaskUpdate
from app.services.base_service import BaseService

from fastapi import HTTPException
from sqlalchemy.orm import Session

class TaskService(BaseService[Task, TaskCreate, TaskUpdate]):

    model = Task

    def create(self, db: Session, data: TaskCreate):
        existing_task = (
            db.query(Task)
            .filter(Task.title == data.title)
            .first()
        )

        if existing_task:
            raise HTTPException(
                status_code=409,
                detail="Task already exists",
            )

        return super().create(db, data)



task_service = TaskService()