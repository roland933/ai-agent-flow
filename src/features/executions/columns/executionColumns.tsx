
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import { formatDate, formatDuration } from "@/helpers/format";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import { statusStyles } from "../consts/statusStyles";
import type { Execution } from "../types/execution";

type ExecutionColumnActions = {
  onStart: (execution: Execution) => void;
  onStop: (execution: Execution) => void;
};

export function getExecutionColumns({
  onStart,
  onStop,
}: ExecutionColumnActions): DataTableColumn<Execution>[] {
  const tasks = useTaskStore.getState().tasks;
  const agents = useAgentStore.getState().agents;

  return [
    {
      key: "id",
      header: "Execution",
      cell: (execution) => (
        <span className="font-medium">#{execution.id}</span>
      ),
    },
    {
      key: "taskId",
      header: "Task",
      cell: (execution) => {
        const task = tasks.find((item) => item.id === execution.taskId);
        return task?.title ?? "Unknown task";
      },
    },
    {
      key: "agentId",
      header: "Agent",
      cell: (execution) => {
        const agent = agents.find((item) => item.id === execution.agentId);
        return agent?.name ?? "Unassigned";
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (execution) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            statusStyles[execution.status]
          }`}
        >
          {execution.status}
        </span>
      ),
    },
    {
      key: "startedAt",
      header: "Started",
      cell: (execution) => formatDate(execution.startedAt),
    },
    {
      key: "durationMs",
      header: "Duration",
      cell: (execution) =>
        execution.status === "Running"
          ? "In progress"
          : formatDuration(execution.durationMs),
    },
    {
      key: "id",
      header: "Actions",
      cell: (execution) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              onStart(execution);
            }}
          >
            Start
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={(event) => {
              event.stopPropagation();
              onStop(execution);
            }}
          >
            Stop
          </Button>
        </div>
      ),
    },
  ];
}
