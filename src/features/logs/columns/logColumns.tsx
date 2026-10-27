import type { DataTableColumn } from "@/features/ui/table/types/data-table";
import type { Log } from "@/features/logs/types/log";
import { formatDate } from "@/helpers/format";

const levelStyles: Record<Log["level"], string> = {
  Info: "border-sky-400/15 bg-sky-400/10 text-sky-300",
  Success: "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
  Warning: "border-amber-400/15 bg-amber-400/10 text-amber-300",
  Error: "border-rose-400/15 bg-rose-400/10 text-rose-300",
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