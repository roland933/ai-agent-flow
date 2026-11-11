
import { useEffect, useMemo, useState } from "react";

import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import type { Task, TaskStatus } from "@/features/tasks/types/task";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormTextarea } from "@/features/ui/form/FormTextarea";
import { Button } from "@/features/ui/button/Button";
import { useUpdateTask } from "../hooks/useUpdateTask";

type EditTaskDialogProps = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const updateTaskMutation = useUpdateTask();
  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description);

  }, [task]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!task || !title.trim()) return;


    updateTaskMutation.mutate({
      id: task.id,
      data: {
        title: title.trim(),
        description: description.trim() || null,
      },
    }, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });

    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit task"
      description="Update the task details, assigned agent, or status."
      size="lg"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />

          <Button
            title="Save changes"
            type="submit"
            form="edit-task-form"
          />
        </>
      }
    >
      <form
        id="edit-task-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          id="edit-task-title"
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Task title"
          required
        />

        <FormTextarea
          id="edit-task-description"
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Describe what the task should do..."
          rows={4}
        />


      </form>
    </Dialog>
  );
}
