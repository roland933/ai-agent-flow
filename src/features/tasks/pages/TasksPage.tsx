
import { ClipboardList, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import DataTable from "@/features/ui/table/DataTable";
import { getTaskColumns } from "@/features/tasks/columns/taskColumns";
import CreateTaskDialog from "@/features/tasks/components/CreateTaskDialog";
import EditTaskDialog from "../components/EditTaskDialog";
import { DeleteTaskDialog } from "../components/DeleteTaskDialog";
import { TaskStatuses } from "../consts/taskConsts";
import { useTasks } from "../hooks/useTasks";
import { HeaderLayout } from "@/components/layout/HeaderLayout";

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

  const columns = getTaskColumns({
    onDeleteTask: deleteTask,
  });

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
      
      <HeaderLayout title="Tasks" 
                    subTitle="Track and manage your AI agent tasks." 
                    icon={<ClipboardList size={24} />
                    
                    }>
        
       <Button onClick={() => setCreateDialogOpen(true)}>
          Create Task
        </Button>
      </HeaderLayout>
     

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

      <DataTable
        columns={columns}
        data={filteredTasks}
        getRowId={(task) => task.id}
        onRowClick={(task) => selectedTask(task)}
      />
    </DashboardLayout>
  );
}
