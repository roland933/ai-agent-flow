
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type FormFieldProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    rows?: number;
    type?: string;
    required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "rows">;

export default function FormField({
    label,
    placeholder,
    value,
    onChange,
    multiline = false,
    rows = 3,
    type = "text",
    required = false,
    ...props
}: FormFieldProps) {
    const fieldClassName =
        "w-full rounded-lg border border-[#303747] bg-[#121621] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-purple-500";

    return (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-200">
                {label}
                {required && <span className="ml-1 text-red-400">*</span>}
            </label>

            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    required={required}
                    className={`${fieldClassName} resize-none`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className={fieldClassName}
                    {...props}
                />
            )}
        </div>
    );
}
