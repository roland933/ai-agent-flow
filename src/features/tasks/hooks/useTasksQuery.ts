import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { useTaskStore } from "../store/taskStore";
import { mapApiTask, type ApiTask } from "../utils/taskAdapter";

export function useTasksQuery() {
  const setTasks = useTaskStore((state) => state.setTasks);

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await apiClient<ApiTask[]>("/tasks");

      const tasks = data.map(mapApiTask);

      setTasks(tasks);

      return tasks;
    },
  });
}