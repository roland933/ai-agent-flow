import { apiClient } from "@/api/client"
import type { WorkflowOverviewApi } from "../types/workflow-api";
import { workflowEndpoints } from "./endpoints";

export async function getWorkflows(): Promise<WorkflowOverviewApi[]> {
  return apiClient<WorkflowOverviewApi[]>(workflowEndpoints.all);
}