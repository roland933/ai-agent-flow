export type LogLevel = "Info" | "Warning" | "Error" | "Success";

export type Log = {
  id: number;
  level: LogLevel;
  message: string;
  source: string;
  executionId: number | null;
  taskId: number | null;
  createdAt: string;
};