import { useQuery } from "@tanstack/react-query";
import { workflowQueries } from "../queries/workflow-queries";

export function useWorkflows() {
  return useQuery(workflowQueries.all());
}