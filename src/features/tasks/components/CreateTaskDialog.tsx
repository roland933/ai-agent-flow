
import { useState } from "react";

import { Button } from "@/features/ui/button/Button";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormTextarea } from "@/features/ui/form/FormTextarea";
import { useCreateTask } from "@/features/tasks/hooks/useCreateTask";

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const createTaskMutation = useCreateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    

   createTaskMutation.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          onOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create a new task"
      description="Define a task and optionally assign it to an agent."

      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />

          <Button
            title="Create Task"
            type="submit"
            form="create-task-form"
          />
        </>
      }
    >

      <form
        id="create-task-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          id="task-title"
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="e.g. Research a topic"
          
        />

        
        <FormTextarea
          id="task-description"
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
