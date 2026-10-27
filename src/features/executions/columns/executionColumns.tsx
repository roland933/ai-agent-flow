
import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import { formatDate, formatDuration } from "@/helpers/format";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import type { Execution } from "../types/execution";
import StatusBadge from "@/features/ui/status/StatusBadge";
import { TableActions } from "@/features/ui/table/TableActions";
import { Play, Square } from "lucide-react";
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
        <StatusBadge status={execution.status} />

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
      header: "",
      cell: (execution) => (
        <TableActions
          actions={[
            {
              className:"text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300",
              key: `start-${execution.id}`,
              label: `start`,
              icon: <Play />,
              onClick: () => onStart(execution),
              visible: true,
            
            },
            {
              className:"text-rose-400 hover:bg-rose-400/10 hover:text-rose-300",
              key: `stop-${execution.id}`,
              label: `stop`,
              icon: <Square />,
              onClick: () => onStop(execution),
              visible: true,

            },
          ]}
        />

      ),
    },
  ];
}
