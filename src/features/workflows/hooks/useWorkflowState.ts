import { useState } from "react";

import type { Workflow } from "../types/workflow";
import { initialWorkflows } from "../data/mock-workflows";

export function useWorkflowState() {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);

  return {
    workflows,
    setWorkflows,
  };
}