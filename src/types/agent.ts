export type Agent = {
  id: number;
  name: string;
  description: string;
  status: "Running" | "Idle" | "Error";
  model: string;
  tasksCompleted: number;
  type?: string;
  createdAt?: string;
};