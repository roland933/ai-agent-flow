
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
  disabled?: boolean;
};

export function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  disabled = false,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </Label>

      <Input
       className="border-white/[0.10] bg-white/[0.025] text-slate-100 placeholder:text-slate-500 focus-visible:border-emerald-400/50 focus-visible:ring-2 focus-visible:ring-emerald-400/20"
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
