
import { Button as ShadcnButton } from "@/components/ui/button";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
  onClick?: () => void;
  title: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-emerald-300/20 bg-emerald-400/10 text-emerald-300 hover:border-emerald-300/30 hover:bg-emerald-400/[0.16] hover:text-emerald-200",

  secondary:
    "border-white/[0.10] bg-white/[0.04] text-slate-300 hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-slate-100",

  danger:
    "border-rose-400/20 bg-rose-400/10 text-rose-300 hover:border-rose-400/30 hover:bg-rose-400/[0.16] hover:text-rose-200",
};
export function Button({
  onClick,
  title,
  icon,
  variant = "primary",
  disabled = false,
  type = "button",
  form,
}: ButtonProps) {
  return (
    <ShadcnButton
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className={`hover:cursor-pointer flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]}`}
    >
      {icon}
      {title}
    </ShadcnButton>
  );
}
