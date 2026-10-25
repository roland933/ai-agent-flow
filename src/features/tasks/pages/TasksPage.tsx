import { ClipboardList, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskList from "@/features/tasks/components/TaskList";
import { TaskStatuses } from "../consts/taskConsts";

import CreateTaskDialog from "@/features/tasks/components/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import EditTaskDialog from "../components/EditTaskDialog";
import { DeleteTaskDialog } from "../components/DeleteTaskDialog";
import { useTasks } from "../hooks/useTasks";

export default function TasksPage() {
  
  const {
    task,
    selectedTask,
    deleteTask,
    handleDeleteConfirm,
    handleEditDialogChange,
    editDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    setCreateDialogOpen,
    createDialogOpen,
    filteredTasks,
    search,
    setSearch,
    setStatus,
    status,
  } = useTasks();

  return (
    <DashboardLayout>
      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <EditTaskDialog
        task={task}
        open={editDialogOpen}
        onOpenChange={handleEditDialogChange}
      />

      <DeleteTaskDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onContinue={handleDeleteConfirm}
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
              <ClipboardList size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Tasks</h1>
              <p className="mt-1 text-sm text-slate-400">
                Track and manage your AI agent tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setCreateDialogOpen(true)}>Create Task</Button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-800 bg-[#101827] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as (typeof TaskStatuses)[number])
          }
          className="rounded-lg border border-slate-800 bg-[#101827] px-4 py-2.5 text-sm"
        >
          {TaskStatuses.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All statuses" : item}
            </option>
          ))}
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        onSelectTask={selectedTask}
        onDeleteTask={deleteTask}
      />
    </DashboardLayout>
  );
}
