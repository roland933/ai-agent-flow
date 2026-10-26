import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Execution #{execution.id}
          </DialogTitle>

          <DialogDescription>
            Detailed information about this execution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Task</p>
            <p className="font-medium">{taskName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Agent</p>
            <p className="font-medium">{agentName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium">{execution.status}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Result</p>

            <div className="mt-1 rounded-md bg-muted p-3 text-sm whitespace-pre-wrap">
              {execution.result ?? "No result available."}
            </div>
          </div>

          {execution.error && (
            <div>
              <p className="text-sm font-medium text-destructive">
                Error
              </p>

              <div className="mt-1 rounded-md bg-destructive/10 p-3 text-sm text-destructive whitespace-pre-wrap">
                {execution.error}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}