
import { useState } from "react";
import { Bot, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateAgentDialog from "@/components/dashboard/CreateAgentDialog";
import { useAgents } from "@/context/AgentContext";

export default function AgentsPage() {
  const { agents } = useAgents();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [createOpen, setCreateOpen] = useState(false);

  const filteredAgents = agents.filter((agent) => {
  const searchTerm = search.toLowerCase().trim();

  const matchesSearch =
    agent.name.toLowerCase().includes(searchTerm) ||
    agent.description.toLowerCase().includes(searchTerm) ||
    agent.model.toLowerCase().includes(searchTerm);

    const matchesStatus = status === "All" || agent.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Agents</h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage and configure your AI agents.
          </p>
        </div>

        <button
          onClick={() => setCreateOpen(true)}
          className=" flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm hover:bg-violet-500"
        >
          <Plus size={17} />
          Create Agent
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search agents..."
            className="w-full rounded-lg border border-slate-800 bg-[#101827] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-violet-500"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-lg border border-slate-800 bg-[#101827] px-4 py-2.5 text-sm"
        >
          <option>All</option>
          <option>Running</option>
          <option>Idle</option>
          <option>Error</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAgents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => navigate(`/agents/${agent.id}`)}
            className="rounded-xl border border-slate-800 bg-[#101827] p-5 text-left transition hover:border-violet-500/60"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                <Bot size={22} />
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {agent.status}
              </span>
            </div>

            <h2 className="font-semibold">{agent.name}</h2>
            <p className="mt-2 min-h-10 text-sm text-slate-400">
              {agent.description}
            </p>

            <div className="mt-5 flex justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
              <span>{agent.model}</span>
              <span>{agent.tasksCompleted} tasks</span>
            </div>
          </button>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <p className="rounded-xl border border-slate-800 p-8 text-center text-sm text-slate-400">
          No agents found.
        </p>
      )}

      <CreateAgentDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </DashboardLayout>
  );
}
