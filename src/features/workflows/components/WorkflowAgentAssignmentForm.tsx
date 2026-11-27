
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import AgentSelector from "@/features/agents/components/AgentSelector";
import { useAgentStore } from "@/features/agents/store/agentStore";

import type { WorkflowAssignmentDraft } from "../types/workflow";
import { WORKFLOW_CONFIG } from "../config/config";

type WorkflowAgentAssignmentFormProps = {
  assignments: WorkflowAssignmentDraft[];
  onChange: (assignments: WorkflowAssignmentDraft[]) => void;
};

export default function WorkflowAgentAssignmentForm({
  assignments,
  onChange,
}: WorkflowAgentAssignmentFormProps) {
  const agents = useAgentStore((state) => state.agents);

const selectedAgentIds = [...assignments]
  .sort((a, b) => a.sequence - b.sequence)
  .map((assignment) => assignment.agentId);

  const handleAgentChange = (agentIds: number[]) => {
    const updatedAssignments = agentIds.map((agentId, index) => {
      const existing = assignments.find(
        (assignment) => assignment.agentId === agentId
      );

      return existing ?? {
        agentId,
        instructions: "",
        sequence: index + 1,
      };
    });

    onChange(
      updatedAssignments.map((assignment, index) => ({
        ...assignment,
        sequence: index + 1,
      }))
    );
  };

  const handleInstructionsChange = (
    agentId: number,
    instructions: string
  ) => {
    onChange(
      assignments.map((assignment) =>
        assignment.agentId === agentId
          ? { ...assignment, instructions }
          : assignment
      )
    );
  };

  const handleRemove = (agentId: number) => {
    onChange(
      assignments
        .filter((assignment) => assignment.agentId !== agentId)
        .map((assignment, index) => ({
          ...assignment,
          sequence: index + 1,
        }))
    );
  };

  const handleMove = (agentId: number, direction: -1 | 1) => {
    const currentIndex = assignments.findIndex(
      (assignment) => assignment.agentId === agentId
    );

    const targetIndex = currentIndex + direction;

    if (
      currentIndex === -1 ||
      targetIndex < 0 ||
      targetIndex >= assignments.length
    ) {
      return;
    }

    const updated = [...assignments];

    [updated[currentIndex], updated[targetIndex]] = [
      updated[targetIndex],
      updated[currentIndex],
    ];

    onChange(
      updated.map((assignment, index) => ({
        ...assignment,
        sequence: index + 1,
      }))
    );
  };

  return (
    <div className="space-y-8">
      {/* AGENT SELECTION */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">
              Select agents
            </h3>

            <span className="text-sm text-slate-400">
              {assignments.length} / {WORKFLOW_CONFIG.MAX_AGENTS}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Choose the agents that will participate in this workflow.
          </p>
        </div>

        <AgentSelector
          agents={agents}
          selectedAgents={selectedAgentIds}
          onChange={handleAgentChange}
          maxSelected={WORKFLOW_CONFIG.MAX_AGENTS}
        />
      </section>

      {/* ASSIGNED AGENTS */}
      {assignments.length > 0 && (
        <section className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              Agent configuration
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Define individual instructions and execution order.
            </p>
          </div>

          {assignments.map((assignment, index) => {
            const agent = agents.find(
              (item) => item.id === assignment.agentId
            );

            if (!agent) return null;

            return (
              <div
                key={assignment.agentId}
                className="rounded-xl border border-white/10 bg-[#121621] p-5"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-sm font-semibold text-purple-300">
                      {index + 1}
                    </span>

                    <div>
                      <h4 className="font-semibold text-slate-100">
                        {agent.name}
                      </h4>

                      <p className="text-xs text-slate-400">
                        Execution order: {assignment.sequence}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() =>
                        handleMove(assignment.agentId, -1)
                      }
                      className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp size={17} />
                    </button>

                    <button
                      type="button"
                      disabled={index === assignments.length - 1}
                      onClick={() =>
                        handleMove(assignment.agentId, 1)
                      }
                      className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(assignment.agentId)}
                      className="rounded-md p-2 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      title="Remove agent"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                {/* INSTRUCTIONS */}
                <div className="mt-5 space-y-2">
                  <label className="text-sm font-medium text-slate-200">
                    Agent instructions
                  </label>

                  <textarea
                    value={assignment.instructions}
                    onChange={(event) =>
                      handleInstructionsChange(
                        assignment.agentId,
                        event.target.value
                      )
                    }
                    placeholder={`Describe what ${agent.name} should do in this workflow...`}
                    rows={8}
                    className="min-h-[200px] w-full resize-y rounded-lg border border-[#303747] bg-[#121621] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 outline-none transition-colors focus:border-purple-500"
                  />

                  <p className="text-xs text-slate-500">
                    These instructions define the specific responsibilities
                    of this agent.
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {assignments.length === 0 && (
        <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-white/10">
          <p className="text-sm text-slate-500">
            Select at least one agent to configure your workflow.
          </p>
        </div>
      )}
    </div>
  );
}
