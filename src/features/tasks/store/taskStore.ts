
import { create } from "zustand";


import type { Task, TaskStatus } from "@/features/tasks/types/task";

type TaskStore = {
  tasks: Task[];

  updateTaskStatus: (id: number, status: TaskStatus) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks:(tasks) => set({tasks}),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    })),


}));
