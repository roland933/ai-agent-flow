from sqlalchemy.orm import Session

from app.models import Task
from app.schemas.task import TaskCreate



def create_task(db:Session, task_data:TaskCreate):
    task = Task(
        title=task_data.title,
        description=task_data.description,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def get_tasks(db: Session):
    return db.query(Task).all()