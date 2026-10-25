import { Clock3, CheckCircle2, CircleAlert, PlayCircle } from "lucide-react";


export const TaskStatuses = ["All", "Pending", "Running", "Completed", "Failed"] as const;

export const StatusStyles = {
  Pending: "bg-amber-500/10 text-amber-400",
  Running: "bg-violet-500/10 text-violet-400",
  Completed: "bg-emerald-500/10 text-emerald-400",
  Failed: "bg-rose-500/10 text-rose-400",
};

export const StatusIcons = {
  Pending: Clock3,
  Running: PlayCircle,
  Completed: CheckCircle2,
  Failed: CircleAlert,
};