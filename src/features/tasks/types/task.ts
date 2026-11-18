
export type TaskStatus = "Pending" | "Running" | "Completed" | "Failed";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  agentId: number | null;
  createdAt: string;
};


export type CreateTaskInput = {
  title: string;
  description: string;
};

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
}

export interface CreateAgentAssignmentInput {
  task_id: number;
  agent_id: number;
  title: string;
  description: string | null;
}


export type AgentAssignmentStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed";

export interface AgentAssignment {
  id: number;
  task_id: number;
  agent_id: number;
  title: string;
  description: string | null;
  status: AgentAssignmentStatus;
  sequence: number;
  output_data:object
}


export type WorkflowExecution = {
  task_id: number;
  status: string;
  message: string;
  results: {
    assignment_id: number;
    agent_id: number;
    status: string;
    output: Record<string, unknown> | null;
  }[];
};


