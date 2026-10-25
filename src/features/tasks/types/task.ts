
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
  agentId: number | null;
};

export type UpdateTaskInput = CreateTaskInput & {
  status: TaskStatus;
};


