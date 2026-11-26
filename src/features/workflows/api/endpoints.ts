
export const workflowEndpoints = {
  all: "/workflow-templates/overview",
  create: "/workflow-templates",
  byId: (id: number) => `/workflow-templates/${id}`,
  runs: (id: number) => `/workflow-templates/${id}/runs`,
  run: (id: number) => `/workflow-templates/${id}/run`,
};
