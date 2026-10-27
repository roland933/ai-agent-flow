
import type { ReactNode } from "react";
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogSize = "sm" | "md" | "lg" | "xl";

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
};

const sizeStyles: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "xl",
}: AppDialogProps) {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`w-[calc(100%-2rem)] ${sizeStyles[size]} max-h-[85vh] overflow-y-auto rounded-2xl border border-white/[0.10] bg-[#101a20] p-6 text-slate-100 shadow-2xl shadow-black/30 sm:p-8`}
      >
        <DialogHeader className="mb-2 space-y-2">
          <DialogTitle className="text-xl font-semibold tracking-tight text-slate-100">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-sm leading-relaxed text-slate-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-5">
          {children}
        </div>

        {footer && (
          <DialogFooter className="mt-6 gap-2 border-t border-white/[0.08] pt-5">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </ShadcnDialog>
  );
}
