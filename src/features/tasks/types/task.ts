
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

export type UpdateTaskInput = CreateTaskInput & {
  status: TaskStatus;
};


