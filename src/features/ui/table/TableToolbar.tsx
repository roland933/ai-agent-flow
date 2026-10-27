import type { ReactNode } from "react";

type TableToolbarProps = {
  filteredCount: number;
  totalCount: number;
  itemName: string;
  children?: ReactNode;
};

export function TableToolbar({
  filteredCount,
  totalCount,
  itemName,
  children,
}: TableToolbarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-5 pt-5 text-xs text-slate-400">
      <div>
        Showing{" "}
        <span className="font-medium text-slate-200">
          {filteredCount}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-200">
          {totalCount}
        </span>{" "}
        {itemName}
      </div>

      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}