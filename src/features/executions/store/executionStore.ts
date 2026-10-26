import { create } from "zustand";

import { mockExecutions } from "@/features/executions/data/mock-executions";
import type {
  Execution,
  ExecutionStatus,
} from "@/features/executions/types/execution";

type ExecutionStore = {
  executions: Execution[];

  updateExecutionStatus: (
    id: number,
    status: ExecutionStatus,
  ) => void;
};

export const useExecutionStore = create<ExecutionStore>((set) => ({
  executions: mockExecutions,

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