
import { useState } from "react";

import type { Workflow } from "../types/workflow";
import type { CreateWorkflowData } from "../components/CreateWorkflowDialog";

interface UseWorkflowEditorProps {
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
}

export function useWorkflowEditor({
  setWorkflows,
}: UseWorkflowEditorProps) {
  const [editWorkflowDialogOpen, setEditWorkflowDialogOpen] =
    useState(false);

  const [editingWorkflowId, setEditingWorkflowId] =
    useState<number | null>(null);

  const [editingWorkflowData, setEditingWorkflowData] =
    useState<CreateWorkflowData | null>(null);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const [editingTaskWorkflowId, setEditingTaskWorkflowId] =
    useState<number | null>(null);

  const openEditWorkflow = (workflow: Workflow) => {
    setEditingWorkflowId(workflow.id);

    setEditingWorkflowData({
      name: workflow.name,
      description: workflow.description,
      taskTitle: workflow.taskTitle,
      taskDescription: workflow.taskDescription,
      outputName: workflow.outputName,
      outputDescription: workflow.outputDescription,
      outputFormat: workflow.outputFormat,
    });

    setEditWorkflowDialogOpen(true);
  };

  const handleSaveWorkflow = (data: CreateWorkflowData) => {
    if (editingWorkflowId === null) return;

    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === editingWorkflowId
          ? { ...workflow, ...data }
          : workflow
      )
    );

    setEditWorkflowDialogOpen(false);
    setEditingWorkflowId(null);
    setEditingWorkflowData(null);
  };

  const handleSaveWorkflowTask = (data: {
    title: string;
    description: string;
  }) => {
    if (editingTaskWorkflowId === null) return;

    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === editingTaskWorkflowId
          ? {
              ...workflow,
              taskTitle: data.title,
              taskDescription: data.description,
            }
          : workflow
      )
    );

    setTaskDialogOpen(false);
    setEditingTaskWorkflowId(null);
  };

  const openEditTask = (workflowId: number) => {
    setEditingTaskWorkflowId(workflowId);
    setTaskDialogOpen(true);
  };

  const closeEditWorkflow = (open: boolean) => {
    setEditWorkflowDialogOpen(open);

    if (!open) {
      setEditingWorkflowId(null);
      setEditingWorkflowData(null);
    }
  };

  const closeEditTask = (open: boolean) => {
    setTaskDialogOpen(open);

    if (!open) {
      setEditingTaskWorkflowId(null);
    }
  };

  return {
    editWorkflowDialogOpen,
    setEditWorkflowDialogOpen,
    editingWorkflowId,
    editingWorkflowData,
    taskDialogOpen,
    editingTaskWorkflowId,
    openEditWorkflow,
    handleSaveWorkflow,
    handleSaveWorkflowTask,
    openEditTask,
    closeEditWorkflow,
    closeEditTask,
  };
}
