import {
  CheckCircle2,
  Clock3,
  XCircle,
  CirclePause,
  type LucideIcon,
} from "lucide-react";

export const statusConfig = {
  Running: {
    label: "Running",
    icon: Clock3,
    classes:
      "border-sky-400/15 bg-sky-400/10 text-sky-300",
  },
  Idle: {
    label: "Idle",
    icon: CirclePause,
    classes:
      "border-slate-400/15 bg-slate-400/10 text-slate-300",
  },
  Error: {
    label: "Error",
    icon: XCircle,
    classes:
      "border-rose-400/15 bg-rose-400/10 text-rose-300",
  },
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    classes:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
  },
  Failed: {
    label: "Failed",
    icon: XCircle,
    classes:
      "border-rose-400/15 bg-rose-400/10 text-rose-300",
  },
  Pending: {
    label: "Pending",
    icon: Clock3,
    classes:
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
  },
  Queued: {
    label: "Queued",
    icon: Clock3,
    classes:
      "border-slate-400/15 bg-slate-400/10 text-slate-300",
  },
  Cancelled: {
    label: "Cancelled",
    icon: CirclePause,
    classes:
      "border-slate-400/15 bg-slate-400/10 text-slate-300",
  },
} satisfies Record<
  string,
  {
    label: string;
    icon: LucideIcon;
    classes: string;
  }
>;

export type Status = keyof typeof statusConfig;