
import { FormSelect } from "@/features/ui/form/FormSelect";

export const AGENT_TYPES = [
  "Research",
  "Coding",
  "Data Analysis",
  "Content Writing",
] as const;

type AgentTypeSelectProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const options = AGENT_TYPES.map((type) => ({
  label: type,
  value: type,
}));

export default function AgentTypeSelect({
  value,
  onChange,
  label = "Agent type",
  placeholder = "Select an agent type",
  disabled = false,
}: AgentTypeSelectProps) {
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
