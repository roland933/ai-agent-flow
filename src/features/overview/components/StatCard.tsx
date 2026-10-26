
import {
  Activity,
  Bot,
  CheckCircle2,
  ChartNoAxesCombined,
  ArrowUpRight,
} from "lucide-react";

const icons = {
  bot: Bot,
  activity: Activity,
  check: CheckCircle2,
  chart: ChartNoAxesCombined,
};

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  icon?: keyof typeof icons;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const Icon = icon ? icons[icon] : undefined;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/25 hover:bg-white/[0.055] hover:shadow-[0_8px_35px_-18px_rgba(52,211,153,0.22)]">
      {/* Subtle green glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/[0.08] opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-300">
          {title}
        </p>

        {Icon && (
          <div className="rounded-xl border border-emerald-300/15 bg-emerald-400/[0.08] p-2.5 text-emerald-300 transition-colors group-hover:border-emerald-300/25 group-hover:bg-emerald-400/[0.13]">
            <Icon size={19} strokeWidth={1.8} />
          </div>
        )}
      </div>

      <p className="relative mt-5 text-3xl font-semibold tracking-tight text-slate-50">
        {value}
      </p>

      {change && (
        <p className="relative mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-300/90">
          <ArrowUpRight size={14} />
          {change}
        </p>
      )}

      <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
