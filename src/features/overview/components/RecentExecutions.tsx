
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const executions = [
  {
    id: 1,
    task: "Research market trends",
    agent: "Research Agent",
    status: "Completed",
    time: "2 min ago",
  },
  {
    id: 2,
    task: "Generate API documentation",
    agent: "Code Assistant",
    status: "Running",
    time: "5 min ago",
  },
  {
    id: 3,
    task: "Create blog post draft",
    agent: "Content Writer",
    status: "Completed",
    time: "12 min ago",
  },
  {
    id: 4,
    task: "Analyze sales data",
    agent: "Data Analyst",
    status: "Failed",
    time: "18 min ago",
  },
];

const statusConfig = {
  Completed: {
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-400",
  },
  Running: {
    icon: Clock3,
    classes: "bg-sky-500/10 text-sky-400",
  },
  Failed: {
    icon: XCircle,
    classes: "bg-rose-500/10 text-rose-400",
  },
};

export default function RecentExecutions() {
  return (
    <section className="rounded-xl border border-slate-800/80 bg-[#101827]">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <h2 className="font-semibold">Recent Executions</h2>
        <button className="text-sm text-violet-400 hover:text-violet-300">
          View all →
        </button>
      </div>

      <div className="divide-y divide-slate-800/70">
        {executions.map((execution) => {
          const config = statusConfig[
            execution.status as keyof typeof statusConfig
          ];
          const Icon = config.icon;

          return (
            <div
              key={execution.id}
              className="flex items-center justify-between gap-3 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200">
                  {execution.task}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {execution.agent}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${config.classes}`}
                >
                  <Icon size={12} />
                  {execution.status}
                </span>
                <span className="text-xs text-slate-500">
                  {execution.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
