
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Plus,
} from "lucide-react";

import type {
  AgentStatus,
  WorkflowAssignment,
  Workflow,
} from "@/features/workflows/types/workflow";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAgentStore } from "@/features/agents/store/agentStore";
import { type CreateWorkflowData } from "@/features/workflows/components/CreateWorkflowDialog";

import { initialWorkflows } from "@/features/workflows/data/mock-workflows";


const PAGE_SIZE = 5;
const MAX_AGENTS = 3;



import {
  WorkflowCard,
  CreateWorkflowDialog,
  EditWorkflowDialog,
  AgentAssignmentDialog,
  WorkflowTaskDialog,
} from "@/features/workflows/components";
import Pagination from "@/components/common/ui/Pagination";

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

  const activeWorkflow = workflows.find(
    (workflow) => workflow.id === editingAssignment?.workflowId
  );

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

  const activeTaskWorkflow = workflows.find(
    (workflow) => workflow.id === editingTaskWorkflowId
  );

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
          {visibleWorkflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              isExpanded={expandedIds.includes(workflow.id)}
              isRunning={workflow.taskStatus === "running"}
              maxAgents={MAX_AGENTS}
              onToggle={toggleExpanded}
              onRun={handleRun}
              onEdit={openEditWorkflow}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onEditAgent={openEditAssignmentModal}
              onDeleteAgent={handleDeleteAgent}
              onAddAgent={openAddAssignmentModal}
            />
          ))}

          {activeWorkflow && (
            <AgentAssignmentDialog
              open={assignmentModalOpen}
              onOpenChange={(open) => {
                setAssignmentModalOpen(open);

                if (!open) {
                  setEditingAssignment(null);
                }
              }}
              initialAgentId={
                activeWorkflow.assignments.find(
                  (assignment) =>
                    assignment.id === editingAssignment?.assignmentId
                )?.agentId ?? null
              }
              initialInstructions={
                activeWorkflow.assignments.find(
                  (assignment) =>
                    assignment.id === editingAssignment?.assignmentId
                )?.instructions ?? ""
              }
              excludedAgentIds={activeWorkflow.assignments
                .filter(
                  (assignment) =>
                    assignment.id !== editingAssignment?.assignmentId
                )
                .map((assignment) => assignment.agentId)}
              onSubmit={handleSaveAssignment}
            />
          )}


          {activeTaskWorkflow && (
            <WorkflowTaskDialog
              open={taskDialogOpen}
              onOpenChange={(open) => {
                setTaskDialogOpen(open);

                if (!open) {
                  setEditingTaskWorkflowId(null);
                }
              }}
              initialTitle={activeTaskWorkflow.taskTitle}
              initialDescription={activeTaskWorkflow.taskDescription}
              onSubmit={handleSaveWorkflowTask}
            />
          )}

          {workflows.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#303444] py-12 text-center">
              <GitBranch className="mx-auto mb-3 text-[#777D8B]" size={28} />
              <p className="text-xl font-medium text-[#F1F2F7]">No workflows yet</p>
              <p className="mt-1 text-md text-[#9299AA]">Create your first workflow to get started.</p>
            </div>
          )}
        </div>



        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={workflows.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
            itemLabel="workflows"
          />
        )}
      </section>

    </DashboardLayout>
  );
}
