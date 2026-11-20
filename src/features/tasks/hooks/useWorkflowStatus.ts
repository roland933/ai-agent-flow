import { useQuery } from "@tanstack/react-query";
import { getWorkflowStatus } from "../api/task-api";

export function useWorkflowStatus(
  taskId: number | null,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["workflow-status", taskId],
    queryFn: () => getWorkflowStatus(taskId!),
    enabled: enabled && taskId !== null && taskId > 0,
    refetchInterval: (query) => {
      if (query.state.error) return false;

      const status = query.state.data?.status;

      if (status === "completed" || status === "failed") {
        return false;
      }

      return 2000;
    },
    refetchIntervalInBackground: true,
  });
}