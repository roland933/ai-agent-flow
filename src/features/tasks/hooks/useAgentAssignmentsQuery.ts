import { useQuery } from "@tanstack/react-query";

import { getAgentAssignments, getAllAgentAssignments } from "../api/task-api";

export function useAgentAssignmentsQuery(taskId: number | null) {
  return useQuery({
    queryKey: ["agent-assignments", taskId],
    queryFn: () => getAgentAssignments(taskId!),
    enabled: taskId !== null,
  });
}

export function useAllAgentAssignmentsQuery() {
  return useQuery({
    queryKey: ["agent-assignments"],
    queryFn: getAllAgentAssignments,
  });
}