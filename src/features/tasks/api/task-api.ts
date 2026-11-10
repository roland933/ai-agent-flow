import { apiClient } from "@/api/client";
import { taskEndpoints } from "./endpoints"
import type { ApiTask } from "../utils/taskAdapter";

export const getTasks = () => {
  return apiClient<ApiTask[]>(taskEndpoints.all);
};

export const getTask = (id: number) => {
  return apiClient<ApiTask>(taskEndpoints.byId(id));
};