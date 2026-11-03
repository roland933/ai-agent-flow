
from app.models import Task
from app.schemas.task import TaskCreate,TaskUpdate
from app.services.base_service import BaseService

class TaskService(BaseService[Task,TaskCreate,TaskUpdate]):

    model = Task



task_service = TaskService()