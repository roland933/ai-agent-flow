import { useAgentAssignmentsQuery } from "../hooks/useAgentAssignmentsQuery";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { Dialog } from "@/features/ui/dialog/Dialog";
import StatusBadge from "@/features/ui/status/StatusBadge";
import { statusMap } from "../utils/taskAdapter";
import type { AgentAssignment, Task } from "../types/task";
import { Button } from "@/features/ui/button/Button";
import { Trash2 } from "lucide-react";
import { useDeleteAgentAssignment } from "../hooks/useDeleteAgentAssignment";
import { useWorkflowStatus } from "../hooks/useWorkflowStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AgentOutputPreviewDialog } from "./AgentOutputPreviewDialog";

type AgentAssignmentsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
};

export function AgentAssignmentsDialog({
  open,
  onOpenChange,
  task,
}: AgentAssignmentsDialogProps) {

  const {
    data: assignments,
    isLoading,
    isError,
  } = useAgentAssignmentsQuery(task?.id ?? null);

  const { data: workflowStatus } = useWorkflowStatus(
    task?.id ?? 0,
    open && task !== null,
  );

  const agents = useAgentStore((state) => state.agents);
  const deleteAssignment = useDeleteAgentAssignment()
  const queryClient = useQueryClient();

  const [selectedAssignment, setSelectedAssignment] = useState<AgentAssignment | null>(null);
  const [expandedDescription, setExpandedDescription] =
  useState<number | null>(null);

  const handleDeleteAssignment = (id: number) => {
    deleteAssignment.mutate({
      id,
      taskId: task!.id,
    });
  };

  useEffect(() => {
    console.log(selectedAssignment)
  },[selectedAssignment])

  useEffect(() => {
  
    if (workflowStatus) {
      queryClient.invalidateQueries({
        queryKey: ["agent-assignments", task?.id],
      });
    }
  }, [workflowStatus, task?.id, queryClient]);

  return (
    <>
    <AgentOutputPreviewDialog
  open={selectedAssignment !== null}
  onOpenChange={(open) => {
    if (!open) setSelectedAssignment(null);
  }}
  agentName={
    agents.find(
      (agent) => agent.id === selectedAssignment?.agent_id
    )?.name ?? "Unknown Agent"
  }
  assignmentTitle={selectedAssignment?.title ?? ""}
  output={
    typeof selectedAssignment?.output_data?.result === "string"
      ? selectedAssignment.output_data.result
      : ""
  }
/>

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Agent Assignments"
      description={`Task: ${task?.title ?? ""}`}
      size="xl"
    >
      {isLoading && (
        <p className="text-sm text-slate-400">Loading assignments...</p>
      )}

      {isError && (
        <p className="text-sm text-red-400">
          Failed to load assignments.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-400">
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3">Agent</th>
                <th className="px-3 py-3">Assignment</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {assignments?.map((assignment) => {
                const agent = agents.find(
                  (item) => item.id === assignment.agent_id,
                );

                return (
                  <tr
                    key={assignment.id}
                    className="border-b border-white/[0.06]"
                  >
                    <td className="px-3 py-3 text-slate-500">
                      {assignment.sequence}
                    </td>

                    <td className="px-3 py-3 font-medium text-slate-200">
                      {agent?.name ?? `Agent #${assignment.agent_id}`}
                    </td>

                    <td className="px-3 py-3 text-slate-300">
                      <div>{assignment.title}</div>
                     {assignment.description && (
                        <p className="mt-1 max-w-xs text-xs text-slate-500">
                          {assignment.description.length > 100
                            ? `${assignment.description.slice(0, 100)}...`
                            : assignment.description}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-3">
                      <StatusBadge status={statusMap[assignment.status]} />
                    </td>
                   
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {assignment.output_data?.result && (
                          <Button
                            variant="secondary"
                              title=" Preview output"
                            onClick={() => {  setSelectedAssignment(assignment) }}
                          />
                         
                        
                        )}

                        {assignment.status === "pending" && (
                          <Button
                            icon={<Trash2 />}
                            variant="secondary"
                            onClick={() => handleDeleteAssignment(assignment.id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!assignments?.length && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-500"
                  >
                    No agents assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Dialog>
    </>
  );
}