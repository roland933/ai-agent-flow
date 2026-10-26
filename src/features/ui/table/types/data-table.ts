import type { ReactNode } from "react";




export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  cell?: (row: T) => ReactNode;
  className?: string;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string | number;

  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;

  onRowClick?: (row: T) => void;
};