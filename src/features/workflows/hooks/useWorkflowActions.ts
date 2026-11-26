
import type { Dispatch, SetStateAction } from "react";

import type { Workflow } from "../types/workflow";
import type { CreateWorkflowData } from "../components/CreateWorkflowDialog";

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
  const handleCreateWorkflow = (data: CreateWorkflowData) => {
    const id = Date.now();

    const newWorkflow: Workflow = {
      id,
      name: data.name,
      description: data.description,
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      outputName: data.outputName,
      outputDescription: data.outputDescription,
      outputFormat: data.outputFormat,
      taskStatus: "draft",
      assignments: [],
    };

    setWorkflows((current) => [newWorkflow, ...current]);
    setCurrentPage(1);
    setExpandedIds((current) => [id, ...current]);
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
  };
}
