
import StatusBadge from "@/features/ui/status/StatusBadge";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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


export default function RecentExecutions() {
    const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/[0.06] blur-[80px]" />

      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-100">
            Recent Executions
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Latest task activity
          </p>
        </div>

        <button
         onClick={() => navigate("/executions")}
          type="button"
          className="hover:cursor-pointer flex items-center gap-1 text-sm text-emerald-300 transition-colors hover:text-emerald-200"
        >
          View all <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="relative divide-y divide-white/[0.06]">
        {executions.map((execution) => {
       
          

          return (
            <div
              key={execution.id}
              className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-white/[0.025]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-100">
                  {execution.task}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {execution.agent}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
               <StatusBadge status={execution.status}/>
                <span className="text-xs text-slate-300">
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
