
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
};

export function FormTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  disabled = false,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </Label>

      <Textarea
     className="border-white/[0.10] bg-white/[0.025] text-slate-100 placeholder:text-slate-500 focus-visible:border-emerald-400/50 focus-visible:ring-2 focus-visible:ring-emerald-400/20"
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
}
