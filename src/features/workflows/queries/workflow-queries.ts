
import { queryOptions } from "@tanstack/react-query";
import { getWorkflows } from "../api/workflow-api";
import { mapWorkflowsFromApi } from "../utils/workflow-adapter";

export const workflowQueries = {
  all: () =>
    queryOptions({
      queryKey: ["workflows"],
      queryFn: async () => {
        const data = await getWorkflows();
        return mapWorkflowsFromApi(data);
      },
    }),
};
