
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { DataTableProps } from "@/features/ui/table/types/data-table";

export default function DataTable<T>({
  columns,
  data,
  getRowId,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  cellClassName,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div
      className={[
        "overflow-x-auto rounded-2xl border border-white/[0.10]",
        "bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        "backdrop-blur-xl",
        className ?? "",
      ].join(" ")}
    >
      <Table className={tableClassName}>
        <TableHeader>
          <TableRow
            className={[
              "border-b border-white/[0.08] hover:bg-transparent",
              headerClassName ?? "",
            ].join(" ")}
          >
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={[
                  "h-11 px-5 text-sm font-medium text-slate-200",
                  column.className ?? "",
                ].join(" ")}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow
              key={getRowId(row)}
              onClick={() => onRowClick?.(row)}
              className={[
                "border-b border-white/[0.06] transition-colors",
                "hover:bg-white/[0.035]",
                "last:border-b-0",
                onRowClick ? "cursor-pointer" : "",
                rowClassName ?? "",
              ].join(" ")}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  className={[
                    "px-5 py-3.5 text-sm text-slate-300",
                    cellClassName ?? "",
                    column.className ?? "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {column.cell
                    ? column.cell(row)
                    : String(row[column.key] ?? "—")}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-sm text-slate-500"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
