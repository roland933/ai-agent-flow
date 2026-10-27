
import { useState } from "react";
import { Plus } from "lucide-react";
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
import NumberInput from "@/features/ui/input/NumberInput";
import { SearchInput } from "@/features/ui/input/SearchInput";
import { FilterBox } from "@/features/ui/filter-box/FilterBox";
import { Button } from "@/features/ui/button/Button";
import { TableToolbar } from "@/features/ui/table/TableToolbar";
import {
  Bot,
} from "lucide-react";
import AgentTypeSelect from "@/components/common/ui/AgentTypeSelect";
import AgentModelSelect from "@/components/common/ui/AgentModelSelect";

export default function AgentsPage() {
  const agents = useAgentStore((state) => state.agents);
  const deleteAgent = useAgentStore((state) => state.deleteAgent);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [model, setModel] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const [minTasks, setMinTasks] = useState("");
  const models = [
  { label: "All models", value: "All" },
  ...[...new Set(agents.map((agent) => agent.model))].map((model) => ({
    label: model,
    value: model,
  })),
];


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
        icon={<Bot  />}
        subTitle="Manage and configure your AI agents."
      >
       <Button
          title="Create Agent"
          icon={<Plus size={17} />}
          onClick={() => setCreateOpen(true)}
        />
      </HeaderLayout>

        <FilterBox   
              onReset={() => {
          setSearch("");
          setStatus("All");
          setModel("All");
          setMinTasks("");
        }}>
          
          
          <SearchInput
            label="Search"
            placeholder="Search agents"
            value={search}
            onChange={setSearch}
          />


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

         <AgentModelSelect
            value={model}
            onChange={setModel}
          />

          <AgentTypeSelect
            value={type}
            onChange={setType}
          />


          <NumberInput
            label="Minimum completed tasks"
            value={minTasks}
            onChange={setMinTasks}
            placeholder="Any amount"
            min={0}
          />


        </FilterBox>


     <TableToolbar
        filteredCount={filteredAgents.length}
        totalCount={agents.length}
        itemName="agents"
          />
     

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
