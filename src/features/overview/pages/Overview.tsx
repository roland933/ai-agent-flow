
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Copy,
  GitBranch,
  Layers3,
  Lock,
  Pencil,
  Play,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { HeaderLayout } from "@/components/layout/HeaderLayout";
import AgentSelect from "@/features/agents/components/AgentSelect";
import { useAgentStore } from "@/features/agents/store/agentStore";
type AgentStatus = "idle" | "pending" | "running" | "completed" | "failed";
type TaskStatus = "draft" | "running" | "completed" | "failed";

type WorkflowAssignment = {
  id: number;
  agentId: number;
  agentName: string;
  instructions: string;
  status: AgentStatus;
};

type Workflow = {
  id: number;
  name: string;
  description: string;
  taskTitle: string;
  taskStatus: TaskStatus;
  assignments: WorkflowAssignment[];
};

const PAGE_SIZE = 5;
const MAX_AGENTS = 3;

const initialWorkflows: Workflow[] = [
  {
    id: 1,
    name: "Market Research",
    description: "Research and analyze market opportunities.",
    taskTitle: "Prepare a market research report",
    taskStatus: "draft",
    assignments: [
      { id: 1, agentName: "Research Agent", instructions: "Research competitors and collect market data.", status: "idle" },
      { id: 2, agentName: "Data Analyst", instructions: "Analyze collected data and identify trends.", status: "idle" },
      { id: 3, agentName: "Report Agent", instructions: "Prepare a final report based on the analysis.", status: "idle" },
    ],
  },
  {
    id: 2,
    name: "Content Creation",
    description: "Create and review content with AI agents.",
    taskTitle: "Create a blog article",
    taskStatus: "draft",
    assignments: [
      { id: 4, agentName: "Research Agent", instructions: "Collect relevant information about the topic.", status: "idle" },
      { id: 5, agentName: "Writer Agent", instructions: "Write an article using the research.", status: "idle" },
    ],
  },
];

