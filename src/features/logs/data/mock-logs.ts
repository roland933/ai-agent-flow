import type { Log } from "../types/log";

export const mockLogs: Log[] = [
  {
    id: 1,
    level: "Info",
    message: "Execution started",
    source: "Execution #1",
    executionId: 1,
    taskId: 1,
    createdAt: "2026-10-26T09:30:05",
  },
  {
    id: 2,
    level: "Success",
    message: "Weekly report generated successfully",
    source: "Execution #2",
    executionId: 2,
    taskId: 3,
    createdAt: "2026-10-26T09:32:08",
  },
  {
    id: 3,
    level: "Warning",
    message: "Execution cancelled",
    source: "Execution #4",
    executionId: 4,
    taskId: 2,
    createdAt: "2026-10-26T09:35:12",
  },
  {
    id: 4,
    level: "Error",
    message: "Task failed while processing API logs",
    source: "Agent #2",
    executionId: 3,
    taskId: 4,
    createdAt: "2026-10-26T09:40:40",
  },
  {
    id: 5,
    level: "Info",
    message: "Agent initialized",
    source: "Agent #1",
    executionId: null,
    taskId: null,
    createdAt: "2026-10-26T09:45:00",
  },
];