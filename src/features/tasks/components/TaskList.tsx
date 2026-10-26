

import type { Task } from "../types/task";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { StatusIcons, StatusStyles } from "../consts/taskConsts";
import { Button } from "@base-ui/react";

type TaskListProps = {
  tasks: Task[];
  onSelectTask?: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onSelectTask,
  onDeleteTask,
}: TaskListProps) {
  const agents = useAgentStore((state) => state.agents);

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-[#101827] p-10 text-center">
        <p className="font-medium text-slate-200">No tasks found</p>
        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#101827]">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-500">
          <tr className="border-b border-slate-800">
            <th className="px-5 py-3 font-medium">Task</th>
            <th className="px-5 py-3 font-medium">Assigned Agent</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Created</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => {
            const agent = agents.find(
              (item) => item.id === task.agentId,
            );
            const StatusIcon = StatusIcons[task.status];

            return (

              <tr
                key={task.id}
                onClick={() => onSelectTask?.(task)}
                className={`border-b border-slate-800/70 last:border-0 ${onSelectTask
                    ? "cursor-pointer hover:bg-slate-800/30"
                    : ""
                  }`}
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-200">
                    {task.title}
                  </p>
                  <p className="mt-1 max-w-md text-xs text-slate-500">
                    {task.description}
                  </p>
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {agent?.name ?? "Unassigned"}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${StatusStyles[task.status]}`}
                  >
                    <StatusIcon size={14} />
                    {task.status}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-3">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteTask(task);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
