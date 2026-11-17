import { useMutation, useQueryClient } from "@tanstack/react-query";
import { runTask } from "../api/task-api";

export function useRunTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => runTask(taskId),

    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["agent-assignments"],
      });
    },

    onError: (error) => {
      console.error("Workflow execution failed:", error.message);
    },
  });
}