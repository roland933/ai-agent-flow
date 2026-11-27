
import { useState,useEffect } from "react";
import {
  GitBranch,
  Plus,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  WorkflowCard,
  CreateWorkflowDialog,
  EditWorkflowDialog,
  AgentAssignmentDialog,
  WorkflowTaskDialog,
} from "@/features/workflows/components";

import Pagination from "@/components/common/ui/Pagination";
import { WORKFLOW_CONFIG } from "@/features/workflows/config/config";

import {
  useWorkflowState,
  useWorkflowPagination,
  useWorkflowActions,
  useWorkflowAgents,
  useWorkflowEditor,
  useWorkflowRunner,
} from "@/features/workflows/hooks";


import { useWorkflows } from "@/features/workflows/hooks/useWorkflows";
import { EmptyState } from "@/components/common/ui/EmptyState";

import Loading from "@/components/common/ui/Loading";


export default function Overview() {

  const {
    data: fetchedWorkflows,
    isLoading,
    isError,
    error,
    refetch,
  } = useWorkflows();





  const { workflows, setWorkflows } = useWorkflowState();

  const [expandedIds, setExpandedIds] = useState<number[]>([1]);
  const [createWorkflowDialogOpen, setCreateWorkflowDialogOpen] = useState(false);

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
  isCreating,
  createError,
} = useWorkflowActions({
  setWorkflows,
  setExpandedIds,
  setCurrentPage,
});


  const {
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
    closeEditWorkflow,
    closeEditTask,
  } = useWorkflowEditor({
    setWorkflows,
  });


  const { handleRun } = useWorkflowRunner({
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

  const activeTaskWorkflow = workflows.find(
    (workflow) => workflow.id === editingTaskWorkflowId
  );

  const activeAssignment = activeWorkflow?.assignments.find(
    (assignment) => assignment.id === editingAssignment?.assignmentId
  );

  const excludedAgentIds = activeWorkflow?.assignments
    .filter(
      (assignment) => assignment.id !== editingAssignment?.assignmentId
    )
    .map((assignment) => assignment.agentId)


  useEffect(() => {
    if (fetchedWorkflows) {
      setWorkflows(fetchedWorkflows);
    }
  }, [fetchedWorkflows, setWorkflows]);


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
            className="hover:cursor-pointer flex items-center  rounded-xl bg-[#8B7CF6] hover:bg-[#7969E8] px-4 py-2.5 text-sm font-medium text-white transition-colors "
          >
            <Plus size={19} />
         
          </button>
        </div>


        <CreateWorkflowDialog
          open={createWorkflowDialogOpen}
          onOpenChange={setCreateWorkflowDialogOpen}
          isSubmitting={isCreating}
          error={createError instanceof Error ? createError.message : null}
          onSubmit={async (data) => {
            try {
              await handleCreateWorkflow(data);
              setCreateWorkflowDialogOpen(false);
            } catch {
             
            }
          }}
        />

        <EditWorkflowDialog
          open={editWorkflowDialogOpen}
          onOpenChange={closeEditWorkflow}
          workflow={editingWorkflowData}
          onSubmit={handleSaveWorkflow}
        />

        <div className="space-y-4">
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <p className="text-red-400">
                {error instanceof Error
                  ? error.message
                  : "Failed to load workflows."}
              </p>

              <button
                onClick={() => refetch()}
                className="mt-4 rounded-xl bg-[#8B7CF6] px-4 py-2 text-white"
              >
                Try again
              </button>
            </div>
          ) : (
            <>
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

              {workflows.length === 0 && (
                <EmptyState title="No workflows yet" icon={<GitBranch className="mx-auto mb-3 text-[#777D8B]" size={28} />} />

              )}
            </>
          )}


          {activeWorkflow && (
            <AgentAssignmentDialog
              open={assignmentModalOpen}
              onOpenChange={(open) => {
                setAssignmentModalOpen(open);

                if (!open) {
                  setEditingAssignment(null);
                }
              }}
              initialAgentId={activeAssignment?.agentId ?? null}
              initialInstructions={activeAssignment?.instructions ?? ""}
              excludedAgentIds={excludedAgentIds}
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

    </DashboardLayout >
  );
}
