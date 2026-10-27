import { Bot, Pencil, Trash2,Eye } from "lucide-react";
import type { Agent } from "@/features/agents/types/agent";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import StatusBadge from "@/features/ui/status/StatusBadge";
import { TableActions } from "@/features/ui/table/TableActions";

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
          className="flex items-center gap-3 text-left font-medium hover:text-emerald-400 hover:cursor-pointer"
          onClick={() => onView(agent)}
        >
          <span className="rounded-lg bg-emerald-500/10 p-2 text-emerald-300">
            <Bot size={18} />
          </span>
          {agent.name}
        </button>
      ),
    },
     {
      key: "type",
      header: "Agent type",
     
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
    
        return (
           <StatusBadge status={agent.status} />
        
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
      header: "",
      cell: (agent) => (
        <TableActions
            actions={[
              {
                key: "edit",
                label: `Edit ${agent.name}`,
                icon: <Pencil size={16} />,
                onClick: () => onEdit(agent),
                visible: true,
              },
             
              {
                key: "view",
                label: `View ${agent.name}`,
                icon: <Eye size={16} />,
                onClick: () => onView(agent),
                visible: true,
              },

               {
                key: "delete",
                label: `Delete ${agent.name}`,
                icon: <Trash2 size={16} />,
                onClick: () => onDelete(agent),
                visible: true,
                
              },
            ]}
          />
      ),
    },
  ];
}