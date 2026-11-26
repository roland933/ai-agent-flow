import type { Workflow } from "../types/workflow";

export const initialWorkflows: Workflow[] = [
  {
    id: 1,
    name: "Market Research",
    description: "Research and analyze market opportunities.",
    taskTitle: "Prepare a market research report",
    taskStatus: "draft",
    assignments: [
      { id: 1, agentName: "Research Agent", instructions: "Research competitors and collect market data.", status: "idle" },
      { id: 2, agentName: "Data Analyst", instructions: "Analyze collected data and identify trends.", status: "idle" },
      { id: 3, agentName: "Report Agent", instructions: "Prepare a final report based on the analysis.", status: "idle" },
    ],
  },
  {
    id: 2,
    name: "Content Creation",
    description: "Create and review content with AI agents.",
    taskTitle: "Create a blog article",
    taskStatus: "draft",
    assignments: [
      { id: 4, agentName: "Research Agent", instructions: "Collect relevant information about the topic.", status: "idle" },
      { id: 5, agentName: "Writer Agent", instructions: "Write an article using the research.", status: "idle" },
    ],
  },
];