
import { FormSelect } from "@/features/ui/form/FormSelect";

export const AGENT_MODELS = [
  { label: "GPT-4.1", value: "GPT-4.1" },
  { label: "Claude", value: "Claude" },
  { label: "Local model", value: "Local model" },
] as const;

type AgentModelSelectProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function AgentModelSelect({
  value,
  onChange,
  label = "AI Model",
  placeholder = "Select a model",
  disabled = false,
}: AgentModelSelectProps) {
  return (
    <FormSelect
      label={label}
      value={value}
      onChange={onChange}
      options={[...AGENT_MODELS]}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
