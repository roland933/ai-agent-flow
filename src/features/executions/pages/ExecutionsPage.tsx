
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/features/ui/table/DataTable";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import { useExecutionStore } from "@/features/executions/store/executionStore";
import type { Execution } from "@/features/executions/types/execution";
import { getExecutionColumns } from "../columns/executionColumns";
import ExecutionDetailsDialog from "../components/ExecutionDetailsDialog";
import { HeaderLayout } from "@/components/layout/HeaderLayout";

export default function ExecutionsPage() {
  const executions = useExecutionStore((state) => state.executions);
  const tasks = useTaskStore((state) => state.tasks);
  const agents = useAgentStore((state) => state.agents);

  const [selectedExecution, setSelectedExecution] =
    useState<Execution | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const updateExecutionStatus = useExecutionStore(
    (state) => state.updateExecutionStatus,
  );

  const updateTaskStatus = useTaskStore(
    (state) => state.updateTaskStatus,
  );

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

      <HeaderLayout title="Executions" subTitle="Monitor task execution history and status."/>

  

        <DataTable
          columns={columns}
          data={executions}
          getRowId={(execution) => execution.id}
          onRowClick={handleSelectExecution}
        />
    
    </DashboardLayout>
  );
}
