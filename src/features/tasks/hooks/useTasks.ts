import { useMemo, useState } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Task, TaskStatus } from "../types/task";
import type { TaskStatuses } from "../consts/taskConsts";
import { useExecutionStore } from "@/features/executions/store/executionStore";

export function useTasks() {
  const [task, setTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<(typeof TaskStatuses)[number]>("All");
    const [agent, setAgent] = useState<string>("All")
  const tasks = useTaskStore((state) => state.tasks);

  const deleteTaskFromStore = useTaskStore((state) => state.deleteTask);

  const executions = useExecutionStore((state) => state.executions);

    const totalTasks = useTaskStore((state) => state.tasks.length);

  const selectedTask = (task: Task) => {
    setTask(task);
    setEditDialogOpen(true);
  };

  const deleteTask = (task: Task) => {
    setTask(task);
    setDeleteDialogOpen(true);
  };

  const updateTaskStatus = useTaskStore(
    (state) => state.updateTaskStatus,
  );

  const handleDeleteConfirm = () => {
    if (!task) return;

    deleteTaskFromStore(task.id);
    setDeleteDialogOpen(false);
    setTask(null);
  };

  const handleStartTask = (task: Task) => {
    if (task.status === "Running") return;

    const queuedExecution = executions.find(
      (execution) =>
        execution.taskId === task.id &&
        execution.status === "Queued",
    );

    const executionId = queuedExecution
      ? queuedExecution.id
      : createExecution(task.id, task.agentId);

    updateTaskStatus(task.id, "Running");
    updateExecutionStatus(executionId, "Running");
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

  const createExecution = useExecutionStore(
    (state) => state.createExecution,
  );

  const updateExecutionStatus = useExecutionStore(
    (state) => state.updateExecutionStatus,
  );

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
    status,
    handleStartTask,
    totalTasks,
    agent,
    setAgent,

  };
}
