
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "items",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-[#9299AA]">
        Showing {startItem}–{endItem} of {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-[#303444] p-2 text-[#9299AA] hover:bg-[#252B38] disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 rounded-lg px-3 text-xs font-medium ${
                currentPage === page
                  ? "bg-[#8B7CF6] text-white"
                  : "border border-[#303444] text-[#9299AA] hover:bg-[#252B38]"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() =>
            onPageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          className="rounded-lg border border-[#303444] p-2 text-[#9299AA] hover:bg-[#252B38] disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
