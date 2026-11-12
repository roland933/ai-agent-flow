
from app.models import Task
from app.schemas.task import TaskCreate,TaskUpdate
from app.services.base_service import BaseService
from app.helpers.validators import validate_unique_field
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.enums.status import ExecutionStatus

class TaskService(BaseService[Task, TaskCreate, TaskUpdate]):

    model = Task

    def create(self, db: Session, data: TaskCreate):
        validate_unique_field(
            db=db,
            model=Task,
            field_name="title",
            value=data.title,
            error_message="Task already exists",
            )

        return super().create(db, data)

    def update(self,db: Session, id:int, data: TaskUpdate):
            validate_unique_field(
                        db=db,
                        model=Task,
                        field_name="title",
                        value=data.title,
                        error_message="Task already exists",
                        exclude_id=id,
                    )
    
            return super().update(db, id, data)

    def delete(self, db: Session, id: int) -> None:
        task = self.get_by_id(db, id)

        if task.status == ExecutionStatus.COMPLETED:
            raise HTTPException(
                status_code=409,
                detail="Completed tasks cannot be deleted",
            )

        return super().delete(db, id)



task_service = TaskService()