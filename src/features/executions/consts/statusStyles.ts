import type {
  ExecutionStatus,
} from "@/features/executions/types/execution";

export const statusStyles: Record<ExecutionStatus, string> = {
  Queued: "bg-yellow-100 text-yellow-800",
  Running: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Cancelled: "bg-gray-100 text-gray-800",
};