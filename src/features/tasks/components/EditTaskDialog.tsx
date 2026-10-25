
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAgentStore } from "@/features/agents/store/agentStore";
import type { Task, TaskStatus } from "@/features/tasks/types/task";
import { useTaskStore } from "@/features/tasks/store/taskStore";

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
  const agents = useAgentStore((state) => state.agents);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agentId, setAgentId] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Pending");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description);
    setAgentId(task.agentId === null ? "" : String(task.agentId));
    setStatus(task.status);
  }, [task]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!task || !title.trim()) return;

    updateTask(task.id, {
      title,
      description,
      agentId: agentId ? Number(agentId) : null,
      status,
    });

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Update the task details, assigned agent, or status.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="edit-task-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="edit-task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="edit-task-description"
              className="text-sm font-medium"
            >
              Description
            </label>
            <Textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-task-agent" className="text-sm font-medium">
              Assigned agent
            </label>
            <select
              id="edit-task-agent"
              value={agentId}
              onChange={(event) => setAgentId(event.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Unassigned</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-task-status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="edit-task-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as TaskStatus)
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
