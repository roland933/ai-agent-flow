import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/task-api";
import type { CreateTaskInput, Task } from "../types/task";
import { mapApiTask } from "../utils/taskAdapter";
import { useTaskStore } from "../store/taskStore";

export function useCreateTask() {
    const queryClient = useQueryClient();
    const setTasks = useTaskStore((state) => state.setTasks);

    return useMutation({
        mutationFn: (data: CreateTaskInput) => createTask(data),

        onSuccess: (apiTask) => {
            const task = mapApiTask(apiTask);

            queryClient.setQueryData(
                ["tasks"],
                (oldTasks: typeof task[] | undefined) => [
                    ...(oldTasks ?? []),
                    task,
                ],
            );

            setTasks(queryClient.getQueryData<Task[]>(["tasks"]) ?? [])

        },
        onError: (error) => {
            console.log(error.message);
        }
    });
}