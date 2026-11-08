from pydantic import BaseModel
from app.enums.status import ExecutionStatus
class AssignmentResultResponse(BaseModel):
    assignment_id: int
    agent_id: int
    status: ExecutionStatus
    output: dict | None

class WorkflowExecutionResponse(BaseModel):
    task_id:int
    status:ExecutionStatus
    message:str
    results:list[AssignmentResultResponse]
