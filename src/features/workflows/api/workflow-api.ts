import { apiClient } from "@/api/client"
import type { WorkflowOverviewApi,WorkflowTemplateApi } from "../types/workflow-api";
import { workflowEndpoints } from "./endpoints";
import type { WorkflowTemplateCreateRequest } from "../types/workflow-api";


export async function getWorkflows(): Promise<WorkflowOverviewApi[]> {
  return apiClient<WorkflowOverviewApi[]>(workflowEndpoints.all);
}


export async function createWorkflow(
  data: WorkflowTemplateCreateRequest,
): Promise<WorkflowTemplateApi> {
  return apiClient<WorkflowTemplateApi>(workflowEndpoints.create, {
    method: "POST",
    body: data,
  });
}