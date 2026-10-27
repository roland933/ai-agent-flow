
import { Dialog } from "@/features/ui/dialog/Dialog";
import type { Execution } from "../types/execution";

type ExecutionDetailsDialogProps = {
  execution: Execution | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskName: string;
  agentName: string;
};

export default function ExecutionDetailsDialog({
  execution,
  open,
  onOpenChange,
  taskName,
  agentName,
}: ExecutionDetailsDialogProps) {
  if (!execution) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Execution #${execution.id}`}
      description="Detailed information about this execution."
      size="xl"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">Task</p>
          <p className="font-medium text-slate-100">{taskName}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Agent</p>
          <p className="font-medium text-slate-100">{agentName}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Status</p>
          <p className="font-medium text-slate-100">{execution.status}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-slate-400">Duration</p>
          <p className="font-medium text-slate-100">
            {execution.durationMs != null
              ? `${execution.durationMs} ms`
              : execution.status === "Running"
                ? "In progress"
                : "Not available"}
          </p>
        </div>

        <div className="space-y-1 sm:col-span-2">
         
          <div className="whitespace-pre-wrap break-words rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm leading-relaxed text-slate-200">
            {execution.result ?? "No result available."}
          </div>
        </div>

        {execution.error && (
          <div className="space-y-1 sm:col-span-2">
            <p className="text-sm font-medium text-rose-400">Error</p>
            <div className="whitespace-pre-wrap break-words rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-sm leading-relaxed text-rose-300">
              {execution.error}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
