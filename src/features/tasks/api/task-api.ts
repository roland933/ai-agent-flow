import { apiClient } from "@/api/client";
import { taskEndpoints } from "./endpoints"
import type { ApiTask } from "../utils/taskAdapter";
import type { CreateTaskInput, UpdateTaskInput } from "../types/task";

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


export function updateTask(id: number, data: UpdateTaskInput) {
  return apiClient<ApiTask>(taskEndpoints.byId(id), {
    method: "PATCH",
    body: data,
  });
}