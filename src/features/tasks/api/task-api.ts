import { apiClient } from "../../../api/client";
import type { Task } from "../types/task";

export const getTasks = () => {
  return apiClient<Task[]>("/tasks");
};