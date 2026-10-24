
import { create } from "zustand";

import { agents as initialAgents } from "../data/mock-data";
import type { Agent } from "@/features/agents/types/agent";
import type { CreateAgentInput } from "../types/createAgentInput";
import type { UpdateAgentInput } from "../types/updateAgentInput";

type AgentStore = {
  agents: Agent[];

  createAgent: (input: CreateAgentInput) => void;
  updateAgent: (id: number, input: UpdateAgentInput) => void;
  updateAgentStatus: (id: number, status: Agent["status"]) => void;
  deleteAgent: (id: number) => void;
};

export const useAgentStore = create<AgentStore>((set) => ({
  agents: initialAgents,

  createAgent: (input) =>
    set((state) => ({
      agents: [
        ...state.agents,
        {
          id: Math.max(0, ...state.agents.map((agent) => agent.id)) + 1,
          name: input.name.trim(),
          description: input.description.trim(),
          type: input.type,
          model: input.model,
          status: "Idle",
          tasksCompleted: 0,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  updateAgent: (id, input) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              name: input.name.trim(),
              description: input.description.trim(),
              type: input.type,
              model: input.model,
            }
          : agent,
      ),
    })),

  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, status } : agent,
      ),
    })),

  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id),
    })),
}));
