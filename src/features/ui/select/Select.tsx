
import { useId } from "react";
import { Label } from "@/components/ui/label";
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = {
    label?: string;
    value: string;
    options: SelectOption[];
    placeholder?: string;
    onChange: (value: string) => void;
};

export default function Select({
    label,
    value,
    options,
    placeholder = "Select an option",
    onChange,
}: SelectProps) {
    const id = useId();

    return (
        <div className="w-full space-y-2">
            {label && (
                <Label htmlFor={id} className="text-sm font-medium text-slate-300">
                    {label}
                </Label>
            )}

            <ShadcnSelect value={value} onValueChange={onChange}>
                <SelectTrigger
                    id={id}
                    className="w-full border-white/[0.08] bg-white/[0.025] text-sm text-slate-200 focus:ring-emerald-400/20"
                >
                    <SelectValue placeholder={placeholder}>
                        {options.find((option) => option.value === value)?.label}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent
                    side="bottom"
                    sideOffset={4}
                    align="start"
                    alignItemWithTrigger={false}
                    className="border border-white/[0.10] bg-[#101a20] text-slate-200 shadow-xl"
                >
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-emerald-400/10 focus:text-emerald-200"
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </ShadcnSelect>
        </div>
    );
}
