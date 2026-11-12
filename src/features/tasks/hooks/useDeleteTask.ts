import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/task-api";
import type { Task } from "../types/task";
import { useTaskStore } from "../store/taskStore";

export function useDeleteTask() {
    const queryClient = useQueryClient();
    const setTasks = useTaskStore((state) => state.setTasks);

    return useMutation({
        mutationFn: (id: number) => deleteTask(id),

        onSuccess: (_, id) => {
            queryClient.setQueryData(
                ["tasks"],
                (oldTasks: Task[] | undefined) =>
                    (oldTasks ?? []).filter((task) => task.id !== id),
            );

            setTasks(queryClient.getQueryData<Task[]>(["tasks"]) ?? []);
        },

        onError: (error) => {
            console.log(error.message);
        },
    });
}