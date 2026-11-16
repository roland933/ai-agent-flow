import type { Task, TaskStatus } from "../types/task";

export type ApiTask = {
  id: number;
  title: string;
  description: string | null;
  status: string;
};

export const statusMap: Record<string, TaskStatus> = {
  pending: "Pending",
  in_progress: "Running",
  completed: "Completed",
  failed: "Failed",
};

export function mapApiTask(apiTask: ApiTask): Task {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description ?? "",
    status: statusMap[apiTask.status],
    agentId: null,
    createdAt: "",
  };
}