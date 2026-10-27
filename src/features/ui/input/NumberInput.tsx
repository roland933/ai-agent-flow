
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NumberInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
};

export default function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
}: NumberInputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <Label className="text-sm font-medium text-slate-300">
          {label}
        </Label>
      )}

      <Input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/[0.08]"
      />
    </div>
  );
}
