
import { useState } from "react";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { Button } from "@/features/ui/button/Button";
import AgentSelector from "@/features/agents/components/AgentSelector";
import { useAgentStore } from "@/features/agents/store/agentStore";
import AssignmentForm from "./AssignmentForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { Task } from "../types/task";

type AssignAgentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
 onSubmit: (data: {
  assignments: {
    agentId: number;
    title: string;
    description: string;
  }[];
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
  const [activeAgentId, setActiveAgentId] = useState<number | null>(null);

  const [assignmentForms, setAssignmentForms] = useState<
    Record<number, { title: string; description: string }>
  >({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const handleSubmit = () => {
  const assignments = selectedAgents.map((agentId) => ({
    agentId,
    title: assignmentForms[agentId]?.title.trim() ?? "",
    description: assignmentForms[agentId]?.description.trim() ?? "",
  }));

  if (
    assignments.length === 0 ||
    assignments.some((assignment) => !assignment.title)
  ) {
    return;
  }

  onSubmit({ assignments });
};


  const updateAssignmentForm = (
    agentId: number,
    field: "title" | "description",
    value: string,
  ) => {
    setAssignmentForms((prev) => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        [field]: value,
      },
    }));
  };

  const handleSelectedAgentsChange = (agentIds: number[]) => {
    setSelectedAgents(agentIds);

    setAssignmentForms((prev) => {
      const updatedForms: typeof prev = {};

      agentIds.forEach((id) => {
        updatedForms[id] = prev[id] ?? {
          title: "",
          description: "",
        };
      });

      return updatedForms;
    });



    setActiveAgentId((current) => {
      if (current !== null && agentIds.includes(current)) {
        return current;
      }

      return agentIds[0] ?? null;
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
           disabled={
  selectedAgents.length === 0 ||
  selectedAgents.some(
    (agentId) => !assignmentForms[agentId]?.title.trim()
  )
}
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
            onChange={handleSelectedAgentsChange}
          />
        </div>
        <Tabs
          value={String(activeAgentId ?? "")}
          onValueChange={(value) => setActiveAgentId(Number(value))}
          className="w-full"
        >
          <TabsList>
            {selectedAgents.map((agentId) => {
              const agent = agents.find((item) => item.id === agentId);

              return (
                <TabsTrigger key={agentId} value={String(agentId)}>
                  {agent?.name ?? `Agent #${agentId}`}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {selectedAgents.map((agentId) => (
            <TabsContent key={agentId} value={String(agentId)}>
              <AssignmentForm
                title={assignmentForms[agentId]?.title ?? ""}
                description={assignmentForms[agentId]?.description ?? ""}
                onTitleChange={(value) =>
                  updateAssignmentForm(agentId, "title", value)
                }
                onDescriptionChange={(value) =>
                  updateAssignmentForm(agentId, "description", value)
                }
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Dialog>
  );
}
