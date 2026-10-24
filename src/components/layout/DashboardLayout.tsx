
import type { ReactNode } from "react";
import { Bell, Search } from "lucide-react";
import AppSidebar from "@/components/layout/AppSidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100">
      <div className="flex">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-slate-800/80 px-8">
            <div className="relative w-full max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                placeholder="Search anything..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900/60 py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-slate-500 focus:border-violet-500"
              />
            </div>

            <button
              aria-label="Notifications"
              className="ml-5 rounded-lg border border-slate-800 p-2.5 text-slate-400 hover:bg-slate-800"
            >
              <Bell size={18} />
            </button>
          </header>

          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
