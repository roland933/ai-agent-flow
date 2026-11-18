import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getWorkflowStatus } from "../api/task-api";

export function useWorkflowStatus(taskId: number, enabled: boolean = true) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["workflow-status", taskId],
    queryFn: () => getWorkflowStatus(taskId),
    enabled,
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "completed" || status === "failed") {
        return false;
      }

      return 2000;
    },
    refetchIntervalInBackground: true,
  });
}