const statusStyles: Record<AgentStatus, string> = {
  idle: "border-[#8B7CF6]/30 bg-[#211D36] text-[#B4A5FF]",
  pending: "border-[#414653] bg-[#252832] text-[#9299AA]",
  running: "border-blue-400/40 bg-blue-500/15 text-blue-300",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

const taskStatusStyles: Record<TaskStatus, string> = {
  draft: "border-[#8B7CF6]/30 bg-[#211D36] text-[#B4A5FF]",
  running: "border-blue-400/40 bg-blue-500/15 text-blue-300",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

function StatusBadge({ status }: { status: AgentStatus | TaskStatus }) {
  const labels: Record<string, string> = {
    idle: "Not started",
    draft: "Draft",
    pending: "Pending",
    running: "Running",
    completed: "Completed",
    failed: "Failed",
  };

  const styles = status in statusStyles
    ? statusStyles[status as AgentStatus]
    : taskStatusStyles[status as TaskStatus];

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles}`}>
      {labels[status]}
    </span>
  );
}

export default function Overview() {
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<{
    workflowId: number;
    assignmentId: number | null;
  } | null>(null);

  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [assignmentInstructions, setAssignmentInstructions] = useState("");

  const [instructionTarget, setInstructionTarget] = useState<{
    workflowId: number;
    assignmentId: number;
  } | null>(null);

  const agents = useAgentStore((state) => state.agents);

  const [instructionText, setInstructionText] = useState("");

  const totalPages = Math.max(1, Math.ceil(workflows.length / PAGE_SIZE));
  const visibleWorkflows = workflows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const openAddAssignmentModal = (workflowId: number) => {
    setEditingAssignment({
      workflowId,
      assignmentId: null,
    });

    setSelectedAgentId(null);
    setAssignmentInstructions("");
    setAssignmentModalOpen(true);
  };

  const openEditAssignmentModal = (
    workflowId: number,
    assignment: WorkflowAssignment
  ) => {
    setEditingAssignment({
      workflowId,
      assignmentId: assignment.id,
    });

    setSelectedAgentId(assignment.agentId);
    setAssignmentInstructions(assignment.instructions);
    setAssignmentModalOpen(true);
  };

  const handleSaveAssignment = () => {
    if (!editingAssignment || selectedAgentId === null) return;

    const workflow = workflows.find(
      (item) => item.id === editingAssignment.workflowId
    );

    if (!workflow) return;

    const selectedAgent = agents.find(
      (agent) => agent.id === selectedAgentId
    );

    if (!selectedAgent) return;

    // Ne lehessen ugyanazt az agentet kétszer hozzáadni.
    const alreadyAssigned = workflow.assignments.some(
      (assignment) =>
        assignment.agentId === selectedAgentId &&
        assignment.id !== editingAssignment.assignmentId
    );

    if (alreadyAssigned) return;

    setWorkflows((prev) =>
      prev.map((item) => {
        if (item.id !== editingAssignment.workflowId) return item;

        if (editingAssignment.assignmentId === null) {
          if (item.assignments.length >= MAX_AGENTS) return item;

          return {
            ...item,
            assignments: [
              ...item.assignments,
              {
                id: Date.now(),
                agentId: selectedAgent.id,
                agentName: selectedAgent.name,
                instructions: assignmentInstructions,
                status: "idle" as AgentStatus,
              },
            ],
          };
        }

        return {
          ...item,
          assignments: item.assignments.map((assignment) =>
            assignment.id === editingAssignment.assignmentId
              ? {
                ...assignment,
                agentId: selectedAgent.id,
                agentName: selectedAgent.name,
                instructions: assignmentInstructions,
              }
              : assignment
          ),
        };
      })
    );

    setAssignmentModalOpen(false);
    setEditingAssignment(null);
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const handleCreateWorkflow = () => {
    const id = Date.now();

    const newWorkflow: Workflow = {
      id,
      name: "New workflow",
      description: "Configure your workflow.",
      taskTitle: "New task",
      taskStatus: "draft",
      assignments: [],
    };

    setWorkflows((current) => [newWorkflow, ...current]);
    setCurrentPage(1);
    setExpandedIds((current) => [id, ...current]);
  };

  const handleDuplicate = (workflow: Workflow) => {
    const id = Date.now();

    const duplicate: Workflow = {
      ...workflow,
      id,
      name: `${workflow.name} (Copy)`,
      taskStatus: "draft",
      assignments: workflow.assignments.map((assignment) => ({
        ...assignment,
        id: Math.floor(Math.random() * 1_000_000_000),
        status: "idle",
      })),
    };

    setWorkflows((current) => [duplicate, ...current]);
    setCurrentPage(1);
    setExpandedIds((current) => [id, ...current]);
  };

  const handleDelete = (id: number) => {
    setWorkflows((current) => current.filter((workflow) => workflow.id !== id));
    setExpandedIds((current) => current.filter((item) => item !== id));
  };

  const handleAddAgent = (workflow: Workflow) => {
    if (workflow.assignments.length >= MAX_AGENTS) return;

    const newAssignment: WorkflowAssignment = {
      id: Date.now(),
      agentName: "New Agent",
      instructions: "",
      status: "idle",
    };

    setWorkflows((current) =>
      current.map((item) =>
        item.id === workflow.id
          ? { ...item, assignments: [...item.assignments, newAssignment] }
          : item,
      ),
    );
  };

  const handleDeleteAgent = (workflowId: number, assignmentId: number) => {
    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === workflowId
          ? {
            ...workflow,
            assignments: workflow.assignments.filter(
              (assignment) => assignment.id !== assignmentId,
            ),
          }
          : workflow,
      ),
    );
  };

  const openInstructions = (workflow: Workflow, assignment: WorkflowAssignment) => {
    setInstructionTarget({
      workflowId: workflow.id,
      assignmentId: assignment.id,
    });
    setInstructionText(assignment.instructions);
  };

  const saveInstructions = () => {
    if (!instructionTarget) return;

    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === instructionTarget.workflowId
          ? {
            ...workflow,
            assignments: workflow.assignments.map((assignment) =>
              assignment.id === instructionTarget.assignmentId
                ? { ...assignment, instructions: instructionText }
                : assignment,
            ),
          }
          : workflow,
      ),
    );

    setInstructionTarget(null);
  };

  const handleRun = async (workflow: Workflow) => {
    if (workflow.taskStatus === "running" || workflow.assignments.length === 0) return;

    const workflowId = workflow.id;

    setWorkflows((current) =>
      current.map((item) =>
        item.id === workflowId
          ? {
            ...item,
            taskStatus: "running",
            assignments: item.assignments.map((assignment, index) => ({
              ...assignment,
              status: index === 0 ? "running" : "pending",
            })),
          }
          : item,
      ),
    );

    // Demo-only sequential execution.
    for (let index = 0; index < workflow.assignments.length; index++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setWorkflows((current) =>
        current.map((item) =>
          item.id === workflowId
            ? {
              ...item,
              assignments: item.assignments.map((assignment, assignmentIndex) => ({
                ...assignment,
                status:
                  assignmentIndex < index
                    ? "completed"
                    : assignmentIndex === index
                      ? "completed"
                      : assignmentIndex === index + 1
                        ? "running"
                        : "pending",
              })),
            }
            : item,
        ),
      );
    }

    setWorkflows((current) =>
      current.map((item) =>
        item.id === workflowId
          ? {
            ...item,
            taskStatus: "completed",
            assignments: item.assignments.map((assignment) => ({
              ...assignment,
              status: "completed",
            })),
          }
          : item,
      ),
    );
  };

  return (
    <DashboardLayout>
      <HeaderLayout
        title="Overview"
        icon={<Layers3 />}
        subTitle="Create, manage and reuse your AI workflows."
      />

      <section className="mt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#F1F2F7]">
            How AgentFlow works
          </h2>
          <p className="mt-1 text-sm text-[#9299AA]">
            Build reusable workflows with your AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { number: "01", title: "Create workflow", description: "Start with a new workflow template.", icon: GitBranch },
            { number: "02", title: "Create task", description: "Define the common task description.", icon: ClipboardList },
            { number: "03", title: "Choose agents", description: "Select up to three AI agents.", icon: Bot },
            { number: "04", title: "Add instructions", description: "Give each agent its own instructions.", icon: Pencil },
            { number: "05", title: "Run workflow", description: "Execute your agents sequentially.", icon: Play },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#8B7CF6]/20 bg-[#8B7CF6]/10 text-xs font-semibold text-[#A99FFF]">
                  {step.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-[#A99FFF]" />
                    <h3 className="text-sm font-medium text-[#F1F2F7]">{step.title}</h3>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#9299AA]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#F1F2F7]">My workflows</h2>
            <p className="mt-1 text-sm text-[#9299AA]">
              Manage and reuse your workflow templates.
            </p>
          </div>

          <button
            onClick={handleCreateWorkflow}
            className="flex items-center gap-2 rounded-xl bg-[#8B7CF6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7969E8]"
          >
            <Plus size={17} />
            Create workflow
          </button>
        </div>

        <div className="space-y-4">
          {visibleWorkflows.map((workflow) => {
            const isExpanded = expandedIds.includes(workflow.id);
            const isRunning = workflow.taskStatus === "running";

            return (
              <article
                key={workflow.id}
                className="overflow-hidden rounded-2xl border border-[#303444] bg-[#121620] shadow-lg shadow-black/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <button
                    onClick={() => toggleExpanded(workflow.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8B7CF6]/20 bg-[#8B7CF6]/10 text-[#A99FFF]">
                      <GitBranch size={19} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-[#F1F2F7]">{workflow.name}</h3>
                      <p className="mt-1 truncate text-sm text-[#9299AA]">{workflow.description}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`ml-2 shrink-0 text-[#9299AA] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={workflow.taskStatus} />

                    <button
                      onClick={() => handleRun(workflow)}
                      disabled={isRunning || workflow.assignments.length === 0}
                      title="Run workflow"
                      className="flex items-center gap-2 rounded-lg bg-[#8B7CF6] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#7969E8] disabled:cursor-not-allowed disabled:bg-[#303444] disabled:text-[#777D8B]"
                    >
                      {isRunning ? (
                        <Lock size={14} />
                      ) : (
                        <Play size={14} />
                      )}
                      {isRunning ? "Running..." : "Run"}
                    </button>

                    <button
                      onClick={() => handleDuplicate(workflow)}
                      disabled={isRunning}
                      title="Duplicate workflow"
                      className="rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-[#252B38] hover:text-[#A99FFF] disabled:opacity-30"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(workflow.id)}
                      disabled={isRunning}
                      title="Delete workflow"
                      className="rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#252B38] p-5">
                    <div className="mb-5 rounded-xl border border-[#303444] bg-[#191E2A] p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9299AA]">
                          <ClipboardList size={14} />
                          Shared task
                        </div>
                        <StatusBadge status={workflow.taskStatus} />
                      </div>
                      <p className="text-sm font-medium text-[#F1F2F7]">{workflow.taskTitle}</p>
                    </div>

                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9299AA]">
                        Agent sequence
                      </h4>
                      <span className="text-xs text-[#9299AA]">
                        {workflow.assignments.length} / {MAX_AGENTS} agents
                      </span>
                    </div>

                    <div className="flex items-stretch gap-3 overflow-x-auto pb-3">
                      {workflow.assignments.map((assignment, index) => (
                        <div key={assignment.id} className="flex shrink-0 items-center gap-3">
                          <div
                            className={`w-[230px] rounded-xl border p-4 transition-colors ${statusStyles[assignment.status]
                              }`}
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                                STEP {String(index + 1).padStart(2, "0")}
                              </span>
                              <Bot size={17} />
                            </div>

                            <h4 className="truncate text-sm font-semibold text-[#F1F2F7]">
                              {assignment.agentName}
                            </h4>

                            <div className="mt-3">
                              <StatusBadge status={assignment.status} />
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                              <button
                                onClick={() => openInstructions(workflow, assignment)}
                                disabled={isRunning}
                                title={assignment.instructions ? "Edit instructions" : "Add instructions"}
                                className="rounded-lg p-2 text-current transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                {assignment.instructions ? <Pencil size={16} /> : <Plus size={17} />}
                              </button>

                              <button
                                onClick={() => handleDeleteAgent(workflow.id, assignment.id)}
                                disabled={isRunning}
                                title="Remove agent"
                                className="rounded-lg p-2 text-current transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {index !== workflow.assignments.length - 1 && (
                            <ArrowRight size={18} className="shrink-0 text-[#6F668F]" />
                          )}
                        </div>
                      ))}

                      {workflow.assignments.length < MAX_AGENTS && (
                        <>
                          {workflow.assignments.length > 0 && (
                            <ArrowRight size={18} className="shrink-0 self-center text-[#6F668F]" />
                          )}
                          <button
                            onClick={() => handleAddAgent(workflow)}
                            disabled={isRunning}
                            className="flex min-h-[190px] w-[190px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#655A91] bg-[#171626]/50 text-[#A99FFF] transition-colors hover:border-[#A99FFF] hover:bg-[#8B7CF6]/10 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Plus size={24} />
                            <span className="text-sm font-medium">Add agent</span>
                            <span className="text-xs text-[#9299AA]">
                              {MAX_AGENTS - workflow.assignments.length} slot(s) available
                            </span>
                          </button>
                        </>
                      )}
                    </div>

                    {isRunning && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-blue-300">
                        <Lock size={13} />
                        Workflow is running. Editing is disabled.
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}

          {workflows.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#303444] py-12 text-center">
              <GitBranch className="mx-auto mb-3 text-[#777D8B]" size={28} />
              <p className="text-sm font-medium text-[#F1F2F7]">No workflows yet</p>
              <p className="mt-1 text-xs text-[#9299AA]">Create your first workflow to get started.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#9299AA]">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, workflows.length)} of {workflows.length} workflows
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-[#303444] p-2 text-[#9299AA] hover:bg-[#252B38] disabled:opacity-30"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-xs font-medium ${currentPage === page
                      ? "bg-[#8B7CF6] text-white"
                      : "border border-[#303444] text-[#9299AA] hover:bg-[#252B38]"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-[#303444] p-2 text-[#9299AA] hover:bg-[#252B38] disabled:opacity-30"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </section>

      {instructionTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#303444] bg-[#151923] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#303444] p-5">
              <div>
                <h3 className="font-semibold text-[#F1F2F7]">Agent instructions</h3>
                <p className="mt-1 text-xs text-[#9299AA]">
                  Define what this agent should do.
                </p>
              </div>
              <button
                onClick={() => setInstructionTarget(null)}
                className="rounded-lg p-2 text-[#9299AA] hover:bg-[#252B38]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <textarea
                value={instructionText}
                onChange={(event) => setInstructionText(event.target.value)}
                rows={7}
                placeholder="Write instructions for this agent..."
                className="w-full resize-y rounded-xl border border-[#303444] bg-[#0B0D12] p-4 text-sm text-[#F1F2F7] outline-none placeholder:text-[#6F7686] focus:border-[#8B7CF6]"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-[#303444] p-5">
              <button
                onClick={() => setInstructionTarget(null)}
                className="rounded-lg border border-[#303444] px-4 py-2 text-sm text-[#9299AA] hover:bg-[#252B38]"
              >
                Cancel
              </button>
              <button
                onClick={saveInstructions}
                className="rounded-lg bg-[#8B7CF6] px-4 py-2 text-sm font-medium text-white hover:bg-[#7969E8]"
              >
                Save instructions
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
