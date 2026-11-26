
import { ArrowRight, Bot, Pencil, Plus, Trash2 } from "lucide-react";

import type { WorkflowAssignment } from "../types/workflow";
import { default as  WorkflowStatusBadge } from "./WorkflowStatusBadge";

interface WorkflowAgentSequenceProps {
  workflowId: number;
  assignments: WorkflowAssignment[];
  isRunning: boolean;
  maxAgents: number;
  onEditAgent: (
    workflowId: number,
    assignment: WorkflowAssignment
  ) => void;
  onDeleteAgent: (workflowId: number, assignmentId: number) => void;
  onAddAgent: (workflowId: number) => void;
}

export default function WorkflowAgentSequence({
  workflowId,
  assignments,
  isRunning,
  maxAgents,
  onEditAgent,
  onDeleteAgent,
  onAddAgent,
}: WorkflowAgentSequenceProps) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9299AA]">
          Agent sequence
        </h4>

        <span className="text-xs text-[#9299AA]">
          {assignments.length} / {maxAgents} agents
        </span>
      </div>

      <div className="flex items-stretch gap-3 overflow-x-auto pb-3">
        {assignments.map((assignment, index) => (
          <div
            key={assignment.id}
            className="flex shrink-0 items-center gap-3"
          >
            <div className="w-[230px] rounded-xl border p-4 transition-colors">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Bot size={17} />
              </div>

              <h4 className="truncate text-sm font-semibold text-[#F1F2F7]">
                {assignment.agentName}
              </h4>

              <div className="mt-3">
                <WorkflowStatusBadge status={assignment.status} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  onClick={() => onEditAgent(workflowId, assignment)}
                  disabled={isRunning}
                  title={
                    assignment.instructions
                      ? "Edit instructions"
                      : "Add instructions"
                  }
                  className="hover:cursor-pointer rounded-lg p-2 text-current transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {assignment.agentId ? (
                    <Pencil size={16} />
                  ) : (
                    <Plus size={17} />
                  )}
                </button>

                <button
                  onClick={() =>
                    onDeleteAgent(workflowId, assignment.id)
                  }
                  disabled={isRunning}
                  title="Remove agent"
                  className="rounded-lg p-2 text-current transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {index !== assignments.length - 1 && (
              <ArrowRight
                size={18}
                className="shrink-0 text-[#6F668F]"
              />
            )}
          </div>
        ))}

        {assignments.length < maxAgents && (
          <>
            {assignments.length > 0 && (
              <ArrowRight
                size={18}
                className="shrink-0 self-center text-[#6F668F]"
              />
            )}

            <button
              onClick={() => onAddAgent(workflowId)}
              disabled={isRunning}
              className="hover:cursor-pointer flex min-h-[190px] w-[190px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#655A91] bg-[#171626]/50 text-[#A99FFF] transition-colors hover:border-[#A99FFF] hover:bg-[#8B7CF6]/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus size={24} />
              <span className="text-sm font-medium">Add agent</span>
              <span className="text-xs text-[#9299AA]">
                {maxAgents - assignments.length} slot(s) available
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}
