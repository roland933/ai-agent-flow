import { create } from "zustand";

import { mockExecutions } from "@/features/executions/data/mock-executions";
import type {
  Execution,
  ExecutionStatus,
} from "@/features/executions/types/execution";

type ExecutionStore = {
  executions: Execution[];
  createExecution: (taskId: number, agentId: number | null) => number;
  updateExecutionStatus: (
    id: number,
    status: ExecutionStatus,
  ) => void;
};

export const useExecutionStore = create<ExecutionStore>((set) => ({
  executions: mockExecutions,

createExecution: (taskId, agentId) => {
  let newId = 0;

  set((state) => {
    newId =
      Math.max(0, ...state.executions.map((execution) => execution.id)) + 1;

    return {
      executions: [
        ...state.executions,
        {
          id: newId,
          taskId,
          agentId,
          status: "Queued",
          startedAt: null,
          completedAt: null,
          durationMs: null,
          result: null,
          error: null,
        },
      ],
    };
  });

  return newId;
},

  updateExecutionStatus: (id, status) =>
    set((state) => ({
      executions: state.executions.map((execution) => {
        if (execution.id !== id) return execution;

        const now = new Date().toISOString();

        return {
          ...execution,
          status,
          ...(status === "Running" && {
            startedAt: now,
            completedAt: null,
            durationMs: null,
            result: null,
            error: null,
          }),
          ...(["Completed", "Failed", "Cancelled"].includes(status) && {
            completedAt: now,
            durationMs: execution.startedAt
              ? new Date(now).getTime() -
              new Date(execution.startedAt).getTime()
              : null,
          }),
        };
      }),
    })),
}));