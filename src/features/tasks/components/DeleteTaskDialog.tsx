
import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";

type DeleteTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
};

export function DeleteTaskDialog({
  open,
  onOpenChange,
  onContinue,
}: DeleteTaskDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete this task?"
      description="This action cannot be undone. The selected task will be permanently deleted."
      size="md"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />

          <Button
            title="Delete task"
            variant="danger"
            onClick={onContinue}
          />
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate-400">
        Are you sure you want to delete this task? 
      </p>
    </Dialog>
  );
}
