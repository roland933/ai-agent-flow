import { useQuery } from "@tanstack/react-query";

import { getAgentAssignments } from "../api/task-api";

export function useAgentAssignmentsQuery(taskId: number | null) {
  return useQuery({
    queryKey: ["agent-assignments", taskId],
    queryFn: () => getAgentAssignments(taskId!),
    enabled: taskId !== null,
  });
}