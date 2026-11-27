import { useState } from "react";
import type { Workflow } from "../types/workflow";

export function useWorkflowState() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  return { workflows, setWorkflows };
}