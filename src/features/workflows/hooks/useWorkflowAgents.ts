
import { useState } from "react";

import { useAgentStore } from "@/features/agents/store/agentStore";

import type { Workflow, WorkflowAssignment, AgentStatus } from "../types/workflow";
import { WORKFLOW_CONFIG } from "../config/config";


interface UseWorkflowAgentsProps {
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
}

interface AssignmentFormData {
  agentId: number;
  instructions: string;
}

export function useWorkflowAgents({
  setWorkflows,
}: UseWorkflowAgentsProps) {
  const agents = useAgentStore((state) => state.agents);

  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);

  const [editingAssignment, setEditingAssignment] = useState<{
    workflowId: number;
    assignmentId: number | null;
  } | null>(null);

  const openEditAssignmentModal = (
    workflowId: number,
    assignment: WorkflowAssignment
  ) => {
    setEditingAssignment({
      workflowId,
      assignmentId: assignment.id,
    });

    setAssignmentModalOpen(true);
  };

  const openAddAssignmentModal = (workflowId: number) => {
    setEditingAssignment({
      workflowId,
      assignmentId: null,
    });

    setAssignmentModalOpen(true);
  };

  const handleSaveAssignment = (data: AssignmentFormData) => {
    if (!editingAssignment) return;

    const selectedAgent = agents.find(
      (agent) => agent.id === data.agentId
    );

    if (!selectedAgent) return;

    setWorkflows((prev) =>
      prev.map((workflow) => {
        if (workflow.id !== editingAssignment.workflowId) {
          return workflow;
        }

        if (editingAssignment.assignmentId === null) {
          if (
            workflow.assignments.length >= WORKFLOW_CONFIG.MAX_AGENTS
          ) {
            return workflow;
          }

          return {
            ...workflow,
            assignments: [
              ...workflow.assignments,
              {
                id: Date.now(),
                agentId: selectedAgent.id,
                agentName: selectedAgent.name,
                instructions: data.instructions,
                status: "idle" as AgentStatus,
              },
            ],
          };
        }

        return {
          ...workflow,
          assignments: workflow.assignments.map((assignment) =>
            assignment.id === editingAssignment.assignmentId
              ? {
                  ...assignment,
                  agentId: selectedAgent.id,
                  agentName: selectedAgent.name,
                  instructions: data.instructions,
                }
              : assignment
          ),
        };
      })
    );

    setEditingAssignment(null);
  };

  const handleDeleteAgent = (
    workflowId: number,
    assignmentId: number
  ) => {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              assignments: workflow.assignments.filter(
                (assignment) => assignment.id !== assignmentId
              ),
            }
          : workflow
      )
    );
  };

  return {
    agents,
    assignmentModalOpen,
    setAssignmentModalOpen,
    editingAssignment,
    setEditingAssignment,
    openEditAssignmentModal,
    openAddAssignmentModal,
    handleSaveAssignment,
    handleDeleteAgent,
  };
}
