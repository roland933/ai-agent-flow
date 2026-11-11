import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/task-api";
import type { Task, UpdateTaskInput } from "../types/task";
import { mapApiTask } from "../utils/taskAdapter";
import { useTaskStore } from "../store/taskStore";

export function useUpdateTask() {
    const queryClient = useQueryClient();
    const setTasks = useTaskStore((state) => state.setTasks);

    return useMutation({
        mutationFn: ({ id, data, }: { id: number; data: UpdateTaskInput; }) => updateTask(id, data),

        onSuccess: (apiTask) => {
            const task = mapApiTask(apiTask);

            queryClient.setQueryData(
                ["tasks"],
                (oldTasks: Task[] | undefined) =>
                    (oldTasks ?? []).map((oldTask) =>
                        oldTask.id === task.id ? task : oldTask
                    ),
            );

            setTasks(queryClient.getQueryData<Task[]>(["tasks"]) ?? []);
        },

        onError: (error) => {
            console.log(error.message);
        },
    });
}