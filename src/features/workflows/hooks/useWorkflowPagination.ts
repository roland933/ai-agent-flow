import { useState } from "react";
import type { Workflow } from "../types/workflow";
import { WORKFLOW_CONFIG } from "../config/config";

const PAGE_SIZE = WORKFLOW_CONFIG.PAGE_SIZE;

export function useWorkflowPagination(workflows: Workflow[]) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(workflows.length / PAGE_SIZE)
  );

  const visibleWorkflows = workflows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    visibleWorkflows,
    pageSize: PAGE_SIZE,
  };
}