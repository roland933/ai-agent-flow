import { useMemo, useState } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Task, TaskStatus } from "../types/task";
import type { TaskStatuses } from "../consts/taskConsts";
import { useDeleteTask } from "./useDeleteTask";
import { useCreateAgentAssignment } from "./useCreateAgentAssignment";
import { useWorkflowStatus } from "./useWorkflowStatus";
import { useRunTask } from "./useRunTask";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useTasks() {
  const [task, setTask] = useState<Task | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [assignAgentDialogOpen, setAssignDialogOpen] = useState<boolean>(false)
  const [selectedTaskForAssignment, setSelectedTaskForAssignment] =
    useState<Task | null>(null);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<(typeof TaskStatuses)[number]>("All");
  const [agent, setAgent] = useState<string>("All")
  const tasks = useTaskStore((state) => state.tasks);
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const runTaskMutation = useRunTask();


  const deleteTaskMutation = useDeleteTask();
  const createAgentAssignmentMutation = useCreateAgentAssignment();

  const workflowStatusQuery = useWorkflowStatus(
    task?.id ?? 0,
    runTaskMutation.isSuccess
  );

  useEffect(() => {
    const status = workflowStatusQuery.data?.status;

    if (status === "completed" || status === "failed") {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["agent-assignments"] });
    }
  }, [workflowStatusQuery.data?.status, queryClient]);

  const handleRunTask = (task: Task) => {
    setTask(task);
    setRunDialogOpen(true);
  };


  const handleRunConfirm = () => {
    if (!task) return;

    runTaskMutation.mutate(task.id, {
      onSuccess: () => {
        setRunDialogOpen(false);
        setTask(null);
      },
    });
  };


  const totalTasks = useTaskStore((state) => state.tasks.length);

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

    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setTask(null);
      },
    });
  };

  const handleAssginAgentDialog = (task: Task) => {
    setAssignDialogOpen(true);
    setSelectedTaskForAssignment(task)
  }
  const handleAssignAgent = async (data: {
    agentIds: number[];
    title: string;
    description: string;
  }) => {
    if (!selectedTaskForAssignment) return;

    try {
      for (const agentId of data.agentIds) {
        await createAgentAssignmentMutation.mutateAsync({
          task_id: selectedTaskForAssignment.id,
          agent_id: agentId,
          title: data.title,
          description: data.description || null,
        });
      }

      setAssignDialogOpen(false);
      setSelectedTaskForAssignment(null);
    } catch (error) {
      console.error("Failed to assign agents:", error);
    }
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
    status,
    totalTasks,
    agent,
    setAgent,
    handleAssginAgentDialog,
    assignAgentDialogOpen,
    setAssignDialogOpen,
    selectedTaskForAssignment,
    handleAssignAgent,
    handleRunTask,
    handleRunConfirm,
    runDialogOpen,
    setRunDialogOpen,
    runTaskMutation,
    workflowStatus: workflowStatusQuery.data,
    isWorkflowStatusLoading: workflowStatusQuery.isLoading,

  };
}
