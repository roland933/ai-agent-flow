
import { Trash2,UserPlus } from "lucide-react";

import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import type { Task } from "../types/task";
import { TableActions } from "@/features/ui/table/TableActions";
import StatusBadge from "@/features/ui/status/StatusBadge";
import { AssignedAgentsCell } from "../components/AssignedAgentsCell";
type TaskColumnActions = {
  onDeleteTask: (task: Task) => void;
  onAssignAgent:(task:Task) => void
  handleOpenAssignments:(task:Task) => void
};

export function getTaskColumns({
  onDeleteTask,
  onAssignAgent,
  handleOpenAssignments
}: TaskColumnActions): DataTableColumn<Task>[] {

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
  header: "Assigned Agents",
  cell: (task) => (
    <AssignedAgentsCell task={task} handleOpenAssignments={handleOpenAssignments} />
  ),
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
              key:  `Assign ${task.title}`,
              label: `Assign`,
              icon: <UserPlus size={16} />,
              onClick: () => onAssignAgent(task),
              visible: true,

            },
            {
              key:  `Delete ${task.title}`,
              label: `Delete `,
              icon: <Trash2 size={16} />,
              onClick: () => onDeleteTask(task),
              visible: task.status !== "Completed",

            },
            
          ]}
        />

      ),
    },
  ];
}
