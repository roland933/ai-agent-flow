import { useAgentAssignmentsQuery } from "../hooks/useAgentAssignmentsQuery";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { Dialog } from "@/features/ui/dialog/Dialog";
import StatusBadge from "@/features/ui/status/StatusBadge";
import { statusMap } from "../utils/taskAdapter";
import type { Task } from "../types/task";
import { Button } from "@/features/ui/button/Button";
import { Trash2 } from "lucide-react";
import { useDeleteAgentAssignment } from "../hooks/useDeleteAgentAssignment";

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

  const agents = useAgentStore((state) => state.agents);
  const deleteAssignment = useDeleteAgentAssignment()

  const handleDeleteAssignment = (id: number) => {
    deleteAssignment.mutate({
      id,
      taskId: task!.id,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Agent Assignments"
      description={`Task: ${task?.title ?? ""}`}
      size="lg"
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
                        <p className="mt-1 text-xs text-slate-500">
                          {assignment.description}
                        </p>
                      )}
                    </td>

                    <td className="px-3 py-3">
                      <StatusBadge status={statusMap[assignment.status]} />
                    </td>
                    <td className="px-3 py-3">
                      {assignment.status == "pending" && (
                           <Button icon={<Trash2 />} variant="secondary" onClick={() => handleDeleteAssignment(assignment.id)} />
                      )}
                     
                    </td>
                  </tr>
                );
              })}

              {!assignments?.length && (
                <tr>
                  <td
                    colSpan={4}
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
  );
}