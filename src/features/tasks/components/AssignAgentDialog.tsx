
import { useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import AgentSelector from "@/features/agents/components/AgentSelector";
import { useAgentStore } from "@/features/agents/store/agentStore";

import type { Task } from "../types/task";

type AssignAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onSubmit: (data: {
    agentIds: number[];
    title: string;
    description: string;
  }) => void;
};

export function AssignAgentDialog({
  open,
  onOpenChange,
  task,
  onSubmit,
}: AssignAgentDialogProps) {
  const agents = useAgentStore((state) => state.agents);

  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (selectedAgents.length === 0 || !title.trim()) return;

    onSubmit({
      agentIds: selectedAgents,
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Assign agents"
      description="Select one or more agents to work on this task."
      size="xl"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />
          <Button
            title={`Assign ${selectedAgents.length} agents`}
            onClick={handleSubmit}
            disabled={selectedAgents.length === 0 || !title.trim()}
          />
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200">
            Task
          </label>
          <input
            value={task?.title ?? ""}
            disabled
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Select Agents
          </label>

          <AgentSelector
            agents={agents}
            selectedAgents={selectedAgents}
            onChange={setSelectedAgents}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200">
            Assignment title
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Research the topic"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-200">
            Description
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe what the agents should do..."
            rows={4}
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500"
          />
        </div>
      </div>
    </Dialog>
  );
}
