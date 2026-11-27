
import {
  Copy,
  GitBranch,
  Lock,
  Pencil,
  Play,
  Trash2,
  ChevronDown,
} from "lucide-react";

import type { Workflow } from "../types/workflow";
import {
  WorkflowStatusBadge,
  WorkflowAgentSequence,
  WorkflowTaskSection,
} from ".";

interface WorkflowCardProps {
  workflow: Workflow;
  isExpanded: boolean;
  isRunning: boolean;
  maxAgents: number;
  onToggle: (workflowId: number) => void;
  onRun: (workflow: Workflow) => void;
  onEdit: (workflow: Workflow) => void;
  onDuplicate: (workflow: Workflow) => void;
  onDelete: (workflowId: number) => void;
  onEditAgent: (
    workflowId: number,
    assignment: Workflow["assignments"][number]
  ) => void;
  onDeleteAgent: (workflowId: number, assignmentId: number) => void;
  onAddAgent: (workflowId: number) => void;
}

export default function WorkflowCard({
  workflow,
  isExpanded,
  isRunning,
  maxAgents,
  onToggle,
  onRun,
  onEdit,
  onDuplicate,
  onDelete,
  onEditAgent,
  onDeleteAgent,
  onAddAgent,
}: WorkflowCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#303444] bg-[#121620] shadow-lg shadow-black/10 ">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <button
          onClick={() => onToggle(workflow.id)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8B7CF6]/20 bg-[#8B7CF6]/10 text-[#A99FFF]">
            <GitBranch size={19} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[#F1F2F7]">
              {workflow.name}
            </h3>
            <p className="mt-1 truncate text-sm text-[#9299AA]">
              {workflow.description}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`ml-2 shrink-0 text-[#9299AA] transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex items-center gap-2">
          <WorkflowStatusBadge status={workflow.taskStatus} />

          <button
            onClick={() => onRun(workflow)}
            disabled={isRunning || workflow.assignments.length === 0}
            title="Run workflow"
            className="hover:cursor-pointer flex items-center gap-2 rounded-lg bg-[#8B7CF6] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#7969E8] disabled:cursor-not-allowed disabled:bg-[#303444] disabled:text-[#777D8B]"
          >
            {isRunning ? <Lock size={14} /> : <Play size={14} />}
            {isRunning ? "Running..." : "Run"}
          </button>

          <button
            onClick={() => onEdit(workflow)}
            disabled={isRunning}
            title="Edit workflow"
            className="hover:cursor-pointer  rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-[#252B38] hover:text-[#A99FFF] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDuplicate(workflow)}
            disabled={isRunning}
            title="Duplicate workflow"
            className="hover:cursor-pointer  rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-[#252B38] hover:text-[#A99FFF] disabled:opacity-30"
          >
            <Copy size={16} />
          </button>

          <button
            onClick={() => onDelete(workflow.id)}
            disabled={isRunning}
            title="Delete workflow"
            className="hover:cursor-pointer rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-[#252B38] p-5">
          <WorkflowTaskSection title={workflow.taskTitle} />

          <WorkflowAgentSequence
            workflowId={workflow.id}
            assignments={workflow.assignments}
            isRunning={isRunning}
            maxAgents={maxAgents}
            onEditAgent={onEditAgent}
            onDeleteAgent={onDeleteAgent}
            onAddAgent={onAddAgent}
          />

          {isRunning && (
            <div className="mt-3 flex items-center gap-2 text-xs text-blue-300">
              <Lock size={13} />
              Workflow is running. Editing is disabled.
            </div>
          )}
        </div>
      )}
    </article>
  );
}
