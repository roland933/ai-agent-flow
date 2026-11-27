import { mutationOptions } from "@tanstack/react-query";
import { createWorkflow } from "../api/workflow-api";

export const workflowMutations = {
  create: () =>
    mutationOptions({
      mutationFn: createWorkflow,
    }),
};