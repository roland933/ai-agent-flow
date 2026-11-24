
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

  Lock,
  Pencil,
  Play,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { AgentAssignmentDialog } from "@/features/workflows/components/AgentAssignmentDialog";
import { WorkflowTaskDialog } from "@/features/workflows/components/WorkflowTaskDialog";
import {
  CreateWorkflowDialog,
  type CreateWorkflowData,
} from "@/features/workflows/components/CreateWorkflowDialog";

import {
  EditWorkflowDialog,
} from "@/features/workflows/components/EditWorkflowDialog";



type AgentStatus = "idle" | "pending" | "running" | "completed" | "failed";
type TaskStatus = "draft" | "running" | "completed" | "failed";

type WorkflowAssignment = {
  id: number;
  agentId: number;
  agentName: string;
  instructions: string;
  status: AgentStatus;
};
type OutputFormat = "markdown" | "json" | "text";

type Workflow = {
  id: number;
  name: string;
  description: string;
  taskTitle: string;
  taskDescription: string;
  taskStatus: TaskStatus;
  assignments: WorkflowAssignment[];
  outputName: string;
  outputDescription: string;
  outputFormat: OutputFormat;
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
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [assignmentInstructions, setAssignmentInstructions] = useState("");
  const [editingAssignment, setEditingAssignment] = useState<{
    workflowId: number;
    assignmentId: number | null;
  } | null>(null);

  const [createWorkflowDialogOpen, setCreateWorkflowDialogOpen] =
    useState(false);

  const [editWorkflowDialogOpen, setEditWorkflowDialogOpen] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<number | null>(null);
  const [editingWorkflowData, setEditingWorkflowData] =
    useState<CreateWorkflowData | null>(null);


  const openEditWorkflow = (workflow: Workflow) => {
    setEditingWorkflowId(workflow.id);

    setEditingWorkflowData({
      name: workflow.name,
      description: workflow.description,
      taskTitle: workflow.taskTitle,
      taskDescription: workflow.taskDescription,
      outputName: workflow.outputName,
      outputDescription: workflow.outputDescription,
      outputFormat: workflow.outputFormat,
    });

    setEditWorkflowDialogOpen(true);
  };

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTaskWorkflowId, setEditingTaskWorkflowId] = useState<number | null>(null);

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

  const handleSaveWorkflowTask = (data: {
    title: string;
    description: string;
  }) => {
    if (editingTaskWorkflowId === null) return;

    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === editingTaskWorkflowId
          ? {
            ...workflow,
            taskTitle: data.title,
            taskDescription: data.description,
          }
          : workflow
      )
    );

    setTaskDialogOpen(false);
    setEditingTaskWorkflowId(null);
  };

  const handleSaveWorkflow = (data: CreateWorkflowData) => {
    if (editingWorkflowId === null) return;

    setWorkflows((current) =>
      current.map((workflow) =>
        workflow.id === editingWorkflowId
          ? {
            ...workflow,
            ...data,
          }
          : workflow
      )
    );

    setEditWorkflowDialogOpen(false);
    setEditingWorkflowId(null);
    setEditingWorkflowData(null);
  };


  const handleSaveAssignment = (data: {
    agentId: number;
    instructions: string;
  }) => {
    if (!editingAssignment) return;

    const selectedAgent = agents.find(
      (agent) => agent.id === data.agentId
    );

    if (!selectedAgent) return;

    setWorkflows((prev) =>
      prev.map((workflow) => {
        if (workflow.id !== editingAssignment.workflowId) {
          return workflow;
        }

        if (editingAssignment.assignmentId === null) {
          if (workflow.assignments.length >= MAX_AGENTS) {
            return workflow;
          }

          return {
            ...workflow,
            assignments: [
              ...workflow.assignments,
              {
                id: Date.now(),
                agentId: selectedAgent.id,
                agentName: selectedAgent.name,
                instructions: data.instructions,
                status: "idle" as AgentStatus,
              },
            ],
          };
        }

        return {
          ...workflow,
          assignments: workflow.assignments.map((assignment) =>
            assignment.id === editingAssignment.assignmentId
              ? {
                ...assignment,
                agentId: selectedAgent.id,
                agentName: selectedAgent.name,
                instructions: data.instructions,
              }
              : assignment
          ),
        };
      })
    );

    setEditingAssignment(null);
  };

  const toggleExpanded = (id: number) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };
  const handleCreateWorkflow = (data: CreateWorkflowData) => {
    const id = Date.now();

    const newWorkflow: Workflow = {
      id,
      name: data.name,
      description: data.description,
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      outputName: data.outputName,
      outputDescription: data.outputDescription,
      outputFormat: data.outputFormat,
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

  const openAddAssignmentModal = (workflowId: number) => {
  setEditingAssignment({
    workflowId,
    assignmentId: null,
  });

  setSelectedAgentId(null);
  setAssignmentInstructions("");
  setAssignmentModalOpen(true);
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


      <section className="mt-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#F1F2F7] uppercase">My workflows</h2>
            <p className="mt-1 text-md text-[#9299AA]">
              Manage and reuse your workflow templates.
            </p>
          </div>

          <button
            onClick={() => setCreateWorkflowDialogOpen(true)}
            className="hover:cursor-pointer flex items-center gap-2 rounded-xl bg-[#8B7CF6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7969E8]"
          >
            <Plus size={17} />
            Create workflow
          </button>
        </div>


        <CreateWorkflowDialog
          open={createWorkflowDialogOpen}
          onOpenChange={setCreateWorkflowDialogOpen}
          onSubmit={(data) => {
            handleCreateWorkflow(data);
            setCreateWorkflowDialogOpen(false);
          }}
        />

        <EditWorkflowDialog
          open={editWorkflowDialogOpen}
          onOpenChange={(open) => {
            setEditWorkflowDialogOpen(open);

            if (!open) {
              setEditingWorkflowId(null);
              setEditingWorkflowData(null);
            }
          }}
          workflow={editingWorkflowData}
          onSubmit={handleSaveWorkflow}
        />

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
                      onClick={() => openEditWorkflow(workflow)}
                      disabled={isRunning}
                      title="Edit workflow"
                      className="rounded-lg p-2 text-[#9299AA] transition-colors hover:bg-[#252B38] hover:text-[#A99FFF] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Pencil size={16} />
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
                                 {String(index + 1).padStart(2, "0")}
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
                                onClick={() => openEditAssignmentModal(workflow.id, assignment)}
                                disabled={isRunning}
                                title={assignment.instructions ? "Edit instructions" : "Add instructions"}
                                className="hover:cursor-pointer rounded-lg p-2 text-current transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                              >
                                {assignment.agentId ? <Pencil size={16} /> : <Plus size={17} />}
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
                           onClick={() => openAddAssignmentModal(workflow.id)}
                            disabled={isRunning}
                            className="hover:cursor-pointer flex min-h-[190px] w-[190px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#655A91] bg-[#171626]/50 text-[#A99FFF] transition-colors hover:border-[#A99FFF] hover:bg-[#8B7CF6]/10 disabled:cursor-not-allowed disabled:opacity-30"
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

                    {editingTaskWorkflowId !== null && (
                      <WorkflowTaskDialog
                        open={taskDialogOpen}
                        onOpenChange={(open) => {
                          setTaskDialogOpen(open);

                          if (!open) {
                            setEditingTaskWorkflowId(null);
                          }
                        }}
                        initialTitle={
                          workflows.find((w) => w.id === editingTaskWorkflowId)?.taskTitle ?? ""
                        }
                        initialDescription={
                          workflows.find((w) => w.id === editingTaskWorkflowId)?.taskDescription ?? ""
                        }
                        onSubmit={handleSaveWorkflowTask}
                      />
                    )}

                    <AgentAssignmentDialog
                      open={
                        assignmentModalOpen &&
                        editingAssignment?.workflowId === workflow.id
                      }
                      onOpenChange={(open) => {
                        setAssignmentModalOpen(open);

                        if (!open) {
                          setEditingAssignment(null);
                        }
                      }}
                      initialAgentId={
                        workflow.assignments.find(
                          (assignment) =>
                            assignment.id === editingAssignment?.assignmentId
                        )?.agentId ?? null
                      }
                      initialInstructions={
                        workflow.assignments.find(
                          (assignment) =>
                            assignment.id === editingAssignment?.assignmentId
                        )?.instructions ?? ""
                      }
                      excludedAgentIds={workflow.assignments
                        .filter(
                          (assignment) =>
                            assignment.id !== editingAssignment?.assignmentId
                        )
                        .map((assignment) => assignment.agentId)}
                      onSubmit={handleSaveAssignment}
                    />




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
              <p className="text-xl font-medium text-[#F1F2F7]">No workflows yet</p>
              <p className="mt-1 text-md text-[#9299AA]">Create your first workflow to get started.</p>
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

    </DashboardLayout>
  );
}
