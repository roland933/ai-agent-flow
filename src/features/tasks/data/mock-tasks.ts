
import type { Task } from "../types/task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Research React Server Components",
    description: "Gather and analyze information about React Server Components.",
    status: "Running",
    agentId: 1,
    createdAt: "2026-10-24T09:30:00",
  },
  {
    id: 2,
    title: "Analyze competitor pricing",
    description: "Compare competitor products and summarize their pricing.",
    status: "Pending",
    agentId: 2,
    createdAt: "2026-10-24T10:15:00",
  },
  {
    id: 3,
    title: "Generate weekly report",
    description: "Prepare a summary of this week's execution metrics.",
    status: "Completed",
    agentId: 3,
    createdAt: "2026-10-23T14:00:00",
  },
  {
    id: 4,
    title: "Review API error logs",
    description: "Identify recurring errors and suggest possible fixes.",
    status: "Failed",
    agentId: 2,
    createdAt: "2026-10-23T16:45:00",
  },
  {
    id: 5,
    title: "Prepare blog post outline",
    description: "Create an outline for an article about AI agents.",
    status: "Pending",
    agentId: null,
    createdAt: "2026-10-24T11:20:00",
  },
];
