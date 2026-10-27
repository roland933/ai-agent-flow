
import { Trash2 } from "lucide-react";
import { useAgentStore } from "@/features/agents/store/agentStore";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import type { Task } from "../types/task";
import { TableActions } from "@/features/ui/table/TableActions";
import StatusBadge from "@/features/ui/status/StatusBadge";

type TaskColumnActions = {
  onDeleteTask: (task: Task) => void;
};

export function getTaskColumns({
  onDeleteTask,
}: TaskColumnActions): DataTableColumn<Task>[] {
  const agents = useAgentStore.getState().agents;

  return [
    {
      key: "title",
      header: "Task",
      cell: (task) => (
        <div>
          <p className="font-medium text-slate-200">{task.title}</p>
          <p className="mt-1 max-w-md text-xs text-slate-500">
            {task.description}
          </p>
        </div>
      ),
    },
    {
      key: "agentId",
      header: "Assigned Agent",
      cell: (task) => {
        const agent = agents.find((item) => item.id === task.agentId);

        return (
          <span className="text-slate-300">
            {agent?.name ?? "Unassigned"}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (task) => {
        return (
           <StatusBadge status={task.status} />
         
        );
      },
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (task) => (
        <span className="whitespace-nowrap text-slate-300">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "id",
      header: "",
      cell: (task) => (
        <TableActions
          actions={[
            {
              key:  `Delete ${task.title}`,
              label: `Delete `,
              icon: <Trash2 size={16} />,
              onClick: () => onDeleteTask(task),
              visible: true,

            },
          ]}
        />

      ),
    },
  ];
}
