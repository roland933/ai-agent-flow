
import { useMemo } from "react";

import { useAgentStore } from "@/features/agents/store/agentStore";
import { FormSelect } from "@/features/ui/form/FormSelect";

type AgentSelectProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  includeUnassigned?: boolean;
  disabled?: boolean;
};

export default function AgentSelect({
  value,
  onChange,
  label = "Agent",
  placeholder = "Select an agent",
  includeUnassigned = false,
  disabled = false,
}: AgentSelectProps) {
  const agents = useAgentStore((state) => state.agents);

  const options = useMemo(
    () => [
      ...(includeUnassigned
        ? [{ label: "Unassigned", value: "unassigned" }]
        : []),
      ...agents.map((agent) => ({
        label: agent.name,
        value: String(agent.id),
      })),
    ],
    [agents, includeUnassigned],
  );

  return (
    <FormSelect
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
