
import { useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import TaskStatistics from "@/components/dashboard/TaskStatistics";
import RecentExecutions from "@/components/dashboard/RecentExecutions";
import CreateAgentDialog from "@/components/dashboard/CreateAgentDialog";

import { dashboardStats } from "../data/mock-data";
import { useAgents } from "@/context/AgentContext";
import { useNavigate } from "react-router-dom";
const statusStyles: Record<string, string> = {
  Running: "bg-emerald-500/10 text-emerald-400",
  Idle: "bg-sky-500/10 text-sky-400",
  Error: "bg-rose-500/10 text-rose-400",
};

export default function Overview() {
  const { agents } = useAgents();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Overview
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Monitor and manage your AI agents.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="hover:cursor-pointer flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          <Plus size={17} />
          Create Agent
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-slate-800/80 bg-[#101827]">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div>
            <h2 className="font-semibold">Your Agents</h2>
            <p className="mt-1 text-xs text-slate-500">
              Overview of your configured AI agents
            </p>
          </div>

          <button
            onClick={() => navigate("/agents")}
            className="hover:cursor-pointer flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
          >
            View all <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-800">
                <th className="px-5 py-3 font-medium">Agent</th>
                <th className="px-5 py-3 font-medium">Model</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">
                  Completed tasks
                </th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  onClick={() => navigate(`/agents/${agent.id}`)}
                  
                  className="cursor-pointer border-b border-slate-800/70 last:border-0 hover:bg-slate-800/20"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-200">
                      {agent.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {agent.description}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {agent.model}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[agent.status] ??
                        "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {agent.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right text-slate-300">
                    {agent.tasksCompleted}
                  </td>
                </tr>
              ))}

              {agents.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-slate-500"
                  >
                    No agents yet. Create your first agent!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatistics />
        <RecentExecutions />
      </div>

      <CreateAgentDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </DashboardLayout>
  );
}
