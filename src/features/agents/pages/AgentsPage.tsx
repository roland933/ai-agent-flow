
import { useState } from "react";
import { Bot, Search, Plus, Trash2,Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreateAgentDialog from "@/features/agents/components/CreateAgentDialog";
import EditAgentDialog from "@/features/agents/components/EditAgentDialog";
import { useAgentStore } from "@/features/agents/store/agentStore";
import DataTable from "@/features/ui/table/DataTable";
import type { Agent } from "../types/agent";
import { getAgentColumns } from "../columns/agentColumns";
import { HeaderLayout } from "@/components/layout/HeaderLayout";

export default function AgentsPage() {
  
const agents = useAgentStore((state) => state.agents);
const deleteAgent = useAgentStore((state) => state.deleteAgent);


  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

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

    const matchesStatus = status === "All" || agent.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <HeaderLayout title="Agents" subTitle="Manage and configure your AI agents.">

          <button
          onClick={() => setCreateOpen(true)}
          className=" flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm hover:bg-violet-500"
        >
          <Plus size={17} />
          Create Agent
        </button>
      </HeaderLayout>
 
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
