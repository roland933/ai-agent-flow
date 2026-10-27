
import { ListFilter } from "lucide-react";
import type { ReactNode } from "react";

type FilterBoxProps = {
  children: ReactNode;
  onReset: () => void;
  title?: string;
  resetLabel?: string;
};

export function FilterBox({
  children,
  onReset,
  title = "Filters",
  resetLabel = "Reset filters",
}: FilterBoxProps) {
  return (
    <section className="mb-6 rounded-2xl border border-white/[0.10] bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-slate-100">
          <ListFilter size={17} className="text-emerald-300" />
          {title}
        </h2>

        <button
          type="button"
          onClick={onReset}
          className="text-sm text-slate-400 transition-colors hover:text-emerald-300"
        >
          {resetLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {children}
      </div>
    </section>
  );
}
