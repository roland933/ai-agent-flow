import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import type { Log } from "@/features/logs/types/log";
import { formatDate } from "@/helpers/format";

const levelStyles: Record<Log["level"], string> = {
  Info: "bg-blue-100 text-blue-800",
  Success: "bg-green-100 text-green-800",
  Warning: "bg-yellow-100 text-yellow-800",
  Error: "bg-red-100 text-red-800",
};

export const logColumns: DataTableColumn<Log>[] = [
  {
    key: "createdAt",
    header: "Time",
    cell: (log) => formatDate(log.createdAt),
    className: "whitespace-nowrap",
  },
  {
    key: "level",
    header: "Level",
    cell: (log) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${levelStyles[log.level]}`}
      >
        {log.level}
      </span>
    ),
  },
  {
    key: "message",
    header: "Message",
  },
  {
    key: "source",
    header: "Source",
  },
];