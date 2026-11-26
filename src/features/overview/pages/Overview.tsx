
import { useState } from "react";
import {
  GitBranch,
  Plus,
} from "lucide-react";

import type {
  WorkflowAssignment,
  Workflow,
} from "@/features/workflows/types/workflow";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { type CreateWorkflowData } from "@/features/workflows/components/CreateWorkflowDialog";
import { useWorkflowPagination } from "@/features/workflows/hooks/useWorkflowPagination";
import {
  WorkflowCard,
  CreateWorkflowDialog,
  EditWorkflowDialog,
  AgentAssignmentDialog,
  WorkflowTaskDialog,
} from "@/features/workflows/components";

import Pagination from "@/components/common/ui/Pagination";
import { WORKFLOW_CONFIG } from "@/features/workflows/config/config";

import { useWorkflowState } from "@/features/workflows/hooks/useWorkflowState";
import { useWorkflowActions } from "@/features/workflows/hooks/useWorkflowActions";
import { useWorkflowAgents } from "@/features/workflows/hooks/useWorkflowAgents";
import { useWorkflowEditor } from "@/features/workflows/hooks/useWorkflowEditor";

export default function Overview() {
  const { workflows, setWorkflows } = useWorkflowState();

  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [createWorkflowDialogOpen, setCreateWorkflowDialogOpen] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<number | null>(null);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    visibleWorkflows,
  } = useWorkflowPagination(workflows);


  const {
    handleCreateWorkflow,
    handleDuplicate,
    handleDelete,
  } = useWorkflowActions({
    setWorkflows,
    setExpandedIds,
    setCurrentPage,
  });


  const {
    agents,
    assignmentModalOpen,
    setAssignmentModalOpen,
    editingAssignment,
    setEditingAssignment,
    openEditAssignmentModal,
    openAddAssignmentModal,
    handleSaveAssignment,
    handleDeleteAgent,
  } = useWorkflowAgents({
    setWorkflows,
  });

  const {
  editWorkflowDialogOpen,
  editingWorkflowData,
  taskDialogOpen,
  editingTaskWorkflowId,
  openEditWorkflow,
  handleSaveWorkflow,
  handleSaveWorkflowTask,
  openEditTask,
  closeEditWorkflow,
  closeEditTask,
  setEditWorkflowDialogOpen,
  
} = useWorkflowEditor({
  setWorkflows,
});


  const toggleExpanded = (id: number) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const activeWorkflow = workflows.find(
    (workflow) => workflow.id === editingAssignment?.workflowId
  );

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
          onOpenChange={closeEditWorkflow}
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
              maxAgents={WORKFLOW_CONFIG.MAX_AGENTS}
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
              onOpenChange={closeEditTask}
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
            pageSize={WORKFLOW_CONFIG.PAGE_SIZE}
            onPageChange={setCurrentPage}
            itemLabel="workflows"
          />
        )}
      </section>

    </DashboardLayout>
  );
}
