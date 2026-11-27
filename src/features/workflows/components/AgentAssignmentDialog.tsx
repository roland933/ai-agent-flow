
import { useEffect, useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import AgentSelector from "@/features/agents/components/AgentSelector";
import { useAgentStore } from "@/features/agents/store/agentStore";

type AgentAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAgentId?: number | null;
  initialInstructions?: string;
  excludedAgentIds?: number[];
  onSubmit: (data: {
    agentId: number;
    instructions: string;
  }) => void;
};

export default function AgentAssignmentDialog({
  open,
  onOpenChange,
  initialAgentId = null,
  initialInstructions = "",
  excludedAgentIds = [],
  onSubmit,
}: AgentAssignmentDialogProps) {
  const agents = useAgentStore((state) => state.agents);

  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (!open) return;

    setSelectedAgents(
      initialAgentId !== null ? [initialAgentId] : [],
    );
    setInstructions(initialInstructions);
  }, [open, initialAgentId, initialInstructions]);

  const availableAgents = agents.filter(
    (agent) =>
      !excludedAgentIds.includes(agent.id) ||
      selectedAgents.includes(agent.id),
  );

  const handleSubmit = () => {
    const agentId = selectedAgents[0];

    if (agentId === undefined) return;

    onSubmit({
      agentId,
      instructions: instructions.trim(),
    });

    onOpenChange(false);
  };

  const handleAgentChange = (agentIds: number[]) => {
    setSelectedAgents(agentIds.slice(-1));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={initialAgentId === null ? "Add agent" : "Edit agent"}
      description="Select an agent and configure its instructions."
      size="2xl"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          />
          <Button
            title={initialAgentId === null ? "Add agent" : "Save changes"}
            onClick={handleSubmit}
            disabled={selectedAgents.length === 0}
          />
        </>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Select agent
          </label>

          <AgentSelector
            agents={availableAgents}
            selectedAgents={selectedAgents}
            onChange={handleAgentChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Agent instructions
          </label>

          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            placeholder="Describe what this agent should do in this workflow..."
            rows={5}
            className="w-full resize-none rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
      </div>
    </Dialog>
  );
}
