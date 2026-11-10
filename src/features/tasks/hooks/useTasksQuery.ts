import { useQuery } from "@tanstack/react-query";
import { useTaskStore } from "../store/taskStore";
import { mapApiTask } from "../utils/taskAdapter";
import { getTasks } from "../api/task-api";

export function useTasksQuery() {
  const setTasks = useTaskStore((state) => state.setTasks);

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await getTasks()

      const tasks = data.map(mapApiTask);

      setTasks(tasks);

      return tasks;
    },
  });
}