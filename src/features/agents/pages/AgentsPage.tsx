
import { useState } from "react";
import { Search, Plus, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import CreateAgentDialog from "@/features/agents/components/CreateAgentDialog";
import EditAgentDialog from "@/features/agents/components/EditAgentDialog";
import { useAgentStore } from "@/features/agents/store/agentStore";
import DataTable from "@/features/ui/table/DataTable";
import Select from "@/features/ui/select/Select"
import type { Agent } from "../types/agent";
import { getAgentColumns } from "../columns/agentColumns";


export default function AgentsPage() {
  const agents = useAgentStore((state) => state.agents);
  const deleteAgent = useAgentStore((state) => state.deleteAgent);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [model, setModel] = useState<string>("All");
  const [minTasks, setMinTasks] = useState("");
  const models = [...new Set(agents.map((agent) => agent.model))];


  const columns = getAgentColumns({
    onEdit: (agent) => setEditingAgent(agent),

    onDelete: (agent) => {
      const confirmed = window.confirm(
        `Biztosan törlöd ezt az agentet: ${agent.name}?`,
      );

      if (confirmed) {
        deleteAgent(agent.id);
      }
    },

    onView: (agent) => navigate(`/agents/${agent.id}`),
  });



  const filteredAgents = agents.filter((agent) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm) ||
      agent.description.toLowerCase().includes(searchTerm) ||
      agent.model.toLowerCase().includes(searchTerm);

    const matchesStatus =
      status === "All" || agent.status === status;

    const matchesModel =
      model === "All" || agent.model === model;

    const matchesMinTasks =
      minTasks === "" ||
      agent.tasksCompleted >= Number(minTasks);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesModel &&
      matchesMinTasks
    );
  });

  return (
    <DashboardLayout>
      <HeaderLayout
        title="Agents"
        subTitle="Manage and configure your AI agents."
      >
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition-all hover:border-emerald-300/30 hover:bg-emerald-400/[0.16] hover:text-emerald-200"
        >
          <Plus size={17} />
          Create Agent
        </button>
      </HeaderLayout>

     
      <section className="mb-6 rounded-2xl border border-white/[0.10] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-slate-100">
              <ListFilter size={17} className="text-emerald-300" />
              Filters
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Filter agents by their properties
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("All");
              setModel("All");
              setMinTasks("");
            }}
            className="text-sm text-slate-400 transition-colors hover:text-emerald-300"
          >
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Search
            </label>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search agents..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 pl-9 pr-3 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/[0.08]"
              />
            </div>
          </div>

          
          <Select
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { label: "All", value: "All" },
              { label: "Running", value: "Running" },
              { label: "Idle", value: "Idle" },
              { label: "Error", value: "Error" },
            ]}
          />


           <Select
            label="Models"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            options={models}
          />
         
 

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Minimum completed tasks
            </label>

            <input
              type="number"
              min="0"
              value={minTasks}
              onChange={(event) => setMinTasks(event.target.value)}
              placeholder="Any amount"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/[0.08]"
            />
          </div>
        </div>

        <div className="mt-4 border-t border-white/[0.06] pt-3 text-xs text-slate-400">
          Showing{" "}
          <span className="font-medium text-slate-200">
            {filteredAgents.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-200">
            {agents.length}
          </span>{" "}
          agents
        </div>
      </section>


      <DataTable
        columns={columns}
        data={filteredAgents}
        onRowClick={(agent) => navigate(`/agents/${agent.id}`)}
        getRowId={(agent) => agent.id}
      />

      <CreateAgentDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <EditAgentDialog
        agent={editingAgent}
        onClose={() => setEditingAgent(null)}
      />
    </DashboardLayout>
  );
}
