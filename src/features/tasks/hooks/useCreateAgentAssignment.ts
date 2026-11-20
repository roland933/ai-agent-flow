import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAgentAssignment } from "../api/task-api";
import type { CreateAgentAssignmentInput } from "../types/task";

export function useCreateAgentAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgentAssignmentInput) => createAgentAssignment(data),

    onSuccess: (_, variables) => {
       queryClient.invalidateQueries({
        queryKey: ["agent-assignments"],
      });
    
    },

    onError: (error) => {
      console.log(error.message);
    },
  });
}