
export type AgentStatus =
  | "idle"
  | "pending"
  | "running"
  | "completed"
  | "failed";

export type TaskStatus =
  | "draft"
  | "running"
  | "completed"
  | "failed";

export type OutputFormat = "markdown" | "json" | "text";

export interface WorkflowAssignment {
  id: number;
  agentId: number;
  agentName: string;
  instructions: string;
  status: AgentStatus;
}

export interface Workflow {
  id: number;
  name: string;
  description: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: TaskStatus;
  assignments: WorkflowAssignment[];
  outputName: string;
  outputDescription: string;
  outputFormat: OutputFormat;
}
