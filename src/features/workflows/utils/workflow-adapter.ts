
import type { Workflow, TaskStatus } from "../types/workflow";
import type { WorkflowOverviewApi } from "../types/workflow-api";

function mapTaskStatus(status: string | undefined): TaskStatus {
  switch (status) {
    case "in_progress":
      return "running";
    case "completed":
      return "completed";
    case "failed":
      return "failed";
    case "pending":
    default:
      return "draft";
  }
}

export function mapWorkflowFromApi(
  data: WorkflowOverviewApi,
): Workflow {
  return {
    id: data.id,
    name: data.name,
    description: data.description ?? "",

    taskTitle: data.task_title,
    taskDescription: data.task_description ?? "",
    taskStatus: mapTaskStatus(data.last_run?.status),

    assignments: data.assignments.map((assignment) => ({
      id: assignment.id,
      agentId: assignment.agent_id,
      agentName: assignment.agent_name,
      instructions: assignment.instructions ?? "",
      status: "idle",
    })),

    outputName: data.output_name,
    outputDescription: data.output_description ?? "",
    outputFormat: data.output_format as Workflow["outputFormat"],
  };
}

export function mapWorkflowsFromApi(
  data: WorkflowOverviewApi[],
): Workflow[] {
  return data.map(mapWorkflowFromApi);
}
