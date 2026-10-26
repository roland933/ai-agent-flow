import { Bot, Pencil, Trash2,Eye } from "lucide-react";
import type { Agent } from "@/features/agents/types/agent";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import { Button } from "@/components/ui/button";

type AgentColumnActions = {
  onEdit: (agent: Agent) => void;
  onDelete: (agent: Agent) => void;
  onView: (agent: Agent) => void;
};

export function getAgentColumns({
  onEdit,
  onDelete,
  onView,
}: AgentColumnActions): DataTableColumn<Agent>[] {
  return [
    {
      key: "name",
      header: "Agent",
      cell: (agent) => (
        <button
          className="flex items-center gap-3 text-left font-medium hover:text-primary hover:cursor-pointer"
          onClick={() => onView(agent)}
        >
          <span className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
            <Bot size={18} />
          </span>
          {agent.name}
        </button>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "max-w-sm",
    },
    {
      key: "status",
      header: "Status",
      cell: (agent) => {
        const statusStyles: Record<Agent["status"], string> = {
          Running: "bg-blue-100 text-blue-800",
          Idle: "bg-slate-100 text-slate-700",
          Error: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[agent.status]}`}
          >
            {agent.status}
          </span>
        );
      },
    },
    {
      key: "model",
      header: "Model",
    },
    {
      key: "tasksCompleted",
      header: "Tasks completed",
      className: "text-right",
    },
    {
      key: "id",
      header: "Actions",
      cell: (agent) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Edit ${agent.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onEdit(agent);
            }}
          >
            <Pencil size={16} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={`Delete ${agent.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(agent);
            }}
          >
            <Trash2 size={16} />
          </Button>
            <Button
            variant="ghost"
            size="icon"
            aria-label={`Delete ${agent.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onView(agent);
            }}
          >
            <Eye size={16} />
          </Button> 
        </div>
      ),
    },
  ];
}