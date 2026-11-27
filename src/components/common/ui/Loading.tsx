import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Spinner className="size-8 text-[#8B7CF6]" />
    </div>
  );
}