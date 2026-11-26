import type { AgentStatus, TaskStatus } from "../types/workflow";

const statusStyles: Record<AgentStatus, string> = {
  idle: "border-[#8B7CF6]/30 bg-[#211D36] text-[#B4A5FF]",
  pending: "border-[#414653] bg-[#252832] text-[#9299AA]",
  running: "border-blue-400/40 bg-blue-500/15 text-blue-300",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

const taskStatusStyles: Record<TaskStatus, string> = {
  draft: "border-[#8B7CF6]/30 bg-[#211D36] text-[#B4A5FF]",
  running: "border-blue-400/40 bg-blue-500/15 text-blue-300",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function WorkflowStatusBadge({ status }: { status: AgentStatus | TaskStatus }) {
  const labels: Record<string, string> = {
    idle: "Not started",
    draft: "Draft",
    pending: "Pending",
    running: "Running",
    completed: "Completed",
    failed: "Failed",
  };

  const styles = status in statusStyles
    ? statusStyles[status as AgentStatus]
    : taskStatusStyles[status as TaskStatus];

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles}`}>
      {labels[status]}
    </span>
  );
}