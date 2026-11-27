import { Check } from "lucide-react";
import type { Agent } from "../types/agent";

type AgentSelectorProps = {
  agents: Agent[];
  selectedAgents: number[];
  onChange: (selectedAgents: number[]) => void;
  maxSelected?: number;
};

export default function AgentSelector({
  agents,
  selectedAgents,
  onChange,
  maxSelected
}: AgentSelectorProps) {
 const toggleAgent = (agentId: number) => {
  const isSelected = selectedAgents.includes(agentId);



  if (isSelected) {
    onChange(selectedAgents.filter((id) => id !== agentId));
    return;
  }

  if (maxSelected && selectedAgents.length >= maxSelected) {
    return;
  }

  onChange([...selectedAgents, agentId]);
};



  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" >
      {agents.map((agent) => {
        const isSelected = selectedAgents.includes(agent.id);

        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => toggleAgent(agent.id)}
            aria-pressed={isSelected}
            className={`relative flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
              isSelected
                ? "border-purple-500 bg-purple-500/10"
                : "border-white/10 bg-white/[0.02] hover:border-purple-400/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">
                {agent.name}
              </span>

              <span
                className={`flex size-5 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-purple-500 bg-purple-500 text-white"
                    : "border-slate-500 text-transparent"
                }`}
              >
                {isSelected && <Check size={13} />}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {agent.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}