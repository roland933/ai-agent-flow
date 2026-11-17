import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import type { Task } from "../types/task";

type RunWorkflowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  task: Task | null;
  isPending: boolean;
};

export function RunWorkflowDialog({
  open,
  onOpenChange,
  onContinue,
  task,
  isPending,
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
      <p className="text-sm leading-relaxed text-slate-400">
        Are you sure you want to start the workflow for{" "}
        <span className="font-medium text-slate-200">
          {task?.title ?? ""}
        </span>
        ?
      </p>
    </Dialog>
  );
}