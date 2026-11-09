import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import type { Task } from "../types/task";
import { useTaskStore } from "../store/taskStore";

export function useTasksQuery() {
  const setTasks = useTaskStore((state) => state.setTasks);

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await apiClient<Task[]>("/tasks");

      setTasks(tasks);

      return tasks;
    },
  });
}