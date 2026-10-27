
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Clock3,
  Pencil,
  Play,
  Square,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAgentStore } from "../store/agentStore";
import { Button } from "@/features/ui/button/Button";
import EditAgentDialog from "../components/EditAgentDialog";
import StatusBadge from "@/features/ui/status/StatusBadge";

const steps = [
  { label: "Gather information", status: "completed" },
  { label: "Analyze results", status: "completed" },
  { label: "Generate summary", status: "running" },
  { label: "Save results", status: "pending" },
];



const panelStyles =
  "rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-xl";

export default function AgentDetails() {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();

  const updateAgentStatus = useAgentStore(
    (state) => state.updateAgentStatus,
  );
  const agents = useAgentStore((state) => state.agents);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const agent = agents.find((item) => item.id === Number(agentId));

  if (!agent) {
    return <Navigate to="/agents" replace />;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full ">
        <button
          onClick={() => navigate("/agents")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={16} />
          Back to Agents
        </button>

        {/* Agent header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.08] p-4 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.06)]">
              <Bot size={30} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  {agent.name}
                </h1>

               

              </div>

              <p className="mt-2 max-w-2xl text-md leading-6 text-slate-300">
                {agent.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              title="Edit"
              variant="secondary"
              icon={<Pencil size={15} />}
              onClick={() => setIsEditOpen(true)}
            />

            <Button
              title={agent.status === "Running" ? "Stop Agent" : "Run Agent"}
              variant="primary"
              icon={
                agent.status === "Running" ? (
                  <Square size={15} />
                ) : (
                  <Play size={15} />
                )
              }
              disabled={agent.status === "Error"}
              onClick={() =>
                updateAgentStatus(
                  agent.id,
                  agent.status === "Running" ? "Idle" : "Running",
                )
              }
            />
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Basic information */}
          <section className={panelStyles}>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-lg bg-white/[0.04] p-2 text-emerald-300">
                <Bot size={17} />
              </div>
              <h2 className="font-semibold text-white">
                Basic Information
              </h2>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-200">Name</dt>
                <dd className="text-right font-medium text-slate-200">
                  {agent.name}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-200">Model</dt>
                <dd className="text-right font-medium text-slate-200">
                  {agent.model}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-200">Status</dt>
                <dd className="text-right font-medium text-slate-200">
                   <StatusBadge status={agent.status}/>
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="text-slate-200">Completed tasks</dt>
                <dd className="font-medium tabular-nums text-emerald-300">
                  {agent.tasksCompleted}
                </dd>
              </div>
            </dl>
          </section>

          {/* Current task */}
          <section className={`${panelStyles} xl:col-span-2`}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-white">Current Task</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Task execution overview
                </p>
              </div>

              <span className="text-sm font-semibold tabular-nums text-emerald-300">
                60%
              </span>
            </div>

            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]" />
            </div>

            <h3 className="font-medium text-slate-100">
              Research React Server Components
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Gather and analyze information about React Server Components.
            </p>

            <div className="mt-6 space-y-4">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="flex items-center gap-3"
                >
                  {step.status === "completed" ? (
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-400"
                    />
                  ) : step.status === "running" ? (
                    <Clock3
                      size={18}
                      className="shrink-0 text-teal-300"
                    />
                  ) : (
                    <div className="h-[18px] w-[18px] shrink-0 rounded-full border border-white/15" />
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
                    <span className="ml-auto rounded-full border border-teal-400/15 bg-teal-400/[0.06] px-2.5 py-1 text-xs font-medium text-teal-300">
                      In progress
                    </span>
                  )}

                  {step.status === "completed" && (
                    <span className="ml-auto  text-xs  text-emerald-400/70">
                      Completed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Execution logs */}
          <section className={`${panelStyles} xl:col-span-3`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="rounded-lg bg-emerald-400/[0.08] p-2 text-emerald-300">
                <Terminal size={17} />
              </div>

              <div>
                <h2 className="font-semibold text-white">Execution Logs</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Agent activity and execution output
                </p>
              </div>

              <span className="ml-auto rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[11px] text-slate-500">
                Static demo logs
              </span>
            </div>

            <div className="space-y-3 overflow-x-auto rounded-xl border border-white/[0.05] bg-[#090f13]/80 p-4 font-mono text-xs">
              <p className="whitespace-nowrap text-slate-400">
                <span className="text-slate-600">14:22:10</span>{" "}
                <span className="text-sky-400">INFO</span>{" "}
                Starting research task...
              </p>

              <p className="whitespace-nowrap text-slate-400">
                <span className="text-slate-600">14:22:11</span>{" "}
                <span className="text-sky-400">INFO</span>{" "}
                Searching available sources...
              </p>

              <p className="whitespace-nowrap text-slate-400">
                <span className="text-slate-600">14:22:15</span>{" "}
                <span className="text-amber-400">DEBUG</span>{" "}
                Processing source 1/12
              </p>

              <p className="whitespace-nowrap text-slate-400">
                <span className="text-slate-600">14:22:20</span>{" "}
                <span className="text-emerald-400">INFO</span>{" "}
                Progress: 60%
              </p>
            </div>
          </section>
        </div>
      </div>

      <EditAgentDialog
        agent={isEditOpen ? agent : null}
        onClose={() => setIsEditOpen(false)}
      />
    </DashboardLayout>
  );
}
