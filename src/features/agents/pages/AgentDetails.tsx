import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Pencil,
  Play,
  Terminal,
  Square,
} from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAgentStore } from "../store/agentStore";

const steps = [
  { label: "Gather information", status: "completed" },
  { label: "Analyze results", status: "completed" },
  { label: "Generate summary", status: "running" },
  { label: "Save results", status: "pending" },
];

const statusStyles: Record<string, string> = {
  Running: "bg-emerald-500/10 text-emerald-400",
  Idle: "bg-sky-500/10 text-sky-400",
  Error: "bg-rose-500/10 text-rose-400",
};

export default function AgentDetails() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();

   const updateAgentStatus = useAgentStore((state) => state.updateAgentStatus);
   const agents = useAgentStore((state) => state.agents);

  const agent = agents.find((item) => item.id === Number(agentId));

  if (!agent) {
    return <Navigate to="/agents" replace />;
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Overview
      </button>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-violet-500/15 p-4 text-violet-400">
            <Bot size={30} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold">{agent.name}</h1>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  statusStyles[agent.status] ?? "bg-slate-500/10 text-slate-400"
                }`}
              >
                {agent.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400">{agent.description}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              // Az agent szerkesztését később valósítjuk meg.
            }}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-800"
          >
            <Pencil size={15} /> Edit
          </button>

          <button
            onClick={() =>
              updateAgentStatus(
                agent.id,
                agent.status === "Running" ? "Idle" : "Running",
              )
            }
            disabled={agent.status === "Error"}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {agent.status === "Running" ? (
              <>
                <Square size={15} />
                Stop Agent
              </>
            ) : (
              <>
                <Play size={15} />
                Run Agent
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-800 bg-[#101827] p-5">
          <h2 className="mb-5 font-semibold">Basic Information</h2>

          <dl className="space-y-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Name</dt>
              <dd>{agent.name}</dd>
            </div>

            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Model</dt>
              <dd>{agent.model}</dd>
            </div>

            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Status</dt>
              <dd>{agent.status}</dd>
            </div>

            <div className="flex justify-between gap-3">
              <dt className="text-slate-400">Completed tasks</dt>
              <dd>{agent.tasksCompleted}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-800 bg-[#101827] p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-semibold">Current Task</h2>
            <span className="text-sm text-violet-400">60%</span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[60%] rounded-full bg-violet-500" />
          </div>

          <h3 className="font-medium">Research React Server Components</h3>

          <p className="mt-2 text-sm text-slate-400">
            Gather and analyze information about React Server Components.
          </p>

          <div className="mt-6 space-y-4">
            {steps.map((step) => (
              <div key={step.label} className="flex items-center gap-3">
                {step.status === "completed" ? (
                  <CheckCircle2 size={18} className="text-emerald-400" />
                ) : step.status === "running" ? (
                  <Clock3 size={18} className="text-violet-400" />
                ) : (
                  <div className="h-[18px] w-[18px] rounded-full border border-slate-600" />
                )}

                <span
                  className={
                    step.status === "pending"
                      ? "text-sm text-slate-500"
                      : "text-sm text-slate-200"
                  }
                >
                  {step.label}
                </span>

                {step.status === "running" && (
                  <span className="ml-auto text-xs text-violet-400">
                    In progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-[#101827] p-5 xl:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <Terminal size={18} className="text-violet-400" />
            <h2 className="font-semibold">Execution Logs</h2>

            <span className="ml-auto text-xs text-slate-500">
              Static demo logs
            </span>
          </div>

          <div className="space-y-3 rounded-lg bg-[#090f1a] p-4 font-mono text-xs">
            <p className="text-slate-400">
              14:22:10 <span className="text-sky-400">INFO</span> Starting
              research task...
            </p>

            <p className="text-slate-400">
              14:22:11 <span className="text-sky-400">INFO</span> Searching
              available sources...
            </p>

            <p className="text-slate-400">
              14:22:15 <span className="text-amber-400">DEBUG</span> Processing
              source 1/12
            </p>

            <p className="text-slate-400">
              14:22:20 <span className="text-sky-400">INFO</span> Progress: 60%
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
