
import Select from "@/features/ui/select/Select";

type FormSelectOption = {
  label: string;
  value: string;
};

type FormSelectProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FormSelectOption[];
  placeholder?: string;
  disabled?: boolean;
};

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Select
        label={label}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
