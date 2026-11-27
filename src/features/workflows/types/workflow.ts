
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


export interface CreateWorkflowData  {
    name: string;
    description: string;
    taskTitle: string;
    taskDescription: string;
    outputName: string;
    outputDescription: string;
    outputFormat: "markdown" | "json" | "text";

    error?: string | null;
};


export interface WorkflowAssignmentDraft {
  agentId: number;
  instructions: string;
  sequence: number;
}