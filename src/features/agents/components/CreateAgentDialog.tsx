
import {  useState } from "react";
import { Bot } from "lucide-react";
import { useAgentStore } from "../store/agentStore";

import { Dialog } from "@/features/ui/dialog/Dialog";
import { FormInput } from "@/features/ui/form/FormInput";
import { FormSelect } from "@/features/ui/form/FormSelect";
import { FormTextarea } from "@/features/ui/form/FormTextarea";
import { Button } from "@/features/ui/button/Button";
import AgentTypeSelect from "@/components/common/ui/AgentTypeSelect";
import AgentModelSelect from "@/components/common/ui/AgentModelSelect";

type CreateAgentDialogProps = {
  open: boolean;
  onClose: () => void;
};



export default function CreateAgentDialog({
  open,
  onClose,
}: CreateAgentDialogProps) {
  const createAgent = useAgentStore((state) => state.createAgent);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Research");
  const [model, setModel] = useState("GPT-4.1");

  function resetForm() {
    setName("");
    setDescription("");
    setType("Research");
    setModel("GPT-4.1");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) onClose();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    createAgent({
      name: name.trim(),
      description: description.trim(),
      type,
      model,
    });

    resetForm();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Create New Agent"
      description="Configure your AI agent."
      size="lg"
      footer={
        <>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={onClose}
          />

          <Button
            title="Create Agent"
            icon={<Bot size={16} />}
            type="submit"
            form="create-agent-form"
          />
        </>
      }
    >
      <form
        id="create-agent-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          id="agent-name"
          label="Agent name"
          value={name}
          onChange={setName}
          placeholder="e.g. Research Agent"
          required
        />

        <FormTextarea
          id="agent-description"
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="What should this agent do?"
          rows={3}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AgentTypeSelect
            value={type}
            onChange={setType}
           
          />

          <AgentModelSelect
            value={model}
            onChange={setModel}
          />
        </div>
      </form>
    </Dialog>
  );
}
