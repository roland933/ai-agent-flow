export const taskEndpoints = {
  all: "/tasks",
  create: "/tasks",
  byId: (id: number) => `/tasks/${id}`,
  run: (id: number) => `/tasks/${id}/run`,
  workflow: (id: number) => `/tasks/${id}/workflow`,
  agentAssignments: "/agent-assignments/",
  agentAssignmentsByTask: (taskId: number) =>`/agent-assignments/task/${taskId}`,
};