
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { agents as initialAgents } from "../data/mock-data";
import type { UpdateAgentInput } from "@/types/updateAgentInput";
import type { CreateAgentInput } from "@/types/createAgentInput";

export type Agent = (typeof initialAgents)[number] & {
  type?: string;
  createdAt?: string;
};

type AgentContextValue = {
  agents: Agent[];
  createAgent: (input: CreateAgentInput) => void;
  deleteAgent: (id: number) => void;
  updateAgent: (id: number, input: UpdateAgentInput) => void;
   updateAgentStatus: (
    id: number,
    status: Agent["status"],
  ) => void;

};

const AgentContext = createContext<AgentContextValue | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  function updateAgentStatus(
  id: number,
  status: Agent["status"],
) {
  setAgents((current) =>
    current.map((agent) =>
      agent.id === id
        ? { ...agent, status }
        : agent,
    ),
  );
}

  function createAgent(input: CreateAgentInput) {
    const newAgent: Agent = {
      id: Math.max(0, ...agents.map((agent) => agent.id)) + 1,
      name: input.name.trim(),
      description: input.description.trim(),
      type: input.type,
      model: input.model,
      status: "Idle",
      tasksCompleted: 0,
      createdAt: new Date().toISOString(),
    };

    setAgents((current) => [...current, newAgent]);
  }

  function deleteAgent(id: number) {
    setAgents((current) =>
      current.filter((agent) => agent.id !== id),
    );
  }

  function updateAgent(id: number, input: UpdateAgentInput) {
    setAgents((current) =>
      current.map((agent) =>
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
    );
  }

  return (
    <AgentContext.Provider value={{ agents, createAgent, deleteAgent, updateAgent,updateAgentStatus }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);

  if (!context) {
    throw new Error("useAgents must be used inside AgentProvider");
  }

  return context;
}
