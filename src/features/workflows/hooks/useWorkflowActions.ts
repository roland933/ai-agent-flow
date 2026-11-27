
import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Workflow } from "../types/workflow";
import type { CreateWorkflowData } from "../components/CreateWorkflowDialog";
import type { WorkflowTemplateCreateRequest } from "../types/workflow-api";

import { workflowMutations } from "../queries/workflow-mutations";

interface UseWorkflowActionsProps {
  setWorkflows: Dispatch<SetStateAction<Workflow[]>>;
  setExpandedIds: Dispatch<SetStateAction<number[]>>;
  setCurrentPage: (page: number) => void;
}

export function useWorkflowActions({
  setWorkflows,
  setExpandedIds,
  setCurrentPage,
}: UseWorkflowActionsProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    ...workflowMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
  });

  const handleCreateWorkflow = async (data: CreateWorkflowData) => {
    const payload: WorkflowTemplateCreateRequest = {
      name: data.name,
      description: data.description || null,
      task_title: data.taskTitle,
      task_description: data.taskDescription || null,
      output_name: data.outputName,
      output_description: data.outputDescription || null,
      output_format: data.outputFormat,
      assignments: [],
    };

    const created = await createMutation.mutateAsync(payload);

    setCurrentPage(1);
    setExpandedIds((current) => [created.id, ...current]);

    return created;
  };

  const handleDuplicate = (workflow: Workflow) => {
    const id = Date.now();

    const duplicate: Workflow = {
      ...workflow,
      id,
      name: `${workflow.name} (Copy)`,
      taskStatus: "draft",
      assignments: workflow.assignments.map((assignment) => ({
        ...assignment,
        id: Math.floor(Math.random() * 1_000_000_000),
        status: "idle",
      })),
    };

    setWorkflows((current) => [duplicate, ...current]);
    setCurrentPage(1);
    setExpandedIds((current) => [id, ...current]);
  };

  const handleDelete = (id: number) => {
    setWorkflows((current) =>
      current.filter((workflow) => workflow.id !== id)
    );

    setExpandedIds((current) =>
      current.filter((item) => item !== id)
    );
  };

  return {
    handleCreateWorkflow,
    handleDuplicate,
    handleDelete,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  };
}
