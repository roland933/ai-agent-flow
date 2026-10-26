import type { Agent } from "@/features/agents/types/agent";
import StatusBadge from "@/features/ui/status/StatusBadge";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";

export const overviewAgentColumns: DataTableColumn<Agent>[] = [
  {
    key: "name",
    header: "Agent",
    cell: (agent) => (
      <div>
        <p className="font-medium text-slate-100">{agent.name}</p>
        <p className="mt-1 max-w-md text-xs text-slate-400">
          {agent.description}
        </p>
      </div>
    ),
  },
  {
    key: "model",
    header: "Model",
    cell: (agent) => (
      <span className="text-slate-300">{agent.model}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (agent) => (
      <StatusBadge status={agent.status} />
    ),
  },
  {
    key: "tasksCompleted",
    header: "Completed tasks",
    className: "text-right",
    cell: (agent) => (
      <span className="font-medium tabular-nums text-slate-200">
        {agent.tasksCompleted}
      </span>
    ),
  },
];
