
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type TableAction = {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  visible?: boolean;
  disabled?:boolean;
  variant?: "ghost" | "destructive";
  className?:string
};

type TableActionsProps = {
  actions: TableAction[];
};

export function TableActions({ actions }: TableActionsProps) {
  return (
    <div className="flex items-center justify-start gap-1">
      {actions
        .filter((action) => action.visible !== false)
        .map((action) => (
          <Button
            className={`hover:cursor-pointer ${action.className}`}
            key={action.key}
            type="button"
            disabled={action.disabled}
            variant={action.variant ?? "ghost"}
            size="icon"
            aria-label={action.label}
            title={action.label}
            onClick={(event) => {
              event.stopPropagation();
              action.onClick();
            }}
          >
            {action.icon}
          </Button>
        ))}
    </div>
  );
}
