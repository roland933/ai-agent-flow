import { apiClient } from "@/api/client";
import { taskEndpoints } from "./endpoints"
import type { ApiTask } from "../utils/taskAdapter";
import type { CreateTaskInput } from "../types/task";

export const getTasks = () => {
  return apiClient<ApiTask[]>(taskEndpoints.all);
};

export const getTask = (id: number) => {
  return apiClient<ApiTask>(taskEndpoints.byId(id));
};

export const createTask = (data: CreateTaskInput) => {
  return apiClient<ApiTask>(taskEndpoints.create,{
    method:"POST",
    body: data,
  })
}