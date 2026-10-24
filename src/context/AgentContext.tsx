
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { agents as initialAgents } from "../data/mock-data";

export type Agent = (typeof initialAgents)[number] & {
  type?: string;
  createdAt?: string;
};

type CreateAgentInput = {
  name: string;
  description: string;
  type: string;
  model: string;
};

type AgentContextValue = {
  agents: Agent[];
  createAgent: (input: CreateAgentInput) => void;
};

const AgentContext = createContext<AgentContextValue | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

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

  return (
    <AgentContext.Provider value={{ agents, createAgent }}>
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
