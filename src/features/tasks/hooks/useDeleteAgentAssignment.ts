import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAgentAssignment } from "../api/task-api";

type DeleteAgentAssignmentInput = {
  id: number;
  taskId: number;
};

export function useDeleteAgentAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteAgentAssignmentInput) =>
      deleteAgentAssignment(id),

    onSuccess: (_, assignmentData) => {
      queryClient.invalidateQueries({
        queryKey: ["agent-assignments", assignmentData.taskId],
      });
    },

    onError: (error) => {
      console.log(error.message);
    },
  });
}