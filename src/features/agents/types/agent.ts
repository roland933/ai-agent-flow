import type { AgentModel } from "./agentModel";

export type Agent = {
  id: number;
  name: string;
  description: string;
  status: "Running" | "Idle" | "Error";
  model: AgentModel;
  tasksCompleted: number;
  type?: string;
  createdAt?: string;
};