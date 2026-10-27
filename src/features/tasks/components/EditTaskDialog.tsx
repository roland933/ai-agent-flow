
import { useEffect, useMemo, useState } from "react";

import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";
import type { Task, TaskStatus } from "@/features/tasks/types/task";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormSelect } from "@/features/ui/form/FormSelect";
import { FormTextarea } from "@/features/ui/form/FormTextarea";
import { Button } from "@/features/ui/button/Button";

type EditTaskDialogProps = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const statusOptions: { label: string; value: string }[] = [
  { label: "Pending", value: "Pending" },
  { label: "Running", value: "Running" },
  { label: "Completed", value: "Completed" },
  { label: "Failed", value: "Failed" },
];

export default function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const agents = useAgentStore((state) => state.agents);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agentId, setAgentId] = useState("unassigned");
  const [status, setStatus] = useState<TaskStatus>("Pending");

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

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description);
    setAgentId(
      task.agentId === null ? "unassigned" : String(task.agentId),
    );
    setStatus(task.status);
  }, [task]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!task || !title.trim()) return;

    updateTask(task.id, {
      title,
      description,
      agentId: agentId === "unassigned" ? null : Number(agentId),
      status,
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

        <FormSelect
          id="edit-task-agent"
          label="Assigned agent"
          value={agentId}
          onChange={setAgentId}
          options={agentOptions}
          placeholder="Select an agent"
        />

        <FormSelect
          id="edit-task-status"
          label="Status"
          value={status}
          onChange={(value) => setStatus(value as TaskStatus)}
          options={statusOptions}
        />
      </form>
    </Dialog>
  );
}
