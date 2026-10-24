
import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

import { useAgents } from "@/context/AgentContext";
import type { Agent } from "@/context/AgentContext";

type EditAgentDialogProps = {
  agent: Agent | null;
  onClose: () => void;
};

export default function EditAgentDialog({
  agent,
  onClose,
}: EditAgentDialogProps) {
  const { updateAgent } = useAgents();

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

  if (!agent) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) return;

    updateAgent(agent.id, {
      name,
      description,
      type,
      model,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#101827] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Edit Agent</h2>
            <p className="mt-1 text-sm text-slate-400">
              Update your agent configuration.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Agent name
            </label>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#090f1a] px-3 py-2.5 text-sm outline-none focus:border-violet-500"
              placeholder="e.g. Research Agent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full resize-y rounded-lg border border-slate-700 bg-[#090f1a] px-3 py-2.5 text-sm outline-none focus:border-violet-500"
              placeholder="What does this agent do?"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Agent type
            </label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#090f1a] px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="Research">Research</option>
              <option value="Coding">Coding</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Content Writing">Content Writing</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              AI Model
            </label>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#090f1a] px-3 py-2.5 text-sm outline-none focus:border-violet-500"
            >
              <option value="GPT-4.1">GPT-4.1</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500"
            >
              <Pencil size={15} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
