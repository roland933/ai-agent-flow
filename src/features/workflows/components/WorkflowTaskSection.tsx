import { ClipboardList } from "lucide-react";

interface WorkflowTaskSectionProps {
  title: string;
}

export default function WorkflowTaskSection({
  title,
}: WorkflowTaskSectionProps) {
  return (
    <div className="mb-5 rounded-xl border border-[#303444] bg-[#191E2A] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9299AA]">
          <ClipboardList size={14} />
          Shared task
        </div>
      </div>

      <p className="text-sm font-medium text-[#F1F2F7]">{title}</p>
    </div>
  );
}