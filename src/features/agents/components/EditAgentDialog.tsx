
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { useAgentStore } from "../store/agentStore";
import type { Agent } from "../types/agent";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormSelect } from "@/features/ui/form/FormSelect";
import { FormTextarea } from "@/features/ui/form/FormTextarea";
import { Button } from "@/features/ui/button/Button";

type EditAgentDialogProps = {
  agent: Agent | null;
  onClose: () => void;
};

const typeOptions = [
  { label: "Research", value: "Research" },
  { label: "Coding", value: "Coding" },
  { label: "Data Analysis", value: "Data Analysis" },
  { label: "Content Writing", value: "Content Writing" },
];

const modelOptions = [
  { label: "GPT-4.1", value: "GPT-4.1" },
  { label: "Claude", value: "Claude" },
  { label: "Gemini", value: "Gemini" },
];

export default function EditAgentDialog({
  agent,
  onClose,
}: EditAgentDialogProps) {
  const updateAgent = useAgentStore((state) => state.updateAgent);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Research");
  const [model, setModel] = useState("GPT-4.1");

  useEffect(() => {
    if (!agent) return;

    setName(agent.name);
    setDescription(agent.description);
    setType(agent.type ?? "Research");
    setModel(agent.model);
  }, [agent]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!agent || !name.trim()) return;

    updateAgent(agent.id, {
      name: name.trim(),
      description: description.trim(),
      type,
      model,
    });

    onClose();
  }

  if (!agent) return null;

  return (
    <Dialog
      open={Boolean(agent)}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      title="Edit Agent"
      description="Update your agent configuration."
      size="lg"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={onClose}
          />

          <Button
            title="Save Changes"
            icon={<Pencil size={15} />}
            type="submit"
            form="edit-agent-form"
          />
        </>
      }
    >
      <form
        id="edit-agent-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          id="edit-agent-name"
          label="Agent name"
          value={name}
          onChange={setName}
          placeholder="e.g. Research Agent"
          required
        />

        <FormTextarea
          id="edit-agent-description"
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="What does this agent do?"
          rows={3}
        />

        <FormSelect
          id="edit-agent-type"
          label="Agent type"
          value={type}
          onChange={setType}
          options={typeOptions}
        />

        <FormSelect
          id="edit-agent-model"
          label="AI Model"
          value={model}
          onChange={setModel}
          options={modelOptions}
        />
      </form>
    </Dialog>
  );
}
