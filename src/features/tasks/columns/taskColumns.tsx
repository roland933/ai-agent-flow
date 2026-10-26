
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgentStore } from "@/features/agents/store/agentStore";
import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import { StatusIcons, StatusStyles } from "../consts/taskConsts";
import type { Task } from "../types/task";

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
          <span className="text-slate-400">
            {agent?.name ?? "Unassigned"}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (task) => {
        const StatusIcon = StatusIcons[task.status];

        return (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${StatusStyles[task.status]}`}
          >
            <StatusIcon size={14} />
            {task.status}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (task) => (
        <span className="whitespace-nowrap text-slate-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "id",
      header: "Actions",
      cell: (task) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-red-400"
            onClick={(event) => {
              event.stopPropagation();
              onDeleteTask(task);
            }}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      ),
    },
  ];
}
