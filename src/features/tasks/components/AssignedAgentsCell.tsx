import { useState } from "react";

import { useAgentAssignmentsQuery } from "../hooks/useAgentAssignmentsQuery";

import type { Task } from "../types/task";

type AssignedAgentsCellProps = {
  task: Task;
  handleOpenAssignments: (task:Task) => void
};

export function AssignedAgentsCell({ task,handleOpenAssignments }: AssignedAgentsCellProps) {
  const { data: assignments, isLoading, isError } =
    useAgentAssignmentsQuery(task?.id);

  if (isLoading) {
    return <span className="text-slate-500">Loading...</span>;
  }

  if (isError) {
    return <span className="text-red-400">Failed to load</span>;
  }

  const count = assignments?.length ?? 0;

  if (count === 0) {
    return <span className="text-slate-500">Unassigned</span>;
  }

  return (
    <>

    <button
      type="button"
      onClick={(event) => {
            event.stopPropagation();
            handleOpenAssignments(task);
        }}
      className="rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-500/20"
    >
      {count} {count === 1 ? "Agent" : "Agents"}
    </button>
    </>
  );
}