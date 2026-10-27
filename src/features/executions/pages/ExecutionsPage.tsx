
import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/features/ui/table/DataTable";
import { TableToolbar } from "@/features/ui/table/TableToolbar";
import { FilterBox } from "@/features/ui/filter-box/FilterBox";
import { SearchInput } from "@/features/ui/input/SearchInput";
import Select from "@/features/ui/select/Select";
import { HeaderLayout } from "@/components/layout/HeaderLayout";

import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import { useExecutionStore } from "@/features/executions/store/executionStore";
import type {
  Execution,
  ExecutionStatus,
} from "@/features/executions/types/execution";
import { getExecutionColumns } from "../columns/executionColumns";
import ExecutionDetailsDialog from "../components/ExecutionDetailsDialog";

const executionStatuses: { label: string; value: string }[] = [
  { label: "All statuses", value: "All" },
  { label: "Queued", value: "Queued" },
  { label: "Running", value: "Running" },
  { label: "Completed", value: "Completed" },
  { label: "Failed", value: "Failed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function ExecutionsPage() {
  const executions = useExecutionStore((state) => state.executions);
  const updateExecutionStatus = useExecutionStore(
    (state) => state.updateExecutionStatus,
  );

  const tasks = useTaskStore((state) => state.tasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const agents = useAgentStore((state) => state.agents);

  const [selectedExecution, setSelectedExecution] =
    useState<Execution | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [agentId, setAgentId] = useState<string>("All");
  const [taskId, setTaskId] = useState<string>("All");

  const agentOptions = useMemo(
    () => [
      { label: "All agents", value: "All" },
      ...agents.map((agent) => ({
        label: agent.name,
        value: String(agent.id),
      })),
    ],
    [agents],
  );

  const taskOptions = useMemo(
    () => [
      { label: "All tasks", value: "All" },
      ...tasks.map((task) => ({
        label: task.title,
        value: String(task.id),
      })),
    ],
    [tasks],
  );

  const filteredExecutions = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return executions.filter((execution) => {
      const task = tasks.find((item) => item.id === execution.taskId);
      const agent = agents.find((item) => item.id === execution.agentId);

      const matchesSearch =
        String(execution.id).includes(searchTerm) ||
        (task?.title.toLowerCase().includes(searchTerm) ?? false) ||
        (agent?.name.toLowerCase().includes(searchTerm) ?? false);

      const matchesStatus =
        status === "All" || execution.status === status;

      const matchesAgent =
        agentId === "All" || String(execution.agentId) === agentId;

      const matchesTask =
        taskId === "All" || String(execution.taskId) === taskId;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAgent &&
        matchesTask
      );
    });
  }, [executions, tasks, agents, search, status, agentId, taskId]);

  const handleResetFilters = () => {
    setSearch("");
    setStatus("All");
    setAgentId("All");
    setTaskId("All");
  };

  const handleSelectExecution = (execution: Execution) => {
    setSelectedExecution(execution);
    setDetailsOpen(true);
  };

  const handleStartExecution = (execution: Execution) => {
    if (execution.status !== "Queued") {
      alert("This execution cannot be started because it is not queued.");
      return;
    }

    updateExecutionStatus(execution.id, "Running");
    updateTaskStatus(execution.taskId, "Running");
  };

  const handleStopExecution = (execution: Execution) => {
    if (execution.status !== "Running") {
      alert("This execution cannot be stopped because it is not running.");
      return;
    }

    updateExecutionStatus(execution.id, "Cancelled");
    updateTaskStatus(execution.taskId, "Pending");
  };

  const columns = getExecutionColumns({
    onStart: handleStartExecution,
    onStop: handleStopExecution,
  });

  return (
    <DashboardLayout>
      <ExecutionDetailsDialog
        execution={selectedExecution}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        taskName={
          tasks.find((task) => task.id === selectedExecution?.taskId)
            ?.title ?? "Unknown task"
        }
        agentName={
          agents.find((agent) => agent.id === selectedExecution?.agentId)
            ?.name ?? "Unassigned"
        }
      />

      <HeaderLayout
        title="Executions"
        subTitle="Monitor task execution history and status."
      />

      <FilterBox onReset={handleResetFilters}>
        <SearchInput
          label="Search"
          placeholder="Search executions"
          value={search}
          onChange={setSearch}
        />

        <Select
          label="Status"
          value={status}
          onChange={setStatus}
          options={executionStatuses}
        />

        <Select
          label="Agent"
          value={agentId}
          onChange={setAgentId}
          options={agentOptions}
        />

        <Select
          label="Task"
          value={taskId}
          onChange={setTaskId}
          options={taskOptions}
        />
      </FilterBox>

      <TableToolbar
        filteredCount={filteredExecutions.length}
        totalCount={executions.length}
        itemName="executions"
      />

      <DataTable
        columns={columns}
        data={filteredExecutions}
        getRowId={(execution) => execution.id}
        onRowClick={handleSelectExecution}
      />
    </DashboardLayout>
  );
}
