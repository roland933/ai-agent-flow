
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type {
  DataTableProps,
} from "@/features/ui/table/types/data-table";

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
   <div className={`overflow-x-auto rounded-lg border ${className ?? ""}`}>
      <Table className={tableClassName}>
        <TableHeader>
         <TableRow className={headerClassName}>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.className}
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
                    onRowClick ? "cursor-pointer" : "",
                    rowClassName ?? "",
                ].join(" ")}
            >
              {columns.map((column) => (
               <TableCell
                    key={String(column.key)}
                    className={[cellClassName, column.className]
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
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
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