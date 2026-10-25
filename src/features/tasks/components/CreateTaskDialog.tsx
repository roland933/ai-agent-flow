
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { useTaskStore } from "@/features/tasks/store/taskStore";

export default function CreateTaskDialog() {
  const agents = useAgentStore((state) => state.agents);
  const createTask = useTaskStore((state) => state.createTask);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [agentId, setAgentId] = useState("");

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
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
          <DialogDescription>
            Define a task and optionally assign it to an agent.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="task-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Research a topic"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="task-description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what the task should do..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="task-agent" className="text-sm font-medium">
              Assign agent
            </label>
            <select
              id="task-agent"
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
