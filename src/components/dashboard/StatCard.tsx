
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
  change: string;
  icon: keyof typeof icons;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const Icon = icons[icon];

  return (
    <div className="rounded-xl border border-slate-800/80 bg-[#101827] p-5 transition-colors hover:border-slate-700">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
        <ArrowUpRight size={14} />
        {change}
      </p>
    </div>
  );
}
