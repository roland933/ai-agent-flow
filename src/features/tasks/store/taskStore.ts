
import { create } from "zustand";

import { mockTasks } from "@/features/tasks/data/mock-tasks";
import type { CreateTaskInput, Task, TaskStatus,UpdateTaskInput } from "@/features/tasks/types/task";

type TaskStore = {
  tasks: Task[];
  createTask: (input: CreateTaskInput) => void;
  updateTask: (id: number, input: UpdateTaskInput) => void;
  updateTaskStatus: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: mockTasks,

  createTask: (input) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Math.max(0, ...state.tasks.map((task) => task.id)) + 1,
          title: input.title.trim(),
          description: input.description.trim(),
          agentId: input.agentId,
          status: "Pending",
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  updateTask: (id, input) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: input.title.trim(),
              description: input.description.trim(),
              agentId: input.agentId,
              status: input.status,
            }
          : task,
      ),
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
