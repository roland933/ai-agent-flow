
import type { Dispatch, SetStateAction } from "react";

import type { Workflow } from "../types/workflow";

interface UseWorkflowRunnerProps {
  setWorkflows: Dispatch<SetStateAction<Workflow[]>>;
}

export function useWorkflowRunner({
  setWorkflows,
}: UseWorkflowRunnerProps) {
  const handleRun = async (workflow: Workflow) => {
    if (
      workflow.taskStatus === "running" ||
      workflow.assignments.length === 0
    ) {
      return;
    }

    const workflowId = workflow.id;

    setWorkflows((current) =>
      current.map((item) =>
        item.id === workflowId
          ? {
              ...item,
              taskStatus: "running",
              assignments: item.assignments.map((assignment, index) => ({
                ...assignment,
                status: index === 0 ? "running" : "pending",
              })),
            }
          : item
      )
    );

    // Demo-only sequential execution.
    for (let index = 0; index < workflow.assignments.length; index++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setWorkflows((current) =>
        current.map((item) =>
          item.id === workflowId
            ? {
                ...item,
                assignments: item.assignments.map(
                  (assignment, assignmentIndex) => ({
                    ...assignment,
                    status:
                      assignmentIndex <= index
                        ? "completed"
                        : assignmentIndex === index + 1
                          ? "running"
                          : "pending",
                  })
                ),
              }
            : item
        )
      );
    }

    setWorkflows((current) =>
      current.map((item) =>
        item.id === workflowId
          ? {
              ...item,
              taskStatus: "completed",
              assignments: item.assignments.map((assignment) => ({
                ...assignment,
                status: "completed",
              })),
            }
          : item
      )
    );
  };

  return {
    handleRun,
  };
}
