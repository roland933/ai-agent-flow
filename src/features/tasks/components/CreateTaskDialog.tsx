
import { useMemo, useState } from "react";

import { Button } from "@/features/ui/button/Button";

import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormSelect } from "@/features/ui/form/FormSelect";
import { FormTextarea } from "@/features/ui/form/FormTextarea";

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const agents = useAgentStore((state) => state.agents);
  const createTask = useTaskStore((state) => state.createTask);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agentId, setAgentId] = useState("unassigned");

  const agentOptions = useMemo(
    () => [
      { label: "Unassigned", value: "unassigned" },
      ...agents.map((agent) => ({
        label: agent.name,
        value: String(agent.id),
      })),
    ],
    [agents],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    createTask({
      title,
      description,
      agentId: agentId ? Number(agentId) : null,
    });

    setTitle("");
    setDescription("");
    setAgentId("");
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create a new task"
      description="Define a task and optionally assign it to an agent."
      size="lg"
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
          required
        />

        <FormSelect
          id="task-agent"
          label="Assign agent"
          value={agentId}
          onChange={setAgentId}
          options={agentOptions}
          placeholder="Select an agent"
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
