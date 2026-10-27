
import { ClipboardList, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import DataTable from "@/features/ui/table/DataTable";
import { TableToolbar } from "@/features/ui/table/TableToolbar";
import { FilterBox } from "@/features/ui/filter-box/FilterBox";
import { SearchInput } from "@/features/ui/input/SearchInput";
import Select from "@/features/ui/select/Select";
import { Button } from "@/features/ui/button/Button";

import { getTaskColumns } from "@/features/tasks/columns/taskColumns";
import CreateTaskDialog from "@/features/tasks/components/CreateTaskDialog";
import EditTaskDialog from "../components/EditTaskDialog";
import { DeleteTaskDialog } from "../components/DeleteTaskDialog";
import { TaskStatuses } from "../consts/taskConsts";
import { useTasks } from "../hooks/useTasks";
import AgentSelect from "@/components/common/ui/AgentSelect";
import { useState } from "react";


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
    totalTasks,
    agent,
    setAgent
  } = useTasks();

  const columns = getTaskColumns({
    onDeleteTask: deleteTask,
  });


  const handleResetFilters = () => {
    setSearch("");
    setStatus("All" as (typeof TaskStatuses)[number]);
  };

  const statusOptions = TaskStatuses.map((item) => ({
    label: item === "All" ? "All statuses" : item,
    value: item,
  }));

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

      <HeaderLayout
        title="Tasks"
        subTitle="Track and manage your AI agent tasks."
        icon={<ClipboardList size={24} />}
      >
        <Button
          title="Create Task"
          icon={<Plus size={17} />}
          onClick={() => setCreateDialogOpen(true)}
        />
      </HeaderLayout>

      <FilterBox onReset={handleResetFilters}>
        <SearchInput
          label="Search"
          placeholder="Search tasks"
          value={search}
          onChange={setSearch}
        />

        <Select
          label="Status"
          value={status}
          onChange={(value) =>
            setStatus(value as (typeof TaskStatuses)[number])
          }
          options={statusOptions}
        />

        <AgentSelect  value={agent} onChange={setAgent}/>


      </FilterBox>

      <TableToolbar
        filteredCount={filteredTasks.length}
        totalCount={totalTasks}
        itemName="tasks"
      />

      <DataTable
        columns={columns}
        data={filteredTasks}
        getRowId={(task) => task.id}
        onRowClick={(task) => selectedTask(task)}
      />
    </DashboardLayout>
  );
}
