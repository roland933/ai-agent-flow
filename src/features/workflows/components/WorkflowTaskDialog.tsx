
import { useEffect, useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";

type WorkflowTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  initialDescription: string;
  onSubmit: (data: {
    title: string;
    description: string;
  }) => void;
};

export function WorkflowTaskDialog({
  open,
  onOpenChange,
  initialTitle,
  initialDescription,
  onSubmit,
}: WorkflowTaskDialogProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (!open) return;

    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [open, initialTitle, initialDescription]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit workflow task"
      description="Configure the shared task that will be given to every agent."
      size="lg"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />
          <Button
            title="Save task"
            onClick={handleSubmit}
            disabled={!title.trim()}
          />
        </>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Task title
          </label>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Task description
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe what the agents should accomplish..."
            rows={6}
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
    </Dialog>
  );
}
