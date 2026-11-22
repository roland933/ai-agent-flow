
import type { ReactNode } from "react";
import { Bell } from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  
return (
  <div className="min-h-screen bg-[#0B0D12] text-[#F1F2F7]">
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#252B38] bg-[#0B0D12]/90 px-8 backdrop-blur-xl">
          <div />

          <button
            aria-label="Notifications"
            className="rounded-xl border border-[#252B38] bg-[#151923] p-2.5 text-[#9299AA] transition-colors hover:border-[#8B7CF6]/40 hover:bg-[#8B7CF6]/10 hover:text-[#A99FFF]"
          >
            <Bell size={18} />
          </button>
        </header>

        <main className="relative p-8">
          {children}
        </main>
      </div>
    </div>
  </div>
);
}
