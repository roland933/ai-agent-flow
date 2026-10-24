
import { useState } from "react";
import { Bot, X } from "lucide-react";
import { useAgents } from "@/context/AgentContext";

type CreateAgentDialogProps = {
  open: boolean;
  onClose: () => void;

};

export default function CreateAgentDialog({
  open,
  onClose,
}: CreateAgentDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Research");
  const [model, setModel] = useState("GPT-4.1");
  const { createAgent } = useAgents();
  if (!open) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    // Később itt hívjuk majd a backend API-t.
    createAgent({ name, description, type, model });
    setName("");
    setDescription("");
    setType("Research");
    setModel("GPT-4.1");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#101827] p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Create New Agent</h2>
            <p className="mt-1 text-sm text-slate-400">
              Configure your AI agent.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <label className="mb-2 block text-sm text-slate-300">
          Agent name
        </label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Research Agent"
          className="mb-5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
        />

        <label className="mb-2 block text-sm text-slate-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What should this agent do?"
          rows={3}
          className="mb-5 w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
        />

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Agent type
            </label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm"
            >
              <option>Research</option>
              <option>Code</option>
              <option>Content</option>
              <option>Data</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Model
            </label>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm"
            >
              <option>GPT-4.1</option>
              <option>Claude</option>
              <option>Local model</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm hover:bg-slate-800"
          >
            Cancel
          </button>

          <button

            type="submit"
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium hover:bg-violet-500"
          >
            <Bot size={16} />
            Create Agent
          </button>
        </div>
      </form>
    </div>
  );
}
