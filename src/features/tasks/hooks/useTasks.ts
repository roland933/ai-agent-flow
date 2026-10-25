import { useMemo, useState } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Task, TaskStatus } from "../types/task";
import type { TaskStatuses } from "../consts/taskConsts";

export function useTasks() {
  const [task, setTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<(typeof TaskStatuses)[number]>("All");

  const tasks = useTaskStore((state) => state.tasks);

  const deleteTaskFromStore = useTaskStore((state) => state.deleteTask);

  const selectedTask = (task: Task) => {
    setTask(task);
    setEditDialogOpen(true);
  };

  const deleteTask = (task: Task) => {
    setTask(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!task) return;

    deleteTaskFromStore(task.id);
    setDeleteDialogOpen(false);
    setTask(null);
  };

  const handleEditDialogChange = (open: boolean) => {
    setEditDialogOpen(open);

    if (!open) {
      setTask(null);
    }
  };

  const filteredTasks = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm);

      const matchesStatus =
        status === "All" || task.status === (status as TaskStatus);

      return matchesSearch && matchesStatus;
    });
  }, [search, status, tasks]);

  return {
    tasks,
    task,
    deleteTask,
    selectedTask,
    handleDeleteConfirm,
    editDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleEditDialogChange,
    createDialogOpen,
    setCreateDialogOpen,
    filteredTasks,
    search,
    setStatus,
    setSearch,
    status
  };
}
