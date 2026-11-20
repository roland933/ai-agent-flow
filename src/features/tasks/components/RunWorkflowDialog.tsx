import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import type { Task } from "../types/task";

type RunWorkflowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  task: Task | null;
  isPending: boolean;
  error: string | null;
};

export function RunWorkflowDialog({
  open,
  onOpenChange,
  onContinue,
  task,
  isPending,
  error,
}: RunWorkflowDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Start workflow?"
      description="The assigned agents will start executing their tasks."
      size="md"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          />

          <Button
            title={isPending ? "Starting..." : "Start workflow"}
            variant="primary"
            onClick={onContinue}
            disabled={isPending}
          />
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-slate-400">
          Are you sure you want to start the workflow for{" "}
          <span className="font-medium text-slate-200">
            {task?.title ?? ""}
          </span>
          ?
        </p>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>
    </Dialog>
  );
}