export type ExecutionStatus =
  | "Queued"
  | "Running"
  | "Completed"
  | "Failed"
  | "Cancelled";

export type Execution = {
  id: number;
  taskId: number;
  agentId: number | null;
  status: ExecutionStatus;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  result: string | null;
  error: string | null;
};