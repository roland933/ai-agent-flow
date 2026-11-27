
export type ApiOutputFormat = "markdown" | "json" | "text";

export interface WorkflowAssignmentApi {
  id: number;
  agent_id: number;
  agent_name: string;
  instructions: string | null;
  sequence: number;
}

export interface WorkflowTemplateApi {
  id: number;
  name: string;
  description: string | null;

  task_title: string;
  task_description: string | null;

  output_name: string;
  output_description: string | null;
  output_format: string;

  assignments: WorkflowAssignmentApi[];
}

export interface WorkflowRunApi {
  id: number;
  title: string;
  status: string;
}

export interface WorkflowOverviewApi extends WorkflowTemplateApi {
  last_run: WorkflowRunApi | null;
  total_runs: number;
}


export interface WorkflowTemplateCreateRequest {
  name: string;
  description: string | null;
  task_title: string;
  task_description: string | null;
  output_name: string;
  output_description: string | null;
  output_format: "markdown" | "json" | "text";
  assignments: {
    agent_id: number;
    instructions: string | null;
    sequence: number;
  }[];
}
