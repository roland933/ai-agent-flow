import { apiClient } from "@/api/client";
import { taskEndpoints } from "./endpoints"
import type { ApiTask } from "../utils/taskAdapter";
import type { CreateTaskInput, UpdateTaskInput,CreateAgentAssignmentInput,AgentAssignment } from "../types/task";

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

export function deleteTask(id: number) {
  return apiClient<void>(taskEndpoints.byId(id), {
    method: "DELETE",
  });
}

export function createAgentAssignment(data: CreateAgentAssignmentInput) {
  return apiClient(taskEndpoints.agentAssignments, {
    method: "POST",
    body: data,
  });
}

export function getAgentAssignments(taskId: number) {
  return apiClient<AgentAssignment[]>(
    taskEndpoints.agentAssignmentsByTask(taskId)
  );
}

export function deleteAgentAssignment(id: number) {
  return apiClient<void>(`/agent-assignments/${id}`, {
    method: "DELETE",
  });
}

export function runTask(id: number) {
  return apiClient<{ task_id: number; status: string; message: string }>(
    taskEndpoints.run(id),
    {
      method: "POST",
    }
  );
